import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: String },
  updatedBy: { type: String, default: 'System' }
}, { _id: false });

const conceptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Concept title is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Concept description is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Concept content is required'],
  },
  summary: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Concept category is required'],
    trim: true,
    index: true,
  },
  tags: {
    type: [String],
    default: [],
    index: true,
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
  bookmarks: {
    type: Number,
    default: 0,
    min: 0,
  },
  isArchived: {
    type: Boolean,
    default: false,
    index: true,
  },
  archivedAt: {
    type: Date,
    default: null,
  },
  history: [historySchema],
}, {
  timestamps: true,
});

// Create text index for full-text search on title, content, and description
conceptSchema.index({
  title: 'text',
  content: 'text',
  description: 'text',
});

const Concept = mongoose.models.Concept || mongoose.model('Concept', conceptSchema);

export default Concept;
export { Concept };
