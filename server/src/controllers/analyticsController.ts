import { FastifyReply, FastifyRequest } from 'fastify';
import { findAnalyticsByKey } from '../repositories/analyticsRepository';

export const analytics = async (
  request: FastifyRequest<{
    Params: {
      shortenUrlKey: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const { shortenUrlKey } =
      request.params;

    const analyticsData =
      await findAnalyticsByKey(
        shortenUrlKey
      );

    const totalVisitors =
      analyticsData.length;

    const uniqueVisitors =
      new Set(
        analyticsData.map(
          (item: any) => item.ip
        )
      ).size;

    const uniqueBrowsers =
      new Set(
        analyticsData.map(
          (item: any) => item.browser
        )
      ).size;

    const uniqueDevices =
      new Set(
        analyticsData.map(
          (item: any) => item.device
        )
      ).size;

    return reply.code(200).send({
      totalVisitors,
      uniqueVisitors,
      uniqueBrowsers,
      uniqueDevices,
      analytics: analyticsData,
    });
  } catch (error) {
    console.error(error);

    return reply.code(500).send({
      message:
        'Failed to fetch analytics',
    });
  }
};