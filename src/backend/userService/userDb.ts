import sqlite3 from 'sqlite3';
import { open, Database} from 'sqlite';
import bcrypt from 'bcryptjs';

sqlite3.verbose();

const dbFile = process.env.USER_DATABASE_PATH;
if (!dbFile) {
    throw new Error("MISSING DATABASE ENV");
}

export const db: Promise<Database> = open({
    filename: dbFile,
    driver: sqlite3.Database
}).then(async (database) => {
    await database.run(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        isGoogleRegister NUMERIC DEFAULT 0
        )
    `);

    await database.run(`
        CREATE TABLE IF NOT EXISTS meta (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seeded TEXT
        )
    `);

    return database;
});

export async function findUserByEmail(email: string): Promise<any>
{
    const database = await db;
    const user = await database.get('SELECT * FROM users WHERE email = ? ', [email]);
    if (!user) {
        return null;
    }
    return user;
}

export async function insertUserIntoDatabase(
    username:string, 
    password:string, 
    email: string
): Promise<void>
{
    const database = await db;
    await database.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
        [username, password, email]);
}

export async function insertGoogleUser(email:string): Promise<void> {
    const database = await db;
    await database.run(`
        INSERT INTO users (username, password, email, isGoogleRegister) 
        VALUES (?, ?, ?, ?)`, [' ', ' ', email, 1]);
}

export async function updateUserInfo(
    oldEmail:string, 
    newEmail: string, 
    newPassword: string, 
    newUsername:string
): Promise<boolean> 
{
    const database = await db;
    const row = await database.run(`
        UPDATE users
        SET username = ?, password = ?, email = ?
        WHERE email = ?`, [newUsername, newPassword, newEmail, oldEmail]);
    const change = row.changes || 0;
    if (change === 1) {
        return true;
    } else if (change > 1) {
        throw new Error('more than one row was effected');
    } else {
        return false;
    }
}

export async function seedDatabase(): Promise<void> {
    const database = await db;
    const isSeeded = await database.get('SELECT * from meta;');
    if (isSeeded)
        return;
    await database.run(`INSERT INTO meta (seeded) VALUES ('true');`)
    const statement = await database.prepare(`
        INSERT INTO users (username, password, email) VALUES (?, ?, ?)`);
    let password = await bcrypt.hash('admin', 10);
    await statement.run('Alice', password, 'aa@mail.com');

    password = await bcrypt.hash('test', 10);
    await statement.run('bob', password, 'bt@mail.com');

    await statement.finalize();

    await database.each('SELECT * FROM users;', (err, row) => {
        if (err) throw err;
    });
}