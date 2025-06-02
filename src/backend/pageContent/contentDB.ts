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

    return database;
});


export async function getPageContent(
    language: string, 
    textKey: string
): Promise<any | null | 'ERROR'> {
    try {
        const database = await db;

        const row = await database.get(
            'SELECT body FROM pageContent WHERE language = ? ANd textKey = ?',
            [language, textKey]
        );
        
        return row || null;
    } catch (error: any) {
        console.error('Select error', error);
        return 'ERROR';
    }
}

export async function insertPageContent(
    language: string, 
    textKey: string, 
    body: string
): Promise<'OK' | 'ALREADY EXISTS' | 'ERROR'> {
    try {
        const database = await db;
        await database.run(
            'INSERT INTO pageContent (language, textKey, body) VALUES (?, ?, ?)',
            [language, textKey, body]
        );

        return 'OK';
    } catch (error: any) {
        if (error.code == 'SQLITE_CONSTRAINT') {
            return 'ALREADY EXISTS';
        }
        console.error('Insert error:', error);
        return 'ERROR';
    }
}

export async function updatePageContent(
    languageOld: string, 
    languageNew: string, 
    textKeyOld: string, 
    textKeyNew: string, 
    bodyNew: string
): Promise<'OK'| 'NOT FOUND' | 'DUPLICATE' | 'ERROR'> {
    try {
        const database = await db;

        const result = await database.run (
            `UPDATE pageContent SET language = ?, textKey = ?, body = ? 
            WHERE language = ? AND textKey = ?`,
            [languageNew, textKeyNew, bodyNew, languageOld, textKeyOld]
        );

        if (result.changes === 0) {
            return 'NOT FOUND';
        }

        return 'OK';
    } catch (error: any) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return 'DUPLICATE';
        }

        console.error('Update error:', error);
        return 'ERROR'
    }
}

export async function deletePageContent(
    language: string, 
    textKey: string
): Promise<'OK' | 'NOT FOUND' | 'ERROR'> {
    try {
        const database = await db;

        const result = await database.run(
            'DELETE FROM pageContent WHERE language = ? AND textKey = ?',
            [language, textKey]
        );
        if (result.changes === 0 ) {
            return 'NOT FOUND';
        }
        
        return 'OK';
    } catch (error: any) {
        console.error('Delete Error:', error);
        return 'ERROR';
    }
}