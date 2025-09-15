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

        console.log(`db query is ${query}`);
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
        await statement.run('en', 'gameNavDropText', 'Game Menu');
        await statement.run('nl', 'gameNavDropText', 'Spel Menu');
        await statement.run('de', 'gameNavDropText', 'Spielmenü');
        await statement.run('en', 'gameNavPongText', 'Pong');
        await statement.run('nl', 'gameNavPongText', 'Pong');
        await statement.run('de', 'gameNavPongText', 'Pong');
        await statement.run('en', 'gameNavHistoryText', 'History');
        await statement.run('nl', 'gameNavHistoryText', 'Geschiedenis');
        await statement.run('de', 'gameNavHistoryText', 'Geschichte');
        await statement.run('en', 'gameNavTournamentText', 'Tournament');
        await statement.run('nl', 'gameNavTournamentText', 'Competitie');
        await statement.run('de', 'gameNavTournamentText', 'Turnier')
        await statement.run('en', 'languageSettingText', 'Language Options:');
        await statement.run('nl', 'languageSettingText', 'Taal Opties');
        await statement.run('de', 'languageSettingText', 'Sprachoptionen');
        await statement.run('en', 'notificationSettingText', 'Notification Options');
        await statement.run('nl', 'notificationSettingText', 'Notificatie Optie');
        await statement.run('de', 'notificationSettingText', 'Benachrichtigungsoptionen');
        await statement.run('en', 'settingNavText', 'Settings');
        await statement.run('nl', 'settingNavText', 'Opties');
        await statement.run('de', 'settingNavText', 'Optionen');
        await statement.run('en', 'gameButtonTestText', 'Test Game');
        await statement.run('nl', 'gameButtonTestText', 'Test spel');
        await statement.run('de', 'gameButtonTestText', 'Testspiel');
        await statement.run('en', 'gameButtonQuickJoinText', 'Quick Join');
        await statement.run('nl', 'gameButtonQuickJoinText', 'Snel Meedoen');
        await statement.run('de', 'gameButtonQuickJoinText', 'Schnell beitreten');
        await statement.run('en', 'gameButtonJoinText', 'Join Game');
        await statement.run('nl', 'gameButtonJoinText', 'Meedoen aan Spel');
        await statement.run('de', 'gameButtonJoinText', 'Dem Spiel beitreten');
        await statement.run('en', 'gameButtonLocalText', 'Local');
        await statement.run('nl', 'gameButtonLocalText', 'Lokaal');
        await statement.run('de', 'gameButtonLocalText', 'Lokal');
        await statement.run('en', 'gameButtonAIText', 'AI');
        await statement.run('nl', 'gameButtonAIText', 'AI');
        await statement.run('de', 'gameButtonAIText', 'AI');
        await statement.run('en', 'backButtonText', 'Back');
        await statement.run('nl', 'backButtonText', 'Terug');
        await statement.run('de', 'backButtonText', 'Zurück');
        await statement.run('en', 'noUserIdError', 'Failed to retrieve user ID');
        await statement.run('nl', 'noUserIdError', 'Ophalen van de user ID is mislukt');
        await statement.run('de', 'noUserIdError', 'Benutzer-ID konnte nicht abgerufen werden');
        await statement.run('en', 'noOpenGamesError', 'No open games available');
        await statement.run('nl', 'noOpenGamesError', 'Geen open spellen beschrikbaar');
        await statement.run('de', 'noOpenGamesError', 'Keine offenen Spiele verfügbar');
        await statement.run('en', 'gameHistoryButtonText', 'Game History');
        await statement.run('nl', 'gameHistoryButtonText', 'Spel geschiedenis');
        await statement.run('de', 'gameHistoryButtonText', 'Spielverlauf');
        await statement.run('en', 'testNotificationButtonText', 'Test Notify');
        await statement.run('nl', 'testNotificationButtonText', 'Test Notificatie');
        await statement.run('de', 'testNotificationButtonText', 'Testbenachrichtigung');
        await statement.run('en', 'loginNeededError', 'You need to be logged in to do this');
        await statement.run('nl', 'loginNeededError', 'U moet ingelogd zijn om dit te doen');
        await statement.run('de', 'loginNeededError', 'Sie müssen dazu angemeldet sein');
        await statement.run('en', 'createTournamentText', 'Create new tournament');
        await statement.run('nl', 'createTournamentText', 'Maak een nieuwe competitie');
        await statement.run('de', 'createTournamentText', 'Neues Turnier erstellen');
        await statement.run('en', 'cancelText', 'Cancel');
        await statement.run('nl', 'cancelText', 'Anuleren');
        await statement.run('de', 'cancelText', 'Beenden');
        await statement.run('en', 'submitText', 'Submit');
        await statement.run('nl', 'submitText', 'Indienen');
        await statement.run('de', 'submitText', 'Einreichen');
        await statement.run('en', 'searchUserButtonText', 'Search users');
        await statement.run('nl', 'searchUserButtonText', 'Zoek gebruikers');
        await statement.run('de', 'searchUserButtonText', 'Benutzer suchen');
        await statement.run('en', 'addFriendButtonText', 'Add friend');
        await statement.run('nl', 'addFriendButtonText', 'Vried toevoegen');
        await statement.run('de', 'addFriendButtonText', 'Freund hinzufügen');
        await statement.run('en', 'friendsLabelText', 'Friends');
        await statement.run('nl', 'friendsLabelText', 'Vrienden');
        await statement.run('de', 'friendsLabelText', 'Freunde');
        await statement.run('en', 'outstandingFriendsLabelText', 'Oustanding friend requests');
        await statement.run('nl', 'outstandingFriendsLabelText', 'Uitstande vriendenverzoeken');
        await statement.run('de', 'outstandingFriendsLabelText', 'Ausstehende Freundschaftsanfragen');
        await statement.run('en', 'incomingFriendsLabelText', 'Incoming friend requests');
        await statement.run('nl', 'incomingFriendsLabelText', 'Inkomende vriendenverzoeken');
        await statement.run('de', 'incomingFriendsLabelText', 'Eingehende Freundschaftsanfragen');
        await statement.run('en', 'searchUserPlaceholderText', 'Search for user by username or email');
        await statement.run('nl', 'searchUserPlaceholderText', 'Zoek naar gebruikers via gebruikersnaam of email');
        await statement.run('de', 'searchUserPlaceholderText', 'Suchen Sie nach Benutzern anhand des Benutzernamens oder der E-Mail-Adresse');
        await statement.run('en', 'notificationNavbarText', '🔔 New notification');
        await statement.run('nl', 'notificationNavbarText', '🔔 nieuewe notificatie');
        await statement.run('de', 'notificationNavbarText', '🔔 neue Benachrichtigung');
        await statement.run('en', 'gameIdLabel', 'Game ID');
        await statement.run('nl', 'gameIdLabel', 'Spel ID');
        await statement.run('de', 'gameIdLabel', 'Spiel ID');
        await statement.run('en', 'gameTypeLabel', 'Type of game');
        await statement.run('nl', 'gameTypeLabel', 'Spel type');
        await statement.run('de', 'gameTypeLabel', 'Spieltyp');
        await statement.run('en', 'gamePlayer1Label', 'Player 1');
        await statement.run('nl', 'gamePlayer1Label', 'Speler 1');
        await statement.run('de', 'gamePlayer1Label', 'Spieler 1');
        await statement.run('en', 'gamePlayer2Label', 'Player 2');
        await statement.run('nl', 'gamePlayer2Label', 'Speler 2');
        await statement.run('de', 'gamePlayer2Label', 'Spieler 2');
        await statement.run('en', 'gamePlayer1ScoreLabel', 'Player 1 score');
        await statement.run('nl', 'gamePlayer1ScoreLabel', 'Speler 1 punten');
        await statement.run('de', 'gamePlayer1ScoreLabel', 'Spieler 1 Punktestand');
        await statement.run('en', 'gamePlayer2ScoreLabel', 'Player 2 score');
        await statement.run('nl', 'gamePlayer2ScoreLabel', 'Speler 2 punten');
        await statement.run('de', 'gamePlayer2ScoreLabel', 'Spieler 2 Punktestand');
        await statement.run('en', 'gamePlayerOutcomeLabel', 'Winner');
        await statement.run('nl', 'gamePlayerOutcomeLabel', 'Winaar');
        await statement.run('de', 'gamePlayerOutcomeLabel', 'Gewinner');
        await statement.run('en', 'gameDateLabel', 'Date');
        await statement.run('nl', 'gameDateLabel', 'Datum');
        await statement.run('de', 'gameDateLabel', 'Datum');
        await statement.run('en', 'historyId', 'ID');
        await statement.run('nl', 'historyId', 'ID');
        await statement.run('de', 'historyId', 'ID');
        await statement.run('en', 'historyName', 'Name');
        await statement.run('nl', 'historyName', 'Naam');
        await statement.run('de', 'historyName', 'Name');
        await statement.run('en', 'historyPlayers', 'Players');
        await statement.run('nl', 'historyPlayers', 'Spelers');
        await statement.run('de', 'historyPlayers', 'Spieler');
        await statement.run('en', 'historyRounds', 'Rounds');
        await statement.run('nl', 'historyRounds', 'Rondes');
        await statement.run('de', 'historyRounds', 'Runden');
        await statement.run('en', 'historyStart', 'Start time');
        await statement.run('nl', 'historyStart', 'Start tijd');
        await statement.run('de', 'historyStart', 'Startzeit');
        await statement.run('en', 'historyAction', 'Actions');
        await statement.run('nl', 'historyAction', 'Acties');
        await statement.run('de', 'historyAction', 'Aktionen');
        await statement.run('en', 'historyLock', 'Lock time');
        await statement.run('nl', 'historyLock', 'Tijd gelocked');
        await statement.run('de', 'historyLock', 'Sperrzeit');
        await statement.run('en', 'gameRatio', 'win/played ratio');
        await statement.run('nl', 'gameRatio', 'gewonnen/gespeed ratio');
        await statement.run('de', 'gameRatio', 'Gewinn-/Spielverhältnis');
        await statement.run('en', 'randomStat', 'random');
        await statement.run('nl', 'randomStat', 'random');
        await statement.run('de', 'randomStat', 'zufällige');
        await statement.run('en', 'friendStat', 'Friend');
        await statement.run('nl', 'friendStat', 'vriend');
        await statement.run('de', 'friendStat', 'Freund');
        await statement.run('en', 'aiStat', 'AI');
        await statement.run('nl', 'aiStat', 'AI');
        await statement.run('de', 'aiStat', 'AI');
        await statement.run('en', 'tournamentStat', 'Tournament');
        await statement.run('nl', 'tournamentStat', 'Competitie');
        await statement.run('de', 'tournamentStat', 'Turnier');
        await statement.run('en', 'localStat', 'local');
        await statement.run('nl', 'localStat', 'Lokaal');
        await statement.run('de', 'localStat', 'Lokal');
        await statement.run('en', 'tournamentNameText', 'Tournament Name');
        await statement.run('nl', 'tournamentNameText', 'Compititie Naam');
        await statement.run('de', 'tournamentNameText', 'Turniername');
        await statement.run('en', 'tournamentPlayersText', 'How many players');
        await statement.run('nl', 'tournamentPlayersText', 'Hoeveel spelers');
        await statement.run('de', 'tournamentPlayersText', 'Wie viele Spieler');
        await statement.run('en', 'tournamentDurationText', 'Duration before locking');
        await statement.run('nl', 'tournamentDurationText', 'Duratie voor dat het gelock is');
        await statement.run('de', 'tournamentDurationText', 'Dauer vor dem Sperren');

        await statement.finalize();

    } catch (error: any) {
        console.error("Error seeding content page:", error)
    }
}
