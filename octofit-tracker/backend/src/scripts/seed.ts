import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Alpine Pacers',
        city: 'Zurich',
        captain: 'Lena Graf',
        totalPoints: 0,
      },
      {
        name: 'Lakeside Lifters',
        city: 'Geneva',
        captain: 'Noah Berset',
        totalPoints: 0,
      },
    ]);

    const users = await User.insertMany([
      {
        name: 'Lena Graf',
        email: 'lena.graf@octofit.dev',
        age: 29,
        fitnessLevel: 'advanced',
        weeklyGoalMinutes: 360,
        team: teams[0]._id,
      },
      {
        name: 'Mila Roth',
        email: 'mila.roth@octofit.dev',
        age: 25,
        fitnessLevel: 'intermediate',
        weeklyGoalMinutes: 280,
        team: teams[0]._id,
      },
      {
        name: 'Noah Berset',
        email: 'noah.berset@octofit.dev',
        age: 32,
        fitnessLevel: 'advanced',
        weeklyGoalMinutes: 320,
        team: teams[1]._id,
      },
      {
        name: 'Emma Keller',
        email: 'emma.keller@octofit.dev',
        age: 27,
        fitnessLevel: 'beginner',
        weeklyGoalMinutes: 180,
        team: teams[1]._id,
      },
    ]);

    await Team.updateOne(
      { _id: teams[0]._id },
      {
        members: [users[0]._id, users[1]._id],
        totalPoints: 245,
      },
    );

    await Team.updateOne(
      { _id: teams[1]._id },
      {
        members: [users[2]._id, users[3]._id],
        totalPoints: 218,
      },
    );

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'run',
        durationMinutes: 52,
        distanceKm: 10.4,
        caloriesBurned: 640,
        performedAt: new Date('2026-08-10T06:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'cycle',
        durationMinutes: 40,
        distanceKm: 18.9,
        caloriesBurned: 520,
        performedAt: new Date('2026-08-10T17:15:00Z'),
      },
      {
        user: users[2]._id,
        type: 'strength',
        durationMinutes: 58,
        caloriesBurned: 470,
        performedAt: new Date('2026-08-11T12:00:00Z'),
      },
      {
        user: users[3]._id,
        type: 'yoga',
        durationMinutes: 35,
        caloriesBurned: 180,
        performedAt: new Date('2026-08-11T18:40:00Z'),
      },
      {
        user: users[0]._id,
        type: 'swim',
        durationMinutes: 45,
        distanceKm: 1.7,
        caloriesBurned: 430,
        performedAt: new Date('2026-08-12T07:00:00Z'),
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run Builder',
        difficulty: 'advanced',
        durationMinutes: 55,
        focusArea: 'Cardio Endurance',
        equipment: ['Running Shoes', 'GPS Watch'],
        suggestedFor: [users[0]._id, users[2]._id],
      },
      {
        title: 'Core and Mobility Reset',
        difficulty: 'beginner',
        durationMinutes: 30,
        focusArea: 'Core Stability',
        equipment: ['Yoga Mat'],
        suggestedFor: [users[1]._id, users[3]._id],
      },
      {
        title: 'Cycling Power Intervals',
        difficulty: 'intermediate',
        durationMinutes: 48,
        focusArea: 'Lower Body Strength',
        equipment: ['Bike', 'Heart Rate Monitor'],
        suggestedFor: [users[1]._id, users[2]._id],
      },
    ]);

    await Leaderboard.create({
      period: '2026-W33',
      updatedAt: new Date('2026-08-12T08:00:00Z'),
      entries: [
        { user: users[0]._id, points: 132, rank: 1 },
        { user: users[2]._id, points: 119, rank: 2 },
        { user: users[1]._id, points: 113, rank: 3 },
        { user: users[3]._id, points: 99, rank: 4 },
      ],
    });

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
