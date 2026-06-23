import { FastifyReply, FastifyRequest } from 'fastify';

import {
  createShortenedUrl,
  getAllUrls,
  getUrlByShortenUrlKey,
  saveClickAnalytics,
} from '../services/urlsService';

// ======================
// Get all URLs
// ======================

export const getUrls = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const urls = await getAllUrls();

    return reply.code(200).send(urls);
  } catch (error) {
    console.error(error);

    return reply
      .code(500)
      .send(
        'Failed to retrieve the list of URLs. Please try again later'
      );
  }
};

// ======================
// Get URL by short key
// ======================

export const getUrl = async (
  request: FastifyRequest<{
    Params: {
      shortenUrlKey: string;
    };
  }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { shortenUrlKey } = request.params;

    const originalUrl =
      await getUrlByShortenUrlKey(
        shortenUrlKey
      );

    if (!originalUrl) {
      return reply
        .code(404)
        .send(
          'The requested shortened URL could not be found'
        );
    }

    const forwardedFor =
      request.headers[
        'x-forwarded-for'
      ];

    const ip = forwardedFor
      ? String(forwardedFor)
          .split(',')[0]
          .trim()
      : request.ip;

    const userAgent = String(
      request.headers[
        'user-agent'
      ] || ''
    );

    console.log(
      '================================'
    );
    console.log(
      'URL VISITED:',
      shortenUrlKey
    );
    console.log(
      'REAL IP:',
      ip
    );
    console.log(
      'USER AGENT:',
      userAgent
    );
    console.log(
      'X-FORWARDED-FOR:',
      forwardedFor
    );
    console.log(
      '================================'
    );

    await saveClickAnalytics(
      shortenUrlKey,
      ip,
      userAgent
    );

    return reply.code(200).send(originalUrl);
  } catch (error) {
    console.error(error);

    return reply
      .code(500)
      .send(
        'Unable to retrieve the specified URL'
      );
  }
};

// ======================
// Create URL
// ======================

export const postUrl = async (
  request: FastifyRequest<{
    Body: {
      originalUrl: string;
    };
  }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { originalUrl } =
      request.body;

    let userId: string | null =
      null;

    const authHeader =
      request.headers.authorization;

    console.log(
      'AUTH HEADER:',
      authHeader
    );

    if (authHeader) {
      try {
        const token =
          authHeader.split(' ')[1];

        const decoded: any =
          request.server.jwt.verify(
            token
          );

        console.log(
          'DECODED TOKEN:',
          decoded
        );

        userId = decoded.userId;
      } catch (error) {
        console.log(
          'Invalid token, creating guest URL'
        );

        console.log(error);
      }
    }

    console.log(
      'FINAL USER ID:',
      userId
    );

    const shortenUrlKey =
      await createShortenedUrl(
        originalUrl,
        userId
      );

    if (!shortenUrlKey) {
      return reply
        .code(400)
        .send(
          'The provided URL is invalid'
        );
    }

    return reply
      .code(201)
      .send(shortenUrlKey);
  } catch (error) {
    console.error(error);

    return reply
      .code(500)
      .send(
        'Failed to create a shortened URL'
      );
  }
};