import { Schema, model } from 'mongoose';

const analyticsSchema = new Schema({
  shortenUrlKey: {
    type: String,
    required: true,
  },

  country: {
  type: String,
  required: false,
},

region: {
  type: String,
  required: false,
},

city: {
  type: String,
  required: false,
},

browser: {
  type: String,
  required: false,
},

device: {
  type: String,
  required: false,
},

ip: {
  type: String,
  required: false,
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model(
  'Analytics',
  analyticsSchema
);