import sqlite3 from 'sqlite3';
import { open, Database} from 'sqlite';

sqlite3.verbose();

const dbFile = process.env.DATABASE_PATH || '';
if (dbFile == '')
    console.log('empty');
else
    console.log(dbFile);

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

export async function findUserByUsername(username: string): Promise<any>
{
    const user = (await db).get('SELECT * FROM users WHERE username = ? ', [username]);
    if (!user) {
        return null;
    }
    return user;
}

export async function insertUserIntoDatabase(username:string, password:string): Promise<void>
{
    (await db).run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
}