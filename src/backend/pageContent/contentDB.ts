import sqlite3 from 'sqlite3';
import { open, Database } from "sqlite"

const dbfile = process.env.PAGE_CONTENT_DATABASE_PATH;
if (!dbfile) {
    throw new Error('env data missing');
}

export const db: Promise<Database> = open({ 
    filename: dbfile,
    driver: sqlite3.Database
}).then (async (database) => {
    await database.run(`
        CREATE TABLE IF NOT EXISTS pageContent (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        language TEXT NOT NULL,
        textKey TEXT NOT NULL,
        body TEXT NOT NULL,
        UNIQUE(language, textKey)
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

export async function getAllContentOfPage(language: string, textkeys: string[]): Promise<Map<string, string> | null | 'ERROR'>{
    try {
        const database = await db;
        const placeholders = textkeys.map(() => '?').join(', ');
        const query = `
        SELECT textKey, body
        FROM pageContent
        WHERE language = ? AND textKey IN (${placeholders})`;

        const rows: { textKey: string; body: string }[] = await database.all(query, [
            language,
            ...textkeys,
        ]);
        console.log('expected textkyes:', textkeys);
        console.log('fetched rows:', rows.map(r => r.textKey))
        if (rows.length < textkeys.length) {
            return null;
        }

        const map = new Map<string, string>();
        for (const row of rows) {
            map.set(row.textKey, row.body);
        }
        return map;
    } catch (error: any) {
        console.error('Batch select error', error);
        return 'ERROR';
    }
}

export async function seedContentDb(): Promise<void> {
    try {
        const database = await db;
        const isSeeded = await database.get('SELECT * FROM meta LIMIT 1');
        if (isSeeded) {
            return;
        }

        await database.run(`INSERT INTO meta (seeded) VALUES ('true');`);

        const statement = await database.prepare(
            'INSERT INTO pageContent (language, textKey, body) VALUES (?, ?, ?)'
        );

        await statement.run('en', 'homePageText', `Welcome to the home page!`);
        await statement.run('nl', 'homePageText', 'Welkome op the hoofd pagina!');
        await statement.run('en', 'emailText', 'Email:');
        await statement.run('nl', 'emailText', 'Email:');
        await statement.run('en', 'passwordText', 'Password:');
        await statement.run('nl', 'passwordText', 'Wachtwoord:');
        await statement.run('en', 'loginButtonText', 'Login');
        await statement.run('nl', 'loginButtonText', 'Login');
        await statement.run('en', 'usernameText', 'Username:');
        await statement.run('nl', 'usernameText', 'Gebruikersnaam:');
        await statement.run('en', 'registerButtonText', 'Register');
        await statement.run('nl', 'registerButtonText', 'Registreer:');
        await statement.run('en', 'profileText', 'Hello {email} this is your profile.');
        await statement.run('nl', 'profileText', 'Hallo {email} dit is uw profiel.');
        await statement.run('en', 'logoutNavbarText', 'Logout');
        await statement.run('nl', 'logoutNavbarText', 'Uitloggen');
        await statement.run('en', 'loginNavbarText', 'Login');
        await statement.run('nl', 'loginNavbarText', 'Inloggen');
        await statement.run('en', 'registerNavbarText', 'Register');
        await statement.run('nl', 'registerNavbarText', 'Registreren');
        await statement.run('en', 'homeNavbarText', 'Home Page');
        await statement.run('nl', 'homeNavbarText', 'Hoofd Pagina');
        await statement.run('en', 'profileNavbarText', 'Profile');
        await statement.run('nl', 'profileNavbarText', 'Profiel');
        await statement.finalize();

    } catch (error: any) {
        console.error("Error seeding content page:", error)
    }
}