import mongoose from 'mongoose';

const supportSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  category_name: {
    type: String,
    required: true,
  },
  sel_product_service_id: {
    type: String,
    required: true,
  },
  sel_product_service_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const supportModel = mongoose.model('support', supportSchema, 'support');

export { supportModel };
