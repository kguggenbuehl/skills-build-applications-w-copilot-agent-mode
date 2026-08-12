import express from 'express';
import mongoose from 'mongoose';
import './config/database.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

const isValidId = (id: string) => mongoose.isValidObjectId(id);

const sendNotFound = (res: express.Response, resource: string, id: string) => {
  res.status(404).json({ error: `${resource} with id ${id} not found` });
};

const sendBadId = (res: express.Response) => {
  res.status(400).json({ error: 'Invalid MongoDB ObjectId format' });
};

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find().populate('team', 'name city').lean();
  res.json({ data: users, resource: 'users' });
});

app.post('/api/users/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ data: user, resource: 'users' });
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    sendBadId(res);
    return;
  }

  const updated = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    sendNotFound(res, 'User', id);
    return;
  }

  res.json({ data: updated, resource: 'users' });
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    sendBadId(res);
    return;
  }

  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) {
    sendNotFound(res, 'User', id);
    return;
  }

  res.status(204).send();
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find().populate('members', 'name email').lean();
  res.json({ data: teams, resource: 'teams' });
});

app.post('/api/teams/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json({ data: team, resource: 'teams' });
});

app.put('/api/teams/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    sendBadId(res);
    return;
  }

  const updated = await Team.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    sendNotFound(res, 'Team', id);
    return;
  }

  res.json({ data: updated, resource: 'teams' });
});

app.delete('/api/teams/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    sendBadId(res);
    return;
  }

  const deleted = await Team.findByIdAndDelete(id);
  if (!deleted) {
    sendNotFound(res, 'Team', id);
    return;
  }

  res.status(204).send();
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find().populate('user', 'name email').lean();
  res.json({ data: activities, resource: 'activities' });
});

app.post('/api/activities/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ data: activity, resource: 'activities' });
});

app.put('/api/activities/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    sendBadId(res);
    return;
  }

  const updated = await Activity.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    sendNotFound(res, 'Activity', id);
    return;
  }

  res.json({ data: updated, resource: 'activities' });
});

app.delete('/api/activities/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    sendBadId(res);
    return;
  }

  const deleted = await Activity.findByIdAndDelete(id);
  if (!deleted) {
    sendNotFound(res, 'Activity', id);
    return;
  }

  res.status(204).send();
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate('entries.user', 'name').lean();
  res.json({ data: leaderboard, resource: 'leaderboard' });
});

app.post('/api/leaderboard/', async (req, res) => {
  const leaderboard = await Leaderboard.create(req.body);
  res.status(201).json({ data: leaderboard, resource: 'leaderboard' });
});

app.put('/api/leaderboard/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    sendBadId(res);
    return;
  }

  const updated = await Leaderboard.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    sendNotFound(res, 'Leaderboard', id);
    return;
  }

  res.json({ data: updated, resource: 'leaderboard' });
});

app.delete('/api/leaderboard/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    sendBadId(res);
    return;
  }

  const deleted = await Leaderboard.findByIdAndDelete(id);
  if (!deleted) {
    sendNotFound(res, 'Leaderboard', id);
    return;
  }

  res.status(204).send();
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find().populate('suggestedFor', 'name').lean();
  res.json({ data: workouts, resource: 'workouts' });
});

app.post('/api/workouts/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ data: workout, resource: 'workouts' });
});

app.put('/api/workouts/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    sendBadId(res);
    return;
  }

  const updated = await Workout.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    sendNotFound(res, 'Workout', id);
    return;
  }

  res.json({ data: updated, resource: 'workouts' });
});

app.delete('/api/workouts/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    sendBadId(res);
    return;
  }

  const deleted = await Workout.findByIdAndDelete(id);
  if (!deleted) {
    sendNotFound(res, 'Workout', id);
    return;
  }

  res.status(204).send();
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : 'Unexpected server error';
  res.status(500).json({ error: message });
});

app.listen(port, () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  console.log(`OctoFit backend listening on ${baseUrl}`);
});
