import sqlite3 from 'sqlite3';
import { open, Database} from 'sqlite';

sqlite3.verbose();

const dbFile = 'mydb.sqlite';

export const db: Promise<Database> = open({
    filename: dbFile,
    driver: sqlite3.Database
}).then(async (database) => {
    await database.run(`
        CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
        )
    `);

    await database.run(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        )
    `);

    return database;
});