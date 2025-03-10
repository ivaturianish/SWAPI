import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import express from "express"
import { promises as fs} from "fs";


dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const express = require("express");

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

const characters = [];

const films = [];

const planets = [];

app.get("/api/characters", async (req, res) => {
  try{
     const client = await MongoClient.connect(url);
     const db = client.db(dbName);
     const collection = db.collection(collectionName);
     const socks = await collection.find({}).toArray();
     res.json(characters);
  } catch (err) {
    console.error("Error:", err)
    res.status(500).send("No Force be with you!")
  }
 
});

// Route for /api/films
app.get("/api/films", (req, res) => {
  res.json(films);
});

// Route for /api/planets
app.get("/api/planets", (req, res) => {
  res.json(planets);
});

// Route for /api/characters/:id
app.get("/api/characters/:id", (req, res) => {
  const character = characters.find((c) => c.id === parseInt(req.params.id));
  res.json(character || { error: "Character not found" });
});

// Route for /api/films/:id
app.get("/api/films/:id", (req, res) => {
  const film = films.find((f) => f.id === parseInt(req.params.id));
  res.json(film || { error: "Film not found" });
});

// Route for /api/planets/:id
app.get("/api/planets/:id", (req, res) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  res.json(planet || { error: "Planet not found" });
});

// Route for /api/films/:id/characters
app.get("/api/films/:id/characters", (req, res) => {
  const film = films.find((f) => f.id === parseInt(req.params.id));
  if (film) {
    const filmCharacters = characters.filter((c) =>
      film.characters.includes(c.id)
    );
    res.json(filmCharacters);
  } else {
    res.json({ error: "Film not found" });
  }
});

// Route for /api/films/:id/planets
app.get("/api/films/:id/planets", (req, res) => {
  const film = films.find((f) => f.id === parseInt(req.params.id));
  if (film) {
    const filmPlanets = planets.filter((p) => film.planets.includes(p.id));
    res.json(filmPlanets);
  } else {
    res.json({ error: "Film not found" });
  }
});

// Route for /api/characters/:id/films
app.get("/api/characters/:id/films", (req, res) => {
  const characterId = parseInt(req.params.id);
  const characterFilms = films.filter((f) =>
    f.characters.includes(characterId)
  );
  res.json(characterFilms);
});

// Route for /api/planets/:id/films
app.get("/api/planets/:id/films", (req, res) => {
  const planetId = parseInt(req.params.id);
  const planetFilms = films.filter((f) => f.planets.includes(planetId));
  res.json(planetFilms);
});

// Route for /api/planets/:id/characters
app.get("/api/planets/:id/characters", (req, res) => {
  const planetId = parseInt(req.params.id);
  const planetFilms = films.filter((f) => f.planets.includes(planetId));
  const planetCharacters = characters.filter((c) =>
    planetFilms.some((f) => f.characters.includes(c.id))
  );
  res.json(planetCharacters);
});
