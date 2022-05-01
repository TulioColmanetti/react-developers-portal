import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    //Valida se a nota inserida e' menor que zero
    validate(value) {
      if (value < 0) throw new Error('Valor negativo para nota');
    },
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const serviceModel = mongoose.model('services', serviceSchema);

export { serviceModel };
