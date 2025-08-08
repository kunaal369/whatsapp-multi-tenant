// src/app.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { connectDB } from './config/db';
import { setupSwagger } from './config/swagger';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import whatsappRoutes from './routes/whatsapp.routes';
import messageRoutes from './routes/message.routes';
import contactRoutes from './routes/contact.routes';
import groupRoutes from './routes/group.routes';

dotenv.config();

const app = express();
connectDB();

// app.use(cors());
app.use(cors({
  origin: ['http://localhost:8000', 'http://localhost:3000'],
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/groups', groupRoutes);

// Swagger Docs
setupSwagger(app);

app.get('/', (_, res) => res.send('WAHA WhatsApp Multi-Tenant API'));

export default app;
