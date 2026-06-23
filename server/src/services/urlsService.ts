import { generateUniqueToken } from '../config/zookeeper';
import {
  get,
  set,
  extendTTL,
  RedisExpirationMode,
} from '../config/redis';

import { IUrl } from '../models/Url';
import { isValidUrl } from '../utils';

import {
  create,
  findAll,
  findOne,
  incrementClicks,
} from '../repositories/urlsRepository';

const geoip = require('geoip-lite');
import { UAParser } from 'ua-parser-js';

import {
  createAnalytics,
} from '../repositories/analyticsRepository';

const ONE_MINUTE_IN_SECONDS = 60;

// ====================
// Get all URLs
// ====================

export const getAllUrls = async (): Promise<IUrl[]> => {
  return await findAll();
};

// ====================
// Save click analytics
// ====================

export const saveClickAnalytics = async (
  shortenUrlKey: string,
  ip: string,
  userAgent: string
): Promise<void> => {
  try {
    const geo = geoip.lookup(ip);

    const parser = new UAParser(userAgent);

    await createAnalytics({
      shortenUrlKey,

      country:
        geo?.country || 'Unknown',

      region:
        geo?.region || 'Unknown',

      city:
        geo?.city || 'Unknown',

      browser:
        parser.getBrowser().name ||
        'Unknown',

      device:
        parser.getDevice().type ||
        'Desktop',

      ip,

      createdAt: new Date(),
    });
  } catch (error) {
    console.error(
      'Analytics save failed:',
      error
    );
  }
};
// ====================
// Get URL by key
// ====================

export const getUrlByShortenUrlKey = async (
  shortenUrlKey: string
): Promise<string | null> => {
  const cachedOriginalUrl =
    await get(shortenUrlKey);

  if (cachedOriginalUrl) {
    await incrementClicks(
      shortenUrlKey
    );

    await extendTTL(
      shortenUrlKey,
      ONE_MINUTE_IN_SECONDS
    );

    return cachedOriginalUrl;
  }

  const savedUrl = await findOne({
    shortenUrlKey,
  });

  if (savedUrl) {
    await incrementClicks(
      shortenUrlKey
    );

    await set(
      savedUrl.shortenUrlKey,
      savedUrl.originalUrl,
      RedisExpirationMode.EX,
      ONE_MINUTE_IN_SECONDS
    );

    return savedUrl.originalUrl;
  }

  return null;
};

// ====================
// Create shortened URL
// ====================

export const createShortenedUrl = async (
  originalUrl: string,
  userId: string | null = null
): Promise<string | null> => {
  if (!isValidUrl(originalUrl)) {
    return null;
  }

  const existingUrl =
    await findOne({
      originalUrl,
    });

  if (existingUrl) {
    return existingUrl.shortenUrlKey;
  }

  const shortenUrlKey =
    await generateUniqueToken();

  if (!shortenUrlKey) {
    return null;
  }

  const newUrl = await create({
    originalUrl,
    shortenUrlKey,
    userId,
    analyticsEnabled: !!userId,
  });

  await set(
    newUrl.shortenUrlKey,
    newUrl.originalUrl,
    RedisExpirationMode.EX,
    ONE_MINUTE_IN_SECONDS
  );

  return newUrl.shortenUrlKey;
};