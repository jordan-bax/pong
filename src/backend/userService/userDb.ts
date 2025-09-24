import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import bcrypt from 'bcryptjs';
import type { TokenPayload } from 'google-auth-library';

sqlite3.verbose();

class UserDatabase {
    private db: Database | null
    constructor() {
        this.db = null;
    };

    async start(file: string) {
        this.db = await this.initdatabase(file);
    }

    async close() {
        if (this.db) {
            await this.db.close();
        }
    }

    async isFriend(userid: number, otherId: number): Promise<boolean> {
        if (!this.db) {
            throw new Error('database is null');
        }

        try {
            const user = await this.db.get(`
                SELECT email, googleEmail FROM users
                WEHERE id = ?`,
                [userid]);

            const other = await this.db.get(`
                SELECT friends FROM users
                WHERE id = ?`,
                [otherId]);

            const email = user.email || user.googleEmail as string;
            if (other.email.includes(',')) {
                const friendArray = other.email.split(',') as string[];
                if (typeof friendArray.find(email) !== 'undefined') {
                    return true;
                }
            } else {
                if (other.email === email) {
                    return true;
                }
            }
            return false;
        } catch (err) {
            console.error(`error in checking for friends ${err}`);
        }
        return false;
    }

    async findUserByEmail(email: string): Promise<any> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const user = await this.db.get(`
            SELECT * FROM users
            WHERE email IS ? OR googleEmail IS ?`,
            [email, email]);
        if (!user) {
            return null;
        }
        return user;
    }

    async getUserData(email: string): Promise<any> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const user = await this.db.get(`
            SELECT username, email, googleEmail, friends, pendingFriends, requestedFriends, pathToProfilePicture
            FROM users
            WHERE email = ? OR googleEmail = ?`,
            [email, email]
        );
        return user;
    }

    async getUsers(data: string, email: string): Promise<any> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const query = `%${data}%`;
        const users = await this.db.all(`
            SELECT username, email, googleEmail, isLoggedIn FROM users
            WHERE (LOWER(username) LIKE ? OR LOWER(email) LIKE ? OR LOWER(googleEmail) LIKE ?)
            AND (email != ? OR googleEmail != ?)`,
            [query, query, query, email, email]
        );
        return users;
    }

    async insertUserIntoDatabase(
        username: string | null,
        password: string | null,
        email: string | null,
        googleEmail: string | null,
        pathToPP: string | null,
    ): Promise<boolean | unknown> {
        if (!this.db) {
            throw new Error('database is null');
        }
        if (!(await this.isEmailUnique(email || googleEmail || ''))) {
            console.error('Email already exists');
            return false;
        }
        await this.db.exec('BEGIN TRANSACTION');
        try {
            await this.db.run(`
                INSERT INTO users (username, password, email, googleEmail, isGoogleRegister, pathToProfilePicture, friends, pendingFriends, requestedFriends)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [username, password, email, googleEmail, 0, pathToPP, null, null, null]);
            await this.db.exec('COMMIT');
            return true;
        } catch (err) {
            await this.db.exec('ROLLBACK');
            console.error("transaction error in insert user:", err);
            return err;
        }
    }

    async insertGoogleUser(payload: TokenPayload, picture: string | null): Promise<boolean | unknown> {
        if (!this.db) {
            throw new Error('database is null');
        }

        if (!(await this.isEmailUnique(payload.email || ''))) {
            console.error('Email already exists');
            return false;
        }

        await this.db.exec('BEGIN TRANSACTION');
        try {
            await this.db.run(`
                INSERT INTO users
                (username, password, email, googleEmail, isGoogleRegister, pathToProfilePicture, friends, pendingFriends, requestedFriends)
                VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?)`,
                [
                    typeof payload.given_name !== 'undefined' ? payload.given_name : null,
                    null,
                    null,
                    payload.email,
                    1,
                    picture,
                    null,
                    null,
                    null]);
            await this.db.exec("COMMIT");
            return true;
        } catch (err) {
            await this.db.exec('ROLLBACK');
            console.error('error on insert google user', err);
            return err;
        }
    }

    async updateUserInfo(
        oldEmail: string,
        newEmail: string | null,
        newPassword: string | null,
        newUsername: string | null,
        googleEmail: string | null,
        pathToPP: string | null,
        oldPassword: string | null,
        oldUsername: string | null
    ): Promise<boolean | unknown> {
        let isOld: boolean = false;
        if (!this.db) {
            throw new Error('database is null');
        }
        if (newEmail === null) {
            newEmail = oldEmail;
        }
        const user = await this.findUserByEmail(oldEmail);
        if (newPassword === null) {
            isOld = true;
            newPassword = oldPassword
        }
        if (newUsername === null) {
            newUsername = oldUsername;
        }
        if (newPassword !== null) {
            newPassword = await bcrypt.hash(newPassword, 10);
        }
        if (!(await this.isEmailUnique(oldEmail, user.id))) {
            console.error('Email already exists');
            return false;
        }
        await this.db.exec('BEGIN TRANSACTION');
        try {
            const row = await this.db.run(`
                UPDATE users
                SET username = ?, password = ?, email = ?, googleEmail = ?, pathToProfilePicture = ?
                WHERE email = ?`, [newUsername, newPassword, newEmail, googleEmail, pathToPP, oldEmail]);
            const change = row.changes || 0;
            if (change === 1) {
                await this.db.exec('COMMIT');
                return true;
            } else if (change > 1) {
                await this.db.exec('ROLLBACK');
                console.error('more than one row was effected in updateUserInfo');
                return false;
            } else {
                await this.db.exec('ROLLBACK');
                return false;
            }
        } catch (err) {
            console.error('error on updateUserInfo', err)
            await this.db.exec('ROLLBACK');
            return err;
        }
    }

    async updateUserInfoGoogle(
        newEmail: string | null,
        newPassword: string | null,
        newUsername: string | null,
        googleEmail: string,
        pathToPP: string | null
    ): Promise<boolean> {
        if (!this.db) {
            throw new Error("database is null");
        }
        const user = await this.findUserByEmail(googleEmail);
        if (!(await this.isEmailUnique(googleEmail, user.id))) {
            console.error('Email already exists');
            return false;
        }
        await this.db.exec('BEGIN TRANSACTION');
        try {
            const row = await this.db.run(`
                UPDATE users
                SET username = ?, password = ?, email = ?, googleEmail = ?, pathToProfilePicture = ?
                WHERE googleEmail = ?`, [newUsername, newPassword, newEmail, googleEmail, pathToPP, googleEmail]);
            const change = row.changes || 0;
            if (change === 1) {
                await this.db.exec('COMMIT');
                return true;
            } else if (change > 1) {
                await this.db.exec('ROLLBACK');
                console.error('more than one row was effected in updateUserInfoGoogle');
                return false;
            } else {
                await this.db.exec('ROLLBACK');
                return false;
            }
        } catch (err) {
            await this.db.exec('ROLLBACK');
            console.error('error on updateUserInfoGoogle', err);
            return false;
        }
    }

    async getFriends(email: string): Promise<string | null> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const friendsList = await this.db.get(`
            SELECT friends
            FROM users
            WHERE email = ? OR googleEmail = ?`,
            [email, email]);
        if (!friendsList) {
            return null;
        };
        return friendsList.friends as string;
    }

    async getPendingFriends(email: string): Promise<string | null> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const pendingList = await this.db.all(`
            SELECT pendingFriends
            FROM users
            WHERE email = ? OR googleEmail = ?`,
            [email, email]);
        if (!pendingList) {
            return null;
        }
        let list: string | null = null;
        for (const pending of pendingList) {
            if (!list) {
                list = pending.pendingFriends;
            } else {
                list += ',' + pending.pendingFriends;
            }
        }
        return list;
    }

    async getRequestedFriends(email: string): Promise<string | null> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const requestList = await this.db.all(`
            SELECT requestedFriends
            FROM users
            WHERE email = ? OR googleEmail = ?`,
            [email, email]);
        if (!requestList) {
            return null;
        }
        let list: string | null = null;
        for (const rq of requestList) {
            if (!list) {
                list = rq.requestedFriends;
            } else {
                list += ',' + rq.requestedFriends;
            }
        }
        return list;
    }

    async setFriendRequestPending(fromEmail: string, toEmail: string): Promise<boolean> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const userFriends = await this.getFriends(fromEmail);
        const friendFriends = await this.getFriends(toEmail);

        if (userFriends?.includes(toEmail) && friendFriends?.includes(fromEmail)) {
            return false;
        }

        let pendingFrom = await this.getPendingFriends(fromEmail);
        let requestTo = await this.getRequestedFriends(toEmail);
        if (pendingFrom?.includes(toEmail) && requestTo?.includes(fromEmail)) {
            return false;
        }

        let newPending = pendingFrom;
        if (!newPending || newPending === '0') {
            newPending = toEmail
        } else {
            newPending += ',' + toEmail
        }
        let newRequest = requestTo;
        if (!newRequest) {
            newRequest = fromEmail;
        } else {
            newRequest += ',' + fromEmail;
        }
        await this.db.exec('BEGIN TRANSACTION');
        try {
            const updatedPending = await this.db.run(`
                UPDATE users
                SET pendingFriends = ?
                WHERE email = ? OR googleEmail = ?`,
                [newPending, fromEmail, fromEmail]);
            let changes = updatedPending.changes || 0;
            if (changes > 1) {
                await this.db.exec('ROLLBACK');
                console.error("more then 1 row was effected when updating friend pending");
                return false;
            } else if (changes == 0) {
                await this.db.exec('ROLLBACK');
                return false;
            }

            const updatedRequest = await this.db.run(`
                UPDATE users
                SET requestedFriends = ?
                WHERE email = ? OR googleEmail = ?`,
                [newRequest, toEmail, toEmail]);
            changes = updatedRequest.changes || 0;
            if (changes > 1) {
                await this.db.exec('ROLLBACK');
                console.error("more then 1 row was effected when updating friend request");
            } else if (changes == 0) {
                await this.db.exec('ROLLBACK');
                return false;
            }
            await this.db.exec('COMMIT');
            return true;
        } catch (err) {
            await this.db.exec('ROLLBACK');
            console.error('error in setFriendRequestPending', err);
            return false;
        }
    }

    async acceptFriendRequest(userEmail: string, fromEmail: string): Promise<boolean> {
        if (!this.db) {
            throw new Error('database is null');
        }
        let user = await this.getUserData(userEmail);
        if (!user) {
            console.error('user is null');
            return false;
        }
        let friend = await this.getUserData(fromEmail);
        if (!friend) {
            console.error('friend is null');
            return false;
        }

        let userFriends: string | null = null;
        let friendFriends: string | null = null
        if (user.friends && friend.friends) {
            userFriends = user.friends as string;
            friendFriends = friend.friends as string;
        }
        if (userFriends?.includes(fromEmail)) {
            if (friendFriends?.includes(userEmail)) {
                if (! await this.removeRequestPending(userEmail, fromEmail, false)) {
                    return false;
                }
                return true;
            }

            if (!friendFriends) {
                friendFriends = userEmail;
            } else {
                friendFriends += ',' + userEmail;
            }
        } else if (friendFriends?.includes(userEmail)) {
            if (!userFriends) {
                userFriends = fromEmail;
            } else {
                userFriends += ',' + fromEmail;
            }
        } else {
            if (!userFriends) {
                userFriends = fromEmail;
            } else {
                userFriends += ',' + fromEmail;
            }
            if (!friendFriends) {
                friendFriends = userEmail;
            } else {
                friendFriends += ',' + userEmail;
            }
        }

        await this.db.exec('BEGIN TRANSACTION');
        try {
            let row = await this.db.run(`
                UPDATE users
                SET friends = ?
                WHERE email = ? OR googleEmail = ?`,
                [userFriends, userEmail, userEmail]
            );
            let changes = row.changes || 0;
            if (changes > 1) {
                await this.db.exec('ROLLBACK');
                console.error('more then 1 row effected when updating user friends field');
                return false;
            } else if (changes == 0) {
                await this.db.exec('ROLLBACK');
                return false;
            }

            row = await this.db.run(`
                UPDATE users
                SET friends = ?
                WHERE email = ? OR googleEmail = ?`,
                [friendFriends, fromEmail, fromEmail]
            );
            changes = row.changes || 0;
            if (changes > 1) {
                await this.db.exec('ROLLBACK');
                console.error('more then 1 row efected when updating friend friends field');
                return false;
            } else if (changes == 0) {
                await this.db.exec('ROLLBACK');
                return false;
            }
            if (! await this.removeRequestPending(userEmail, fromEmail, true)) {
                await this.db.exec('ROLLBACK');
                return false;
            }
            await this.db.exec('COMMIT');
            return true;
        } catch (err) {
            await this.db.exec('ROLLBACK');
            console.error('error in acceptFriendRequest', err);
            return false;
        }
    }

    async removeRequestPending(userEmail: string, friendEmail: string, transaction: boolean): Promise<boolean> {
        if (!this.db) {
            throw new Error('database is null');
        }
        let userPending = await this.db.get(`
            SELECT pendingFriends, requestedFriends
            FROM users
            WHERE email = ? OR googleEmail = ?`,
            [userEmail, userEmail]
        );
        if (!userPending) {
            return false;
        }

        let friendRequests = await this.db.get(`
            SELECT requestedFriends, pendingFriends
            FROM users
            WHERE email = ? OR googleEmail = ?`,
            [friendEmail, friendEmail]
        );
        if (!friendRequests) {
            return false;
        }
        const myPending = userPending.pendingFriends as string | null;
        let myNewPending: string | null = null;
        if (myPending) {
            myNewPending = myPending.split(',')
                .map(email => email.trim())
                .filter(email => email != friendEmail)
                .join(',');
        }
        if (myNewPending === '') {
            myNewPending = null;
        }
        const myRequest = userPending.requestedFriends as string;
        let myNewRequest: string | null = null;
        if (myRequest) {
            myNewRequest = myRequest.split(',')
                .map(email => email.trim())
                .filter(email => email != friendEmail)
                .join(',');
        }
        if (myNewRequest === '') {
            myNewRequest = null;
        }
        const friendPending = friendRequests.pendingFriends as string;
        let newFriendPending: string | null = null;
        if (friendPending) {
            newFriendPending = friendEmail.split(',')
                .map(email => email.trim())
                .filter(email => email != userEmail)
                .join(',');
        }
        if (newFriendPending === '') {
            newFriendPending = null;
        }
        const friendRequest = friendRequests.requestedFriends as string;
        let newFriendRequest: string | null = null;
        if (friendRequest) {
            newFriendRequest = friendRequest.split(',')
                .map(email => email.trim())
                .filter(email => email != userEmail)
                .join(',');
        }
        if (newFriendRequest === '') {
            newFriendRequest = null;
        }

        if (transaction) {
            await this.db.exec('SAVEPOINT remove_step');
        } else {
            await this.db.exec('BEGIN TRANSACTION');
        }
        try {
            let row = await this.db.run(`
                UPDATE users
                SET pendingFriends = ?, requestedFriends = ?
                WHERE email = ? OR googleEmail = ?`,
                [myNewPending, myNewRequest, userEmail, userEmail]
            );
            let changes = row.changes || 0;
            if (changes > 1) {
                if (transaction) {
                    await this.db.exec('ROLLBACK TO remove_step')
                } else {
                    await this.db.exec('ROLLBACK');
                }
                console.error('error when removing pending friend');
                return false;
            }

            row = await this.db.run(`
                UPDATE users
                SET requestedFriends = ?, pendingFriends = ?
                WHERE email = ? OR googleEmail = ?`,
                [newFriendRequest, newFriendRequest, friendEmail, friendEmail]
            );
            changes = row.changes || 0;
            if (changes > 1) {
                if (transaction) {
                    await this.db.exec('SAVEPOINT remove_step');
                } else {
                    await this.db.exec('BEGIN TRANSACTION');
                }
                console.error("error when removing request friend");
                return false;
            }
            if (transaction) {
                await this.db.exec('RELEASE SAVEPOINT remove_step');
            } else {
                await this.db.exec('COMMIT');
            }
            return true;
        } catch (err) {
            if (transaction) {
                await this.db.exec('SAVEPOINT remove_step');
            } else {
                await this.db.exec('BEGIN TRANSACTION');
            }
            console.error('error in removeRequestPending', err);
            return false;
        }
    }

    async setLoggedStatus(email: string, loginStatus: number): Promise<void> {
        if (!this.db) {
            throw new Error('database is null');
        }

        try {
            await this.db.exec('BEGIN TRANSACTION')
            const rows = await this.db.run(`
                UPDATE users
                SET isLoggedIn = ?
                WHERE email = ? OR googleEmail = ?;`,
                [loginStatus, email, email]);
            if (rows.changes !== 1) {
                await this.db.exec('ROLLBACK');
                return;
            }
            await this.db.exec('COMMIT');
        } catch (err) {
            console.error(`sql errror ${err}`);
            await this.db.exec('ROLLBACK');
            return;
        }
    }

    async getLoggedIn(email: string): Promise<any[] | null> {
        if (!this.db) {
            throw new Error('databaes is null');
        }

        const rows = await this.db.all(`
            SELECT * FROM users
            WHERE isLoggedIn != NULL AND (email != ? OR googleEMail != ?)`,
            [email, email]
        );
        if (rows.length === 0) {
            return null;
        }
        return rows;
    }

    async getLoggedInFriends(email: string): Promise<string | null> {
        const friends = await this.getFriends(email);
        if (!friends) {
            return null;
        }

        if (!this.db) {
            throw new Error('db is null');
        }

        let friendArray: string[] = [];
        if (friends.includes(',')) {
            friendArray = friends.split(',');
        } else {
            friendArray[0] = friends;
        }
        let loggedInFriends: string[] = [];
        for (const friend of friendArray) {
            try {
                const row = await this.db.get(`
                    SELECT * FROM users
                    WHERE (email = ? OR googleEmail = ?)
                    AND isLoggedIn = 1;`,
                    [friend, friend]);
                if (row !== undefined) {
                    loggedInFriends.push(friend);
                }
            } catch (err) {
                console.error(`error on getting online friends ${err}`);
                return null;
            }
        }

        return loggedInFriends.join(',');
    }

    async markOffline(): Promise<void> {
        if (!this.db) {
            console.error('database is null in mark offline');
            return;
        }

        await this.db.exec('BEGIN TRANSACTION');
        const offlineThreasholdMinutes = 2;
        try {
            await this.db.run(
                `UPDATE users
                SET isLoggedIn = 0
                WHERE isLoggedIn < datetime('now', '-${offlineThreasholdMinutes} minutes') AND isLoggedIn != 0`
            );
            await this.db.exec('COMMIT');
        } catch (err) {
            await this.db.exec('ROLLBACK');
            console.error(`error on setting ofline ${err}`);
        }
        return;
    }

    private async isEmailUnique(email: string, id?: number): Promise<boolean> {
        if (!this.db) throw new Error('Database is null');
        if (!email) throw new Error('No email provided');

        let query = `
            SELECT 1
            FROM users
            WHERE (email = ? OR googleEmail = ?)
        `;
        const params: (string | number)[] = [email, email];

        if (id !== undefined) {
            query += ' AND id != ?';
            params.push(id);
        }

        query += ' LIMIT 1;';

        const user = await this.db.get(query, params);
        return !user;
    }

    private async initdatabase(file: string): Promise<Database> {
        const database = open({
            filename: file,
            driver: sqlite3.Database
        }).then(async (database) => {
            await database.run(`
                CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT,
                email TEXT,
                googleEmail TEXT,
                isGoogleRegister INTEGER DEFAULT 0,
                pathToProfilePicture TEXT,
                friends TEXT,
                pendingFriends TEXT,
                requestedFriends TEXT,
                isLoggedIn INTEGER DEFAULT 0
                CHECK (
                    email IS NOT NULL AND email <> ''
                    OR googleEmail IS NOT NULL AND googleEmail <> ''
                )
                );
            `);
			// make db start with id 3
			await database.run(`
				INSERT INTO users (id, username, email)
				VALUES (2, 'dummy', 'dummy@email.com');
			`);

			await database.run(`DELETE FROM users WHERE ID = 2`)
            return database;
        });
        return database;
    }
}

export default UserDatabase;
