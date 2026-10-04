import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_SERVICES, DEFAULT_BANNERS, DEFAULT_BUSINESS_CONFIG } from './src/data/defaultData.ts';
import { ServiceItem, BannerSlide, BusinessConfig } from './src/types/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

// Ensure data and uploads directory exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

interface DatabaseStructure {
  services: ServiceItem[];
  banners: BannerSlide[];
  config: BusinessConfig;
}

function loadDatabase(): DatabaseStructure {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      return {
        services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_SERVICES,
        banners: Array.isArray(parsed.banners) ? parsed.banners : DEFAULT_BANNERS,
        config: parsed.config || DEFAULT_BUSINESS_CONFIG,
      };
    }
  } catch (err) {
    console.error('Error loading database, falling back to defaults:', err);
  }

  const initialData: DatabaseStructure = {
    services: DEFAULT_SERVICES,
    banners: DEFAULT_BANNERS,
    config: DEFAULT_BUSINESS_CONFIG,
  };
  saveDatabase(initialData);
  return initialData;
}

function saveDatabase(data: DatabaseStructure): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save database file:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // Increase payload limit for direct image uploads
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // Serve uploaded images statically
  app.use('/uploads', express.static(UPLOADS_DIR));

  // Initialize DB
  let db = loadDatabase();

  // API Endpoints
  // Services
  app.get('/api/services', (_req: Request, res: Response) => {
    db = loadDatabase();
    res.json(db.services);
  });

  app.post('/api/services', (req: Request, res: Response) => {
    const newService: ServiceItem = {
      ...req.body,
      id: req.body.id || `srv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db = loadDatabase();
    db.services.unshift(newService);
    saveDatabase(db);
    res.status(201).json(newService);
  });

  app.put('/api/services/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    db = loadDatabase();
    const index = db.services.findIndex((s) => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Service not found' });
    }
    db.services[index] = {
      ...db.services[index],
      ...req.body,
      id,
      updatedAt: new Date().toISOString(),
    };
    saveDatabase(db);
    res.json(db.services[index]);
  });

  app.delete('/api/services/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    db = loadDatabase();
    db.services = db.services.filter((s) => s.id !== id);
    saveDatabase(db);
    res.json({ success: true, id });
  });

  // Banners
  app.get('/api/banners', (_req: Request, res: Response) => {
    db = loadDatabase();
    res.json(db.banners);
  });

  app.post('/api/banners', (req: Request, res: Response) => {
    const newBanner: BannerSlide = {
      ...req.body,
      id: req.body.id || `ban-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    db = loadDatabase();
    db.banners.push(newBanner);
    saveDatabase(db);
    res.status(201).json(newBanner);
  });

  app.put('/api/banners/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    db = loadDatabase();
    const index = db.banners.findIndex((b) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    db.banners[index] = {
      ...db.banners[index],
      ...req.body,
      id,
    };
    saveDatabase(db);
    res.json(db.banners[index]);
  });

  app.delete('/api/banners/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    db = loadDatabase();
    db.banners = db.banners.filter((b) => b.id !== id);
    saveDatabase(db);
    res.json({ success: true, id });
  });

  // Business Config & Contact
  app.get('/api/config', (_req: Request, res: Response) => {
    db = loadDatabase();
    res.json(db.config);
  });

  app.post('/api/config', (req: Request, res: Response) => {
    db = loadDatabase();
    db.config = {
      ...db.config,
      ...req.body,
    };
    saveDatabase(db);
    res.json(db.config);
  });

  // Admin Authentication
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    db = loadDatabase();
    const isUsernameMatch = 
      username === db.config.adminUsername || 
      username?.toLowerCase() === 'serviceku31@gmail.com' ||
      username?.toLowerCase() === 'admin';

    const isPasswordMatch = 
      password === db.config.adminPassword || 
      password === 'serviceku123';

    if (isUsernameMatch && isPasswordMatch) {
      return res.json({
        success: true,
        user: {
          username: db.config.adminUsername,
          role: 'admin',
          name: 'Administrator Serviceku',
        },
        token: `token-${Date.now()}-${Math.random().toString(36).substring(2)}`,
      });
    }

    return res.status(401).json({ 
      success: false, 
      message: 'Username atau kata sandi admin tidak sesuai. Cek kembali kredensial Anda.' 
    });
  });

  // Image Upload endpoint for admin to upload photos
  app.post('/api/upload', (req: Request, res: Response) => {
    try {
      const { imageBase64, filename } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'No image data provided' });
      }

      // If data URL: data:image/png;base64,xxxx
      const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let extension = 'png';

      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        if (mimeType.includes('jpeg') || mimeType.includes('jpg')) extension = 'jpg';
        else if (mimeType.includes('webp')) extension = 'webp';
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(imageBase64, 'base64');
      }

      const safeName = `img-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${extension}`;
      const filePath = path.join(UPLOADS_DIR, safeName);
      fs.writeFileSync(filePath, buffer);

      const fileUrl = `/uploads/${safeName}`;
      res.json({ success: true, url: fileUrl });
    } catch (err: any) {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Gagal memproses unggahan gambar', details: err?.message });
    }
  });

  // Reset to default data
  app.post('/api/reset-defaults', (_req: Request, res: Response) => {
    const freshData: DatabaseStructure = {
      services: DEFAULT_SERVICES,
      banners: DEFAULT_BANNERS,
      config: DEFAULT_BUSINESS_CONFIG,
    };
    saveDatabase(freshData);
    res.json({ success: true, message: 'Database reset to official default data' });
  });

  // In development, hook up Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static build
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    } else {
      // Fallback in case dist isn't built yet
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serviceku Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
