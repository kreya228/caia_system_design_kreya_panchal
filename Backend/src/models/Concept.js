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
  difficulty: {
    type: String,
    trim: true,
    index: true,
  },
  language: {
    type: String,
    trim: true,
    index: true,
  },
  pattern: {
    type: String,
    trim: true,
    index: true,
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

// Compound indexes to optimize common filtering & sorting queries
conceptSchema.index({ isArchived: 1, category: 1 });
conceptSchema.index({ isArchived: 1, difficulty: 1 });
conceptSchema.index({ isArchived: 1, language: 1 });
conceptSchema.index({ isArchived: 1, pattern: 1 });
conceptSchema.index({ isArchived: 1, tags: 1 });
conceptSchema.index({ isArchived: 1, views: -1 });
conceptSchema.index({ isArchived: 1, bookmarks: -1 });
conceptSchema.index({ isArchived: 1, createdAt: -1 });

const Concept = mongoose.models.Concept || mongoose.model('Concept', conceptSchema);

export default Concept;
export { Concept };
