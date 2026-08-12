import mongoose, { InferSchemaType, model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'yoga', 'walk'],
      required: true,
    },
    durationMinutes: { type: Number, min: 5, max: 600, required: true },
    distanceKm: { type: Number, min: 0, max: 200 },
    caloriesBurned: { type: Number, min: 10, max: 5000, required: true },
    performedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = mongoose.models.Activity || model('Activity', activitySchema);

export default Activity;
