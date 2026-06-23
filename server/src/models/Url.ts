import { Document, Schema, model } from 'mongoose';

export interface IUrl extends Document {
  originalUrl: string;
  shortenUrlKey: string;

  userId?: Schema.Types.ObjectId | null;

  analyticsEnabled: boolean;
  clicks: number;

  createdAt: Date;
  expiresAt: Date;
}

const schema = new Schema<IUrl>({
  originalUrl: {
    type: String,
    required: true,
    unique: true,
  },

  shortenUrlKey: {
    type: String,
    required: true,
    unique: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },

  analyticsEnabled: {
    type: Boolean,
    default: false,
  },

  clicks: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  expiresAt: {
    type: Date,
    default: () =>
      new Date(
        Date.now() +365 * 24 * 60 * 60 * 1000
      ), // 1 year expiry
  },
});

export default model<IUrl>('Url', schema);