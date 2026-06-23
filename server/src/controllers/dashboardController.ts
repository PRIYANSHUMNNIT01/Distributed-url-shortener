import { FastifyReply, FastifyRequest } from 'fastify';
import { findByUserId } from '../repositories/urlsRepository';

export const getMyUrls = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const authHeader =
      request.headers.authorization;

    if (!authHeader) {
      return reply
        .code(401)
        .send({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    const decoded: any =
      request.server.jwt.verify(token);

    const urls = await findByUserId(
      decoded.userId
    );

    return reply.code(200).send(urls);
  } catch (error) {
    console.error(error);

    return reply
      .code(401)
      .send({ message: 'Invalid token' });
  }
};