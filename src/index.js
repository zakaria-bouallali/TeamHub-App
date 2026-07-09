const express = require("express");
const mongoose = require("mongoose");
const redis = require('redis')
const app = express();

// Allow requests from the React frontend (any localhost port in dev)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});
const port = 4000;

const DB_USER = 'root'
const DB_PASSWORD='example'
const DB_HOST="mongo"
const DB_PORT=27017

const REDIS_PORT=6379
const REDIS_HOST='redis'
const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
})
redisClient.on('error', (err) => console.log(err))
redisClient.on('connect', () => console.log('Connected to redis'))
redisClient.connect()

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`

mongoose
    .connect(URI)
    .then(() => console.log('Connect to mongodb'))
    .catch((err) => console.log('Failed to connect'))

app.use(express.json());

// equipe.json is in the same directory (src/) as this file
let equipes = require("./equipe.json");

app.get("/equipe", (req, res) => {
    res.json(equipes);
});

app.get("/equipe/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const foundEquipe = equipes.find(e => e.id === id);

    if (!foundEquipe) {
        return res.status(404).json({ message: "Equipe not found" });
    }

    res.json(foundEquipe);
});


app.post("/equipe", (req, res) => {
    const newEquipe = {
        id: equipes.length + 1,
        name: req.body.name,
        country: req.body.country
    };

    equipes.push(newEquipe);

    res.status(201).json(newEquipe);
});

app.put("/equipe/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const foundEquipe = equipes.find(e => e.id === id);

    if (!foundEquipe) {
        return res.status(404).json({ message: "Equipe not found" });
    }

    foundEquipe.name = req.body.name || foundEquipe.name;
    foundEquipe.country = req.body.country || foundEquipe.country;

    res.json(foundEquipe);
});

app.delete("/equipe/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = equipes.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Equipe not found" });
    }

    const deletedEquipe = equipes.splice(index, 1);

    res.json(deletedEquipe);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

