import sqlite3 from 'sqlite3';
import { open, Database} from 'sqlite';
import bcrypt from 'bcryptjs';
import type { TokenPayload } from 'google-auth-library';

sqlite3.verbose();

interface in_transactionRow {
    in_transaction: number;
}

class UserDatabase {
    private db: Database|null
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

    async getUsers(data: string, email: string): Promise<any> {
        if(!this.db) {
            throw new Error('database is null');
        }
        const query = `%${data}%`;
        const users = await this.db.all(`
            SELECT username, email, googleEmail FROM users
            WHERE (LOWER(username) LIKE ? OR LOWER(email) LIKE ? OR LOWER(googleEmail) LIKE ?)
            AND (email != ? OR googleEmail != ?)`,
            [query, query, query, email, email]
        );
        return users;
    }

    async insertUserIntoDatabase(
        username:string | null, 
        password:string | null, 
        email: string | null,
        googleEmail: string | null,
        pathToPP: string | null,
    ): Promise<void>
    {
        if (!this.db) {
            throw new Error('database is null');
        }
        await this.db.exec('BEGIN TRANSACTION');
        try {
            await this.db.run(`
                INSERT INTO users (username, password, email, googleEmail, isGoogleRegister, pathToProfilePicture, friends, pendingFriends, requestedFriends) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [username, password, email, googleEmail, 0, pathToPP, null, null, null]);
            await this.db.exec('COMMIT');
        } catch (err) {
            await this.db.exec('ROLLBACK');
            console.error("transaction error in insert user:", err);
        }
    }

    async insertGoogleUser(payload: TokenPayload, picture: string | null): Promise<void> {
        if (!this.db) {
            throw new Error('database is null');
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
        } catch (err) {
            await this.db.exec('ROLLBACK');
            console.error('error on insert google user', err);
        }
    }

    async  updateUserInfo(
        oldEmail:string, 
        newEmail: string | null, 
        newPassword: string | null, 
        newUsername: string | null,
        googleEmail: string | null,
        pathToPP: string | null,
        oldPassword: string | null,
        oldUsername: string | null
    ): Promise<boolean> 
    {
        if (!this.db) {
            throw new Error('database is null');
        }
        if (newEmail === null) {
            newEmail = oldEmail;
        }
        if (newPassword === null) {
            newPassword = oldPassword
        }
        if (newUsername === null) {
            newUsername = oldUsername;
        }
        if (newPassword !== null) {
            newPassword = await bcrypt.hash(newPassword, 10);
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
            return false;
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

    async  getPendingFriends(email: string): Promise<string | null> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const pendingList = await this.db.all(`
            SELECT pendingFriends 
            FROM users 
            WHERE email = ? OR googleEmail = ?`,
            [email, email]);
        console.log(pendingList);
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
        console.log('list is:', list);
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
        console.log(requestList);
        console.log('email is', email);
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
        console.log('request list is:', list);
        return list;
    }

    async setFriendRequestPending(fromEmail: string, toEmail: string): Promise<boolean> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const userFriends = await this.getFriends(fromEmail);
        const friendFriends = await this.getFriends(toEmail);

        if(userFriends?.includes(toEmail) && friendFriends?.includes(fromEmail)){
            console.log('already friends');
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
                console.log('no changes in pending')
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
                console.log('no changes in requested');
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
        console.log('at start acceptFriendRequest');
        if (!this.db) {
            throw new Error('database is null');
        }
        let user = await this.findUserByEmail(userEmail);
        console.log('user in accept is:', user);
        if (!user) {
            console.error('user is null');
            return false;
        }
        let friend = await this.findUserByEmail(fromEmail);
        console.log('friend in accept is:', friend);
        if (!friend) {
            console.error('friend is null');
            return false;
        }

        let userFriends: string | null = null;
        let friendFriends: string | null = null
        if (user.friends && friend.friends)
        {
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
            
        console.log('users where not found in friends')
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
        console.log('get to update part');

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
        if ( myNewPending === '') {
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
                .map(email=> email.trim())
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
                this.db.exec('RELEASE SAVEPOINT remove_step');
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

    async seedDatabase(): Promise<void> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const isSeeded = await this.db.get('SELECT * from meta;');
        if (isSeeded)
            return;
        await this.db.exec('BEGIN TRANSACTION');
        try {
            await this.db.run(`INSERT INTO meta (seeded) VALUES ('true');`)
            const statement = await this.db.prepare(`
                INSERT INTO users 
                (id, username, password, email, googleEmail, pathToProfilePicture, friends, pendingFriends) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
            );

            let password = await bcrypt.hash('admin', 10);
            await statement.run(3, 'Alice', password, 'aa@mail.com', null, null, 'bt@mail.com', null);

            password = await bcrypt.hash('test', 10);
            await statement.run(4, 'bob', password, 'bt@mail.com', null, null, 'aa@mail.com', null);

            await statement.finalize();

            await this.db.each('SELECT * FROM users;', async (err, row) => {
                if (err)  {
                    await this.db?.exec('ROLLBACK');
                    throw err;
                }
            });
            await this.db.exec('COMMIT');
        } catch (err) {
            this.db.exec('ROLLBACK');
            console.error('error seeding database', err);
        }
    }
    
    private async initdatabase(file: string):Promise<Database>  {
        const database = open({
            filename: file,
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
                friends TEXT,
                pendingFriends TEXT,
                requestedFriends TEXT
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
        return database;
    }
}

export default UserDatabase;