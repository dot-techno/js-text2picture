import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

app.post('/dream', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log("Request received. Prompt:" + prompt);
        console.log("Contacting openai server...");
        const aiResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: '1024x1024',

        });
        console.log("Server has returned response.");
        const image = aiResponse.data[0].url;
        console.log("Image url: " + image);
        res.send({ image });
    } catch(error) {
        if (error.response){
            const status = error.response.status;
            const data = error.response.data;
            console.log("Status: "+ status);
            console.log("Data: "+data);
            res.status(status).send(data);

        } else{
            console.log("Error: "+error.message);
            res.status(400).send(error.message);
        }
        //console.error(error);
    }

});

app.listen(8080, () => console.log('Make art on http://localhost:8080/dream'));

