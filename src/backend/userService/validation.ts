import bcrypt from 'bcryptjs';
import type { patchBody, registerBody, loginBody } from './server.js';
import fs from 'fs';
import type { MultipartFile } from '@fastify/multipart';
import path from 'path';

 class Validator {
    private passwordPattern: RegExp;
    private usernamePattern: RegExp;
    private emailPattern:RegExp;
    private mimeTypeList: string[];

    constructor() {
        this.passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-\_=+\[\]{};:'",.<>\/?\\|]).+$/);
        this.usernamePattern = new RegExp(/^[a-zA-Z0-9_]+$/);
        this.emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
        this.mimeTypeList = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp', 'image/svg+xml'];
    }

    validateUserUpdateData(data: patchBody, isGoogleLogin: number): string[] {
        const validator = [
            (data: patchBody) => this.validateNewUsername(data.newUsername),
            (data: patchBody) => this.validateNewPassword(data.newPassword),
            (data: patchBody) => this.validateNewEmail(data.newEmail),
            (data: patchBody) => this.validateOldEmail(data.oldEmail),
            (data: patchBody) => this.validateOldPassword(data.oldEmail),
            (data: patchBody) => this.validateOldUsername(data.oldUsername, isGoogleLogin),
            (data: patchBody) => this.validatePathToProfileP(data.pathToProfileP)
        ];

        const errors = validator.flatMap((validator) => validator(data));
        return errors;
    }

    validateRegisterData(data: registerBody): string[] {
        data.email = data.email.trim();
        data.password = data.password.trim();
        data.username = data.username.trim();
        const validator = [
            (data: registerBody) => this.validateEmail(data.email),
            (data: registerBody) => this.validatePassword(data.password),
            (data: registerBody) => this.validateUsername(data.username)
        ];

        const errors = validator.flatMap((validator) => validator(data));
        return errors;
    }

    validateLoginData(data: loginBody): string[] {
        data.email = data.email.trim();
        data.password = data.password.trim();
        const validator = [
            (data: loginBody) => this.validateEmail(data.email),
            (data: loginBody) => this.validatePassword(data.password)
        ];
        const errors = validator.flatMap((validator) => validator(data));
        return errors;
    }

    async validateFile(part: MultipartFile): Promise<string | 'TOO LARGE' | 'MIMETYPE INCORRECT'> {
        let size = 0;
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
        const chunks = [];
        for await (const chunk of part.file) {
            size += chunk.length;
            if (size > MAX_FILE_SIZE) {
                return 'TOO LARGE';
            }
            chunks.push(chunk);
        }
        const fileBuffer = Buffer.concat(chunks);
        const ext = path.extname(part.filename);
        const fileName = `user_${Date.now()}${ext}`;
        const mimeType = part.mimetype;
        if (!this.checkMimeType(mimeType)) {
            return 'MIMETYPE INCORRECT';
        }
        const filePath = path.join(__dirname, '..', 'uploads', 'profile_pictures', fileName);
        fs.writeFileSync(filePath, fileBuffer);
        return filePath;
    }

    async verifyPassword( password1: string, password2: string ): Promise<boolean> {
        return await bcrypt.compare(password1, password2)
    }

    private testPasswordPattern(password: string): boolean {
        return this.passwordPattern.test(password);
    }

    private testUsernamePattern(username: string): boolean {
        return this.usernamePattern.test(username);
    }

    private testEmailPattern(email: string): boolean {
        return this.emailPattern.test(email);
    }

    private validateNewUsername(username: string | null): string[] {
        const errors = [];
        if (typeof username !== 'string' && username !== null) {
            errors.push('errorNewUsername');
        }

        if (typeof username === 'string') {
            if (username === '') {
                username = null;
            } else if (!this.testUsernamePattern(username)) {
                errors.push('errorUsername');
            }
        }
        return errors;
    }

    private validateNewPassword(password: string | null):string[] {
        const errors = [];
        if (typeof password !== 'string' && password !== null) {
            errors.push('errorPasswordType');
        } else if (typeof password === 'string') {
            password = password.trim();
            if (password === '') {
                password = null;
            } else {
                if (!this.testPasswordPattern(password) || password.length < 12 ) {
                    errors.push('errorNewPassword');
                }
            }
        }
        return errors;
    }

    private validateNewEmail(email: string | null): string[] {
        const errors = [];
        if (typeof email !== 'string' && email !== null) {
            errors.push('errorNewEmailType');
        }
        if (typeof email === 'undefined') {
            errors.push('errorEmailUndefined');
        }
        else if (email !== null) {
            email = email.trim();
            if (email === '') {
                email = null;
            } else {
                if (!this.testEmailPattern(email) || email.length > 320) {
                    errors.push('errorEmailFormat');
                }
            }
        }
        return errors;
    }

    private validateOldEmail(email: string | null): string[] {
        const errors = [];
        if ((typeof email !== 'string' && email !== null) || email === '') {
            errors.push('errorEmailNoString')
        } else {
            if (email !== null) {
                email = email.trim() as string;
                if (typeof email === 'undefined') {
                    errors.push('errorEmailUndefined');
                }
                else if (!this.testEmailPattern(email) || email.length > 320) {
                    errors.push('errorEmailFormat');
                }
            }
        }
        return errors;
    }

    private validateOldPassword(password: string | null): string[] {
        const errors = [];
        if ((typeof password !== 'string' && password !== null) || password === '') {
            errors.push('errorPasswordNoString');
        } else {
            if (password !== null) {
                password = password.trim();
                if (!this.testPasswordPattern(password) || password.length < 12) {
                    errors.push('errorNewPassword');
                }
            }
        }
        return errors;
    }

    private validateOldUsername(username: string | null, isGoogleLogin: number): string[] {
        const errors = [];
        if (isGoogleLogin === 0) {
            if (typeof username !== 'string' || username === '') {
                errors.push('errorUsernameNoString');
            } else if (typeof username === 'string' && !this.testUsernamePattern(username)) {
                errors.push('errorUsername');
            }
        }
        return errors;
    }

    private validatePathToProfileP(pathToProfileP: string | null): string[] {
        const errors = [];
        if (typeof pathToProfileP === 'string') {
            if (!fs.existsSync(pathToProfileP)) {
                errors.push('errorNoPath');
            }
        }
        return errors;
    }

    private validateEmail(email: string): string[] {
        const errors = [];
        if ((typeof email !== 'string' && email !== null) || email === '') {
            errors.push('errorEmailNoString')
        } else {
            if (email !== null) {
                email = email?.trim() as string;
                if (typeof email === 'undefined') {
                    errors.push('errorEmailUndefined');
                }
                else if (!this.testEmailPattern(email) || email.length > 320) {
                    errors.push('errorEmailFormat');
                }
            }
        }
        return errors;
    }

    private validatePassword(password: string): string[] {
        const errors = [];
        if ((typeof password !== 'string' && password !== null) || password === '') {
            errors.push('errorPasswordNoString');
        } else {
            if (password !== null) {
                password = password.trim();
                if (!this.testPasswordPattern(password) || password.length < 12) {
                    errors.push('errorNewPassword');
                }
            }
        }
        return errors;
    }

    private validateUsername(username: string): string[] {
         const errors = [];
        if (typeof username !== 'string') {
            errors.push('errorUsernameNoString');
        } else {
            if (!this.testUsernamePattern(username)) {
                errors.push('errorUsername');
            }
        }
        return errors;
    }

    private checkMimeType(type: string): boolean {
        for (const item in this.mimeTypeList) {
            if (type === item) {
                return true;
            }
        }
        return false;
    }
 }

export default Validator;
