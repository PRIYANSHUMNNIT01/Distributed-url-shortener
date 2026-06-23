import { FastifyInstance } from 'fastify';
import { register, login } from '../controllers/authController';

export const authRoutes = async (
  fastify: FastifyInstance
) => {
  fastify.register(
    async (router: FastifyInstance) => {
      router.post('/register', register);
      router.post('/login', login);
    },
    {
      prefix: '/auth',
    }
  );
};