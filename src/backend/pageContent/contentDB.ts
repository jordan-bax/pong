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
        await statement.run('de', 'homePageText', 'Willkommen auf der Homepage!')
        await statement.run('en', 'emailText', 'Email:');
        await statement.run('nl', 'emailText', 'Email:');
        await statement.run('de', 'emailText', 'E-Mail');
        await statement.run('en', 'passwordText', 'Password:');
        await statement.run('nl', 'passwordText', 'Wachtwoord:');
        await statement.run('de', 'passwordText', 'Passwort');
        await statement.run('en', 'loginButtonText', 'Login');
        await statement.run('nl', 'loginButtonText', 'Login');
        await statement.run('de', 'loginButtonText', 'Login');
        await statement.run('en', 'usernameText', 'Username:');
        await statement.run('nl', 'usernameText', 'Gebruikersnaam:');
        await statement.run('de', 'usernameText', 'Benutzername')
        await statement.run('en', 'registerButtonText', 'Register');
        await statement.run('nl', 'registerButtonText', 'Registreer:');
        await statement.run('de', 'registerButtonText', 'Registrieren');
        await statement.run('en', 'logoutNavbarText', 'Logout');
        await statement.run('nl', 'logoutNavbarText', 'Uitloggen');
        await statement.run('de', 'logoutNavbarText', 'Abmelden');
        await statement.run('en', 'loginNavbarText', 'Login');
        await statement.run('nl', 'loginNavbarText', 'Inloggen');
        await statement.run('de', 'loginNavbarText', 'Login');
        await statement.run('en', 'registerNavbarText', 'Register');
        await statement.run('nl', 'registerNavbarText', 'Registreren');
        await statement.run('de', 'registerNavbarText', 'Registrieren')
        await statement.run('en', 'homeNavbarText', 'Home Page');
        await statement.run('nl', 'homeNavbarText', 'Hoofd Pagina');
        await statement.run('de', 'homeNavbarText', 'Startseite')
        await statement.run('en', 'profileNavbarText', 'Profile');
        await statement.run('nl', 'profileNavbarText', 'Profiel');
        await statement.run('de', 'profileNavbarText', 'Profil');
        await statement.run('en', 'updateProfileButtonText', 'Update');
        await statement.run('nl', 'updateProfileButtonText', 'Updaten');
        await statement.run('de', 'updateProfileButtonText', 'Aktualisieren');
        await statement.run('en', 'profilePictureLabelText', 'Profile picture');
        await statement.run('nl', 'profilePictureLabelText', 'Profiel foto');
        await statement.run('de', 'profilePictureLabelText', 'Profilbild')
        await statement.run('en', 'exitButtonText', 'Exit');
        await statement.run('nl', 'exitButtonText', 'Exit');
        await statement.run('de', 'exitButtonText', 'Beenden')
        await statement.run('en', 'notFoundText', 'Page not found');
        await statement.run('nl', 'notFoundText', 'Pagina niet gevonden');
        await statement.run('de', 'notFoundText', 'Seite nicht gefunden');
        await statement.run('en', 'gameNavbarText', 'Games');
        await statement.run('nl', 'gameNavbarText', 'Spel');
        await statement.run('de', 'gameNavbarText', 'Spiel');
        await statement.run('en', 'languageOptionText', 'EN');
        await statement.run('nl', 'languageOptionText', 'NL');
        await statement.run('de', 'languageOptionText', 'DE');
        await statement.run('en', 'fileTooLarge', 'File cannot be larger then 10MB');
        await statement.run('nl', 'fileTooLarge', 'Bestand kan niet groter zijn dan 10MB');
        await statement.run('de', 'fileTooLarge', 'Die Datei darf nicht größer als 10 MB sein');
        await statement.run('en', 'fileIncorrectMime', 'Wrong file type');
        await statement.run('nl', 'fileIncorrectMime', 'Verkeerden bestand type.');
        await statement.run('de', 'fileIncorrectMime', 'Falscher Dateityp')
        await statement.run('en', 'serverError', 'Internal Server Error');
        await statement.run('nl', 'serverError', 'Interne Server Error');
        await statement.run('de', 'serverError', 'Interner Serverfehler')
        await statement.run('en', 'incorrectLogin', 'Incorrect email or password');
        await statement.run('nl', 'incorrectLogin', 'Verkereden email of wachtwoord');
        await statement.run('de', 'incorrectLogin', 'Falsche E-Mail oder Passwort')
        await statement.run('en', 'noLogin', 'No user logged in');
        await statement.run('nl', 'noLogin', 'Geen gebruiker is ingelogt');
        await statement.run('de', 'noLogin', 'Kein Benutzer angemeldet');
        await statement.run('en', 'unauthorized', 'Unauthorized');
        await statement.run('nl', 'unauthorized', 'Geen toegang');
        await statement.run('de', 'unauthorized', 'Unbefugt')
        await statement.run('en', 'noUser', 'User not found');
        await statement.run('nl', 'noUser', 'Gebruiker niet gevonden');
        await statement.run('de', 'noUser', 'Benutzer nicht gefunden')
        await statement.run('en', 'googleToken', 'Invalid token');
        await statement.run('nl', 'googleToken', 'Verkeerden token');
        await statement.run('de', 'googleToken', 'Falsches Token')
        await statement.run('en', 'wrongInfo', 'Wrong info');
        await statement.run('nl', 'wrongInfo', 'Verkeerde informatie');
        await statement.run('de', 'wrontInfo', 'Falsche Informationen');
        await statement.run('en', 'noGmail', 'No user with this gmail is found');
        await statement.run('nl', 'noGmail', 'Geen gebruiker met deze gmail is gevonden');
        await statement.run('de', 'noGmail', 'Es wurde kein Benutzer mit diesem Gmail gefunden');
        await statement.run('en', 'noUserDb', 'User not found');
        await statement.run('nl', 'noUserDb', 'Gebruiker niet gevonden');
        await statement.run('de', 'noUserDb', 'Benutzer nicht gefunden');
        await statement.run('en', 'noImage', 'Image not found');
        await statement.run('nl', 'noImage', 'Foto niet gevonden');
        await statement.run('de', 'noImage', 'Bild nicht gefunden');
        await statement.run('en', 'errorUsername', 'Username needs to contain only upper- and lowercase letters and/or numbers');
        await statement.run('nl', 'errorUsername', 'Gebruikersnaam moet alleen bestaan uit groten en kleinen letters en/of getallen');
        await statement.run('de', 'errorUsername', 'Der Benutzername darf nur Groß- und Kleinbuchstaben und/oder Zahlen enthalten');
        await statement.run('en', 'errorNewUsername', 'Username needs to be a string or empty');
        await statement.run('nl', 'errorNewUsername', 'Gebruikersnaam moet een string zijn of leeg');
        await statement.run('de', 'errorNewUsername', 'Der Benutzername muss eine Zeichenfolge oder leer sein');
        await statement.run('en', 'errorPasswordType', 'Password needs to be a string or emtpy');
        await statement.run('nl', 'errorPasswordType', 'Wachtwoord moet text zijn of leeg');
        await statement.run('de', 'errorPasswordType', 'Das Passwort muss eine Zeichenfolge sein oder leer sein');
        await statement.run('en', 'errorNewPassword', 'Invalid password, it should have at least 1 uppercase character, 1 lowercase chareacter, 1 number, 1 special character, and be at least 12 characters long');
        await statement.run('nl', 'errorNewPassword', 'Fout wachtwoord, het moet tenminsten 1 hoofdletter, 1 kleinen letter, 1 getal hebben, en tenminste 12 charakters lang zijn');
        await statement.run('de', 'errorNewPassword', 'Ungültiges Passwort. Es muss mindestens 1 Großbuchstaben, 1 Kleinbuchstaben, 1 Zahl, 1 Sonderzeichen und mindestens 12 Zeichen lang sein.');
        await statement.run('en', 'errorNewEmailType', 'Email must be a valid email or empty');
        await statement.run('nl', 'errorNewEmailType', 'Email moet een goed geformateerde email zijn, of leeg');
        await statement.run('de', 'errorNewEmailType', 'Die E-Mail-Adresse muss gültig oder leer sein.');
        await statement.run('en', 'errorEmailUndefined', 'Email is undefined');
        await statement.run('nl', 'errorEmailUndefined', 'Email is ombekend');
        await statement.run('de', 'errorEmailUndefined', 'E-Mail ist nicht definiert');
        await statement.run('en', 'errorEmailFormat', 'Email is not formatted properly');
        await statement.run('nl', 'errorEmailFormat', 'Email is niet juist geformateerd');
        await statement.run('de', 'errorEmailFormat', 'E-Mail ist nicht richtig formatiert');
        await statement.run('en', 'errorEmailNoString', 'Email needs to be a valid email');
        await statement.run('nl', 'errorEmailNoString', 'Email moet een goed geformateerde email zijn');
        await statement.run('de', 'errprEmailNoString', 'Die E-Mail-Adresse muss gültig sein.');
        await statement.run('en', 'errorPasswordNoString', 'Password cannot be empty');
        await statement.run('nl', 'errorPasswordNoString', 'Wachtwoord kan niet leeg zijn');
        await statement.run('de', 'errorPasswordNoString', 'Das Passwort darf nicht leer sein')
        await statement.run('en', 'errorUsernameNoString', 'Username cannot be empty');
        await statement.run('nl', 'errorUsernameNoString', 'Gebruikesnaam mag niet leeg zijn');
        await statement.run('de', 'errorUsernameNoString', 'Benutzername darf nicht leer sein');
        await statement.run('en', 'errorNoPath', 'Path does not exist');
        await statement.run('nl', 'errorNoPath', 'Het pad bestaad niet');
        await statement.run('de', 'errorNoPath', 'Pfad existiert nicht');
        await statement.run('en', 'fileEmpty', 'The given file is empty');
        await statement.run('nl', 'fileEmpty', 'Het gegeven bestand is leeg');
        await statement.run('de', 'fileEmpty', 'Die angegebene Datei ist leer');
        await statement.run('en', 'noOnlineFriends', 'No friends are currently online');
        await statement.run('nl', 'noOnlineFriends', 'Geen vrienden zijn momenteel online');
        await statement.run('de', 'noOnlineFriends', 'Derzeit sind keine Freunde online');
        await statement.run('en', 'missingQuery', 'The given query is empty');
        await statement.run('nl', 'missingQuery', 'De gegeven query is leeg');
        await statement.run('de', 'missingQuery', 'Die angegebene Abfrage ist leer');
        await statement.run('en', 'noFriends', 'No friends found');
        await statement.run('nl', 'noFriends', 'Geen vrienden gevonden');
        await statement.run('de', 'noFriends', 'Keine Freunde gefunden');
        await statement.run('en', 'noPending', 'No incoming friend requests');
        await statement.run('nl', 'noPending', 'Geen inkomende vrienden verzoeken');
        await statement.run('de', 'noPending', 'Keine eingehenden Freundschaftsanfragen');
        await statement.run('en', 'noRequested', 'No outgoing friend requests');
        await statement.run('nl', 'noRequested', 'Geen uistaande vrienden verzoeken');
        await statement.run('de', 'noRequested', 'Keine ausgehenden Freundschaftsanfragen');
        await statement.run('en', 'noBody', 'No date was send to the server');
        await statement.run('nl', 'noBody', 'Geen data was naar de server gestuurd');
        await statement.run('de', 'noBody', 'Es wurden keine Daten an den Server gesendet');
        await statement.run('en', 'unprocessableEntity', 'Cannot process, username or email already in use');
        await statement.run('nl', 'unprocessableEntity', 'Kan het niet verwerken, gebruikersnaam of email al in gebruik');
        await statement.run('de', 'unprocessableEntity', 'Verarbeitung nicht möglich, Benutzername oder E-Mail bereits verwendet');
        await statement.finalize();

    } catch (error: any) {
        console.error("Error seeding content page:", error)
    }
}