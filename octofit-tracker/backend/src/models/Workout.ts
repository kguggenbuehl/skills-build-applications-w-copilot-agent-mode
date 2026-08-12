import mongoose, { InferSchemaType, model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, min: 10, max: 240, required: true },
    focusArea: { type: String, required: true, trim: true },
    equipment: { type: [String], required: true, default: [] },
    suggestedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = mongoose.models.Workout || model('Workout', workoutSchema);

export default Workout;
