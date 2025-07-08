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
        console.log('fetched rows:', rows.map(r => r.textKey));
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
        await statement.run('nl', 'homePageText', 'Welkome op de hoofd pagina!');
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
        await statement.run('en', 'updateProfileButtonText', 'Update');
        await statement.run('nl', 'updateProfileButtonText', 'Updaten');
        await statement.run('en', 'profilePictureLabelText', 'Profile picture');
        await statement.run('nl', 'profilePictureLabelText', 'Profiel foto');
        await statement.run('en', 'exitButtonText', 'Exit');
        await statement.run('nl', 'exitButtonText', 'Exit');
        await statement.run('en', 'notFoundText', 'Page not found');
        await statement.run('nl', 'notFoundText', 'Pagina niet gevonden');
        await statement.run('en', 'gameNavbarText', 'Games');
        await statement.run('nl', 'gameNavbarText', 'Spel');
        await statement.run('en', 'languageOptionText', 'EN');
        await statement.run('nl', 'languageOptionText', 'NL');
        await statement.run('en', 'fileTooLarge', 'File is larger then 10MB');
        await statement.run('nl', 'fileTooLarge', 'Bestand is groter dan 10MB');
        await statement.run('en', 'fileIncorrectMime', 'Wrong file format');
        await statement.run('nl', 'fileIncorrectMime', 'Verkeerden bestand formaat.');
        await statement.run('en', 'serverError', 'Internal Server Error');
        await statement.run('nl', 'serverError', 'Interne Server Error');
        await statement.run('en', 'incorrectLogin', 'Incorrect email or password');
        await statement.run('nl', 'incorrectLogin', 'Verkereden email of wachtwoord');
        await statement.run('en', 'noLogin', 'No user logged in');
        await statement.run('nl', 'noLogin', 'Geen gebruiker is ingelogt');
        await statement.run('en', 'unauthorized', 'Unauthorized');
        await statement.run('nl', 'unauthorized', 'Geen toegang');
        await statement.run('en', 'noUser', 'User not found');
        await statement.run('nl', 'noUser', 'Gebruiker niet gevonden');
        await statement.run('en', 'googleToken', 'Invalid token');
        await statement.run('nl', 'googleToken', 'Verkeerden token');
        await statement.run('en', 'wrongInfo', 'Wrong info');
        await statement.run('nl', 'wrongInfo', 'Verkeerde informatie');
        await statement.run('en', 'noGmail', 'No user with this gmail is found');
        await statement.run('nl', 'noGmail', 'Geen gebruiker met deze gmail is gevonden');
        await statement.run('en', 'noUserDb', 'User not found');
        await statement.run('nl', 'noUserDb', 'Gebruiker niet gevonden');
        await statement.run('en', 'noImage', 'Image not found');
        await statement.run('nl', 'noImage', 'Foto niet gevonden');
        await statement.run('en', 'errorUsername', 'Username needs to contain only upper- and lowercase letters and/or numbers');
        await statement.run('nl', 'errorUsername', 'Gebruikersnaam moet alleen bestaan uit groten en kleinen letters en/of getallen');
        await statement.run('en', 'errorNewUsername', 'Username needs to be a string or empty');
        await statement.run('nl', 'errorNewUsername', 'Gebruikersnaam moet een string zijn of leeg');
        await statement.run('en', 'errorPasswordType', 'Password needs to be a string or emtpy');
        await statement.run('nl', 'errorPasswordType', 'Wachtwoord moet text zijn of leeg');
        await statement.run('en', 'errorNewPassword', 'Invalid password, it should have at least 1 uppercase character, 1 lowercase chareacter, 1 number, 1 special character, and be at least 12 characters long');
        await statement.run('nl', 'errorNewPassword', 'Fout wachtwoord, het moet tenminsten 1 hoofdletter, 1 kleinen letter, 1 getal hebben, en tenminste 12 charakters lang zijn');
        await statement.run('en', 'errorNewEmailType', 'Email must be a valid email or empty');
        await statement.run('nl', 'errorNewEmailType', 'Email moet een goed geformateerde email zijn, of leeg');
        await statement.run('en', 'errorEmailUndefined', 'Email is undefined');
        await statement.run('nl', 'errorEmailUndefined', 'Email is ombekend');
        await statement.run('en', 'errorEmailFormat', 'Email is not formatted properly');
        await statement.run('nl', 'errorEmailFormat', 'Email is niet juist geformateerd');
        await statement.run('en', 'errorEmailNoString', 'Email needs to be a valid email');
        await statement.run('nl', 'errorEmailNoString', 'Email moet een goed geformateerde email zijn');
        await statement.run('en', 'errorPasswordNoString', 'Password cannot be empty');
        await statement.run('nl', 'errorPasswordNoString', 'Wachtwoord kan niet leeg zijn');
        await statement.run('en', 'errorUsernameNoString', 'Username cannot be empty');
        await statement.run('nl', 'errorUsernameNoString', 'Gebruikesnaam mag niet leeg zijn');
        await statement.run('en', 'errorNoPath', 'Path does not exist');
        await statement.run('nl', 'errorNoPath', 'Het pad bestaad niet');
        await statement.finalize();

    } catch (error: any) {
        console.error("Error seeding content page:", error)
    }
}