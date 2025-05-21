import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

export const connectToDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('tcgDB.db');
    return db;
  } catch (error) {
    console.error('Failed to open database:', error);
    throw new Error('Could not connect to database');
  }
};

export const createTables = async () => {
  const db = await connectToDatabase(); // Await the database connection

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Card (
        id TEXT PRIMARY KEY,
        name TEXT,
        supertype TEXT,
        subtype TEXT,
        set_name TEXT,
        rarity TEXT,
        image_url TEXT,
        url TEXT UNIQUE,
        count INTEGER DEFAULT 1
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Pokemon (
        id TEXT,
        name TEXT,
        hp INTEGER,
        supertype TEXT,
        type TEXT,
        evolves_from TEXT,
        evolves_to TEXT,
        release_date TEXT,
        set_name TEXT,
        PRIMARY KEY (id, name),
        FOREIGN KEY (evolves_from) REFERENCES Pokemon(id),
        FOREIGN KEY (evolves_to) REFERENCES Pokemon(id),
        FOREIGN KEY (id, name) REFERENCES Card(id, name)
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS TCGPlayer (
        url TEXT PRIMARY KEY,
        updated_at TEXT
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Prices (
        tcgplayer_url TEXT,
        type TEXT,
        low REAL,
        mid REAL,
        high REAL,
        market REAL,
        direct_low REAL,
        PRIMARY KEY (tcgplayer_url, type),
        FOREIGN KEY (tcgplayer_url) REFERENCES TCGPlayer(url)
    );
  `);
};