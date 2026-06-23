import Fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';

import { connectToMongoDB } from './config/mongoose';
import { connectToRedis } from './config/redis';
import { connectToZookeeper } from './config/zookeeper';

import { urlsRoutes } from './routes/urlsRoutes';
import { authRoutes } from './routes/authRoutes';
import { analyticsRoutes } from './routes/analyticsRoutes';
import { dashboardRoutes } from './routes/dashboardRoutes';

// Fastify server instance
const fastify = Fastify();

// JWT Configuration
fastify.register(fastifyJwt, {
  secret: 'my_super_secret_key',
});

// Configure server
fastify
  .register(fastifyCors)
  .register(
    async (fastify: FastifyInstance) => {
      // Auth
      fastify.register(authRoutes);

      // URL Shortener
      fastify.register(urlsRoutes);

      // Analytics
      fastify.register(analyticsRoutes);

      // Dashboard
      fastify.register(dashboardRoutes);
    },
    { prefix: '/api' }
  );

// Start the server
const start = async () => {
  try {
    await connectToMongoDB();
    await connectToRedis();
    await connectToZookeeper();

    await fastify.listen({
      port: Number(process.env.NODE_SERVER_LOCAL_PORT),
      host: process.env.NODE_SERVER_HOST,
    });

    console.log('Server is now listening');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();