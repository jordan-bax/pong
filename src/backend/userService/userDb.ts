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
        username TEXT,
        password TEXT,
        email TEXT,
        googleEmail TEXT,
        isGoogleRegister NUMERIC DEFAULT 0,
        pathToProfilePicture TEXT,
        CHECK (
            email IS NOT NULL AND email <> ''
            OR googleEmail IS NOT NULL AND googleEmail <> ''
        )
    );
    `);

    await database.run(`
        CREATE TRIGGER  IF NOT EXISTS enforce_email_uniqueness
        BEFORE INSERT ON users
        FOR EACH ROW
        WHEN (
            (NEW.email IS NOT NULL AND EXISTS (
                SELECT 1 FROM users
                WHERE email = NEW.email OR googleEmail = NEW.email
            ))
            OR
            (NEW.googleEmail IS NOT NULL AND EXISTS (
                SELECT 1 FROM users
                WHERE email = NEW.googleEmail OR googleEmail = NEW.googleEmail
            ))
        )
    BEGIN
        SELECT RAISE(ABORT, 'email already in use on create');
    END;`);

    await database.run(`
        CREATE TRIGGER IF NOT EXISTS enforce_email_uniqueness_update
        BEFORE UPDATE ON users
        FOR EACH ROW
        WHEN (
            (NEW.email IS NOT NULL AND EXISTS (
                SELECT 1 FROM users
                WHERE (email = NEW.email OR googleEmail = NEW.email)
                AND id != OLD.id
            ))
            OR
            (NEW.googleEmail IS NOT NULL AND EXISTS (
                SELECT 1 FROM users
                WHERE (email = NEW.googleEmail OR googleEmail = NEW.googleEmail)
                AND id != OLD.id
            ))
        )
    BEGIN
        SELECT RAISE(ABORT, 'email already in use on update');
    END;`)

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

export async function findUserByGoogleEmail(email: string): Promise<any> {
    const database = await db;
    const user = await database.get('SELECT * FROM users WHERE googleEmail = ? ', [email]);
    if (!user) {
        return null;
    }
    return user;
}

export async function insertUserIntoDatabase(
    username:string | null, 
    password:string | null, 
    email: string | null,
    googleEmail: string | null,
    pathToPP: string | null
): Promise<void>
{
    const database = await db;
    await database.run('INSERT INTO users (username, password, email, googleEmail, pathToProfilePicture ) VALUES (?, ?, ?, ?, ?)', 
        [username, password, email, googleEmail, pathToPP]);
}

export async function insertGoogleUser(email:string): Promise<void> {
    const database = await db;
    await database.run(`
        INSERT INTO users (username, password, email, googleEmail, isGoogleRegister, pathToProfilePicture) 
        VALUES (?, ?, ?, ?, ?, ?)`, [null, null, null, email, 1, '']);
}

export async function updateUserInfo(
    oldEmail:string, 
    newEmail: string | null, 
    newPassword: string | null, 
    newUsername: string | null,
    googleEmail: string | null,
    pathToPP: string | null
): Promise<boolean> 
{
    const database = await db;
    const row = await database.run(`
        UPDATE users
        SET username = ?, password = ?, email = ?, googleEmail = ?, pathToProfilePicture = ?
        WHERE email = ?`, [newUsername, newPassword, newEmail, googleEmail, pathToPP, oldEmail]);
    const change = row.changes || 0;
    if (change === 1) {
        return true;
    } else if (change > 1) {
        throw new Error('more than one row was effected');
    } else {
        return false;
    }
}

export async function updateUserInfoGoogle(
    newEmail: string | null,
    newPassword: string | null,
    newUsername: string | null,
    googleEmail: string,
    pathToPP: string | null
): Promise<boolean> {
    const database = await db;
    const row = await database.run(`
        UPDATE users
        SET username = ?, password = ?, email = ?, googleEmail = ?, pathToProfilePicture = ?
        WHERE googleEmail = ?`, [newUsername, newPassword, newEmail, googleEmail, pathToPP, googleEmail]);
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
        INSERT INTO users (username, password, email, googleEmail, pathToProfilePicture) VALUES (?, ?, ?, ?, ?)`);
    let password = await bcrypt.hash('admin', 10);
    await statement.run('Alice', password, 'aa@mail.com', null, null);

    password = await bcrypt.hash('test', 10);
    await statement.run('bob', password, 'bt@mail.com', null, null);

    await statement.finalize();

    await database.each('SELECT * FROM users;', (err, row) => {
        if (err) throw err;
    });
}