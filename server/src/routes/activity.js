import Router from 'express';
import auth from '../middleware/auth.js';
import { OpenAIApi } from 'openai';
import { User } from '../models/User.js';
import { Configuration } from 'openai';

const config = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(config);

const router = Router();

router.post('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    const name = user.name
    console.log(name);
    const {activity} = req.body
    const prompt =  `I say that "${activity}" in the most ecofriendly way possible that is 
    not harmful to the environment. Tell me a way for me to do this, which is realistically possible.`
    console.log(prompt);
    const response = await openai.createCompletion({
        prompt: prompt,
        max_tokens: 200,
        temperature: 0.2,
        model: 'text-babbage-001',
    })
    console.log(response.data);
    user.updateOne({logs: user.logs.push({activity: activity, response: response.data.choices[0]})});
    res.send({response:  response.data.choices[0]})
});

export default router;