import mongoose, { InferSchemaType, model, Schema } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, trim: true },
    entries: { type: [leaderboardEntrySchema], required: true, default: [] },
    updatedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

const Leaderboard = mongoose.models.Leaderboard || model('Leaderboard', leaderboardSchema);

export default Leaderboard;
