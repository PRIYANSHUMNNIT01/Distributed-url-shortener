import { FastifyInstance } from 'fastify';
import { getMyUrls } from '../controllers/dashboardController';

export const dashboardRoutes = async (
  fastify: FastifyInstance
) => {
  fastify.get(
    '/dashboard',
    getMyUrls
  );
};