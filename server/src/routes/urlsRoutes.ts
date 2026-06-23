import { FastifyInstance } from 'fastify';
import { postUrl, getUrls, getUrl } from '../controllers/urlsController';

export const urlsRoutes = async (fastify: FastifyInstance) => {
  fastify.register(
    async (router: FastifyInstance) => {
      router.get('/', getUrls);

      router.get('/:shortenUrlKey', getUrl);

      router.post(
        '/',
        {
          config: {
            rateLimit: {
              max: 20,
              timeWindow: '1 minute',
            },
          },
        },
        postUrl
      );
    },
    { prefix: '/urls' }
  );
};