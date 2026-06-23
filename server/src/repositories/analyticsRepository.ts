import Analytics from '../models/Analytics';

export const createAnalytics = async (
  data: any
) => {
  return Analytics.create(data);
};

export const findAnalyticsByKey =
  async (
    shortenUrlKey: string
  ) => {
    return Analytics.find({
      shortenUrlKey,
    }).sort({
      createdAt: -1,
    });
  };