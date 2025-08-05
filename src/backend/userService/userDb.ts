import sqlite3 from 'sqlite3';
import { open, Database} from 'sqlite';
import bcrypt from 'bcryptjs';

sqlite3.verbose();

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
        const user = await this.db.get(`SELECT * FROM users WHERE email IS ? OR googleEmail IS ?`, [email, email]);
        if (!user) {
            return null;
        }
        return user;
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
        await this.db.run(`
            INSERT INTO users (username, password, email, googleEmail, pathToProfilePicture, friends, pendingFriends, requestedFriends) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [username, password, email, googleEmail, pathToPP, null, null, null, null]);
    }

    async insertGoogleUser(email:string): Promise<void> {
        if (!this.db) {
            return;
        }
        await this.db.run(`
            INSERT INTO users (username, password, email, googleEmail, isGoogleRegister, pathToProfilePicture, friends, pendingFriends, requestedFriends) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?)`, [null, null, null, email, 1, null, null, null, null]);
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
        const row = await this.db.run(`
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
        const row = await this.db.run(`
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

    async getFriends(email: string): Promise<string | null> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const friendsList = await this.db.get(`
            SELECT friends 
            FROM users 
            WHERE email = ${email} OR googleEmail = ${email}`);
        if (!friendsList) {
            return null;
        }
        return friendsList.friends as string;
    }

    async  getPendingFriends(email: string): Promise<string | null> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const pendingList = await this.db.get(`
            SELECT pendingFriends 
            FROM users 
            WHERE email = ${email} OR googleEmail = ${email}`);
        if (!pendingList) {
            return null;
        }
        return pendingList.pendingFriends;
    }

    async getRequestedFriends(email: string): Promise<string | null> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const requestList = await this.db.get(`
            SELECT requestedFriends 
            FROM users 
            WHERE email = ${email} OR googleEmail = ${email}`);
        if (!requestList) {
            return null;
        }
        return requestList.requestedFriends;
    }

    async setFriendRequestPending(fromEmail: string, toEmail: string): Promise<boolean> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const userFriends = await this.getFriends(fromEmail);
        const friendFriends = await this.getFriends(toEmail);

        if (!userFriends || !friendFriends) {
            return false;
        }

        if(userFriends.includes(toEmail) && friendFriends.includes(fromEmail)){
            return false;
        } else if (userFriends.includes(toEmail) && friendFriends.includes(fromEmail)) {
            if (! await this.acceptFriendRequest(fromEmail, toEmail)) {
                return false;
            }
            return true;
        }

        let pendingFrom = await this.getPendingFriends(fromEmail);
        let requestTo = await this.getRequestedFriends(toEmail);
        if (!pendingFrom || !requestTo) {
            return false;
        }

        let newPending = pendingFrom;
        if (!newPending) {
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

        const updatedPending = await this.db.run(`
            UPDATE users
            SET pendingFriends = ?
            WHERE email = ? OR googleEmail = ?`,
        [newPending, fromEmail, fromEmail]);
        let changes = updatedPending.changes || 0;
        if (changes > 1) {
            throw new Error("more then 1 row was effected when updating friend pending");
        } else if (changes == 0) {
            return false;
        }

        const updatedRequest = await this.db.run(`
            UPDATE users
            SET requestedFriends = ?
            WHERE email = ? OR googleEmail = ?`,
        [newRequest, toEmail, toEmail]);
        changes = updatedRequest.changes || 0;
        if (changes > 1) {
            await this.db.run(`
                UPDATE users
                SET pendingFriends = ?
                WHERE email = ? OR googleEmail = ?`,
                [pendingFrom, fromEmail, fromEmail]
            );
            throw new Error("more then 1 row was effected when updating friend request");
        } else if (changes == 0) {
            await this.db.run(`
                UPDATE users
                SET pendingFriends = ?
                WHERE email = ? OR googleEmail = ?`,
                [pendingFrom, fromEmail, fromEmail]
            );
            return false;
        }

        return true;
    }

    async acceptFriendRequest(userEmail: string, fromEmail: string): Promise<boolean> {
        if (!this.db) {
            throw new Error('database is null');
        }
        let user = await this.findUserByEmail(userEmail);
        if (!user) {
            return false;
        }
        
        let friend = await this.findUserByEmail(fromEmail);
        if (!friend) {
            return false;
        }

        let userFriends = user.friends as string;
        let friendFriends = friend.friends as string;
        if (userFriends.includes(fromEmail)) {
            if (friendFriends.includes(userEmail)) {
                if (! await this.removeRequestPending(userEmail, fromEmail)) {
                    return false;
                }
                return true;
            }
            
            if (!friendFriends) {
                friendFriends = userEmail;
            } else {
                friendFriends += ',' + userEmail;
            }
        } else if (friendFriends.includes(userEmail)) {
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

        let row = await this.db.run(`
            UPDATE users
            SET friends = ?
            WHERE email = ? OR googleEmail = ?`,
            [userFriends, userEmail, userEmail]
        );
        let changes = row.changes || 0;
        if (changes > 1) {
            throw new Error('more then 1 row effected when updating user friends field');
        } else if (changes == 0) {
            return false;
        }

        row = await this.db.run(`
            UPDATE users
            SET friends = ?
            WHERE email = ? OR googleEmail = ?`,
            [userFriends, fromEmail, fromEmail]
        );
        changes = row.changes || 0;
        if (changes > 1) {
            await this.db.run(`
                UPDATE users
                SET friends = ?
                WHERE email = ? OR googleEmail = ?`,
                [user.friends, userEmail, userEmail]
            );
            throw new Error('more then 1 row efected when updating friend friends field');
        } else if (changes == 0) {
            await this.db.run(`
                UPDATE users
                SET friends = ?
                WHERE email = ? OR googleEmail = ?`,
                [user.friends, userEmail, userEmail]
            );
            return false;
        }
        if (! await this.removeRequestPending(userEmail, fromEmail)) {
            await this.db.run(`
                UPDATE users
                SET friends = ?
                WHERE email = ? OR googleEmail = ?`,
                [user.friends, userEmail, userEmail]
            );
            await this.db.run(`
                UPDATE users
                SET friends = ?
                WHERE email = ? OR googleEmail = ?`,
                [friend.friends, fromEmail, fromEmail]
            );
            return false;
        }
        return true;
    }

    async removeRequestPending(userEmail: string, friendEmail: string): Promise<boolean> {
        if (!this.db) {
            throw new Error('database is null');
        }
        let userPending = await this.db.get(`
            SELECT friendsPending
            FROM users
            WHERE email = ? OR googleEmail = ?`,
            [friendEmail, friendEmail]
        );
        if (!userPending) {
            return false;
        }

        let friendRequests = await this.db.get(`
            SELECT requestedFriends
            FROM users
            WHERE email = ? OR googleEmail = ?`,
            [userEmail, userEmail]
        );
        if (!friendRequests) {
            return false;
        }
        
        const pending = userPending.friendsPending as string;
        const request = friendRequests.requestedFriends as string;
        const newPending = pending.split(',')
            .map(email => email.trim())
            .filter(email => email !== friendEmail)
            .join(',');
        const newRequest = request.split(',')
            .map(email => email !== userEmail)
            .join(',');
        
        let row = await this.db.run(`
            UPDATE users
            SET friendsPending = ${newPending}
            WHERE email = ${userEmail} OR googleEmail = ${userEmail}`
        );
        let changes = row.changes || 0;
        if (changes > 1) {
            throw new Error('error when removing pending friend');
        }

        row = await this.db.run(`
            UPDATE users
            SET requestedFriends = ${newRequest}
            WHERE email = ${friendEmail} OR googleEmail = ${friendEmail}`
        );
        changes = row.changes || 0;
        if (changes > 1) {
            await this.db.run(`
                UPDATE users
                SET friendsPending = ${pending}
                WHERE email = ${userEmail} OR googleEmail = ${userEmail}`
            );
            throw new Error("error when removing request friend");
        }
        return true;
    }

    async seedDatabase(): Promise<void> {
        if (!this.db) {
            throw new Error('database is null');
        }
        const isSeeded = await this.db.get('SELECT * from meta;');
        if (isSeeded)
            return;
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

        await this.db.each('SELECT * FROM users;', (err, row) => {
            if (err) throw err;
        });
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