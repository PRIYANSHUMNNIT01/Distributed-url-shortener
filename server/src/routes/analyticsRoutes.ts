import { FastifyInstance } from 'fastify';
import { analytics } from '../controllers/analyticsController';

export const analyticsRoutes = async (
  fastify: FastifyInstance
) => {
  fastify.register(
    async (router: FastifyInstance) => {
      router.get('/:shortenUrlKey', analytics);
    },
    {
      prefix: '/analytics',
    }
  );
};