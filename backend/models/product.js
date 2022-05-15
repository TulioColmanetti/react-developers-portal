import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
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
  model: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  firmare_versions: {
    type: [String],
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

const productModel = mongoose.model('products', productSchema);

export { productModel };
