import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  test: {
    type: Object,
    default: {},
    required: true,
  },
  files: {
    type: Array,
    default: [],
    required: true,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const serviceModel = mongoose.model('services', serviceSchema);

export { serviceModel };
