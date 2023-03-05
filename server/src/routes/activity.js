import Router from 'express';
import auth from '../middleware/auth.js';
import { OpenAIApi } from 'openai';
import { User } from '../models/User.js';
import { Configuration } from 'openai';

const config = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(config);

const router = Router();

router.post('/', auth, async (req, res) => {
  const user = await User.findById(req.user._id);

  let oldActivity = user.activity;

  const name = user.name;

  const { activity } = req.body;
  const prompt = `I say that "${activity}" is not the most ecofriendly way possible that is 
    not harmful to the environment. Tell me a more eco-friendly way, which is realistically possible.`;

  const response = await openai.createCompletion({
    prompt: prompt,
    max_tokens: 200,
    temperature: 0.2,
    model: 'text-babbage-001',
  });

  console.log(response);
  oldActivity.push({
    id: oldActivity.length + 1,
    activity: activity,
    suggestion: response.data.choices[0].text,
    date: new Date(),
    verified: false,
  });

  const user2 = await User.findByIdAndUpdate(req.user._id, {
    activity: oldActivity,
  });

  res.send({ success: true, activity: oldActivity });
});

router.post('/verify/:id', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const { id } = req.params;

  let oldActivity = user.activity;
  let points = user.points;

  let newActivity = oldActivity.map((activity) => {
    if (activity.id == id) {
      activity.verified = true;
    }
    return activity;
  });

  const user2 = await User.findByIdAndUpdate(req.user._id, {
    activity: newActivity,
    points: points + 100,
  });

  res.send({ success: true });
});

export default router;
