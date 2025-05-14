import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

const dbFile = 'mydb.sqlite';

export const db = new sqlite3.Database(dbFile);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS item (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
        )
    `);
});