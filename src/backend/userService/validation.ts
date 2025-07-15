import bcrypt from 'bcryptjs';
import { patchBody, registerBody, loginBody } from './index';
import fs from 'fs';
import { MultipartFile } from '@fastify/multipart';
import path from 'path';

function testPasswordPattern(password: string ): boolean {
    const re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-\_=+\[\]{};:'",.<>\/?\\|]).+$/);
    return re.test(password);
}

function testUsernamePattern(username: string): boolean {
    const re = new RegExp(/^[a-zA-Z0-9_]+$/);
    return re.test(username);
}

function testEmailPattern(email: string): boolean {
    const re = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
    return re.test(email);
}

function validateNewUsername(data: patchBody): string[] {
    const errors = [];
    if (typeof data.newUsername !== 'string' && data.newUsername !== null) {
        errors.push('errorNewUsername');
    }

    if (typeof data.newUsername === 'string') {
        if (data.newUsername === '') {
            data.newUsername = null;
        } else if (!testUsernamePattern(data.newUsername)) {
            errors.push('errorUsername');
        }
    }

    return errors;
}

function validateNewPassword(data: patchBody): string[] {
    const errors = [];
    if (typeof data.newPassword !== 'string' && data.newPassword !== null) {
        errors.push('errorPasswordType');
    } else if (typeof data.newPassword === 'string') {
        data.newPassword = data.newPassword.trim();
        if (data.newPassword === '') {
            data.newPassword = null;
        } else {
            if (!testPasswordPattern(data.newPassword) || data.newPassword.length < 12 ) {
                errors.push('errorNewPassword');
            }
        }
    }
    return errors;
}

function validateNewEmail(data: patchBody): string[] {
    const errors = [];
    if (typeof data.newEmail !== 'string' && data.newEmail !== null) {
        errors.push('errorNewEmailType');
    }
    if (typeof data.newEmail === 'undefined') {
        errors.push('errorEmailUndefined');
    }
    else if (data.newEmail !== null) {
        data.newEmail = data.newEmail.trim();
        if (data.newEmail === '') {
            data.newEmail = null;
        } else {
            if (!testEmailPattern(data.newEmail) || data.newEmail.length > 320) {
                errors.push('errorEmailFormat');
            }
        }
    }
    return errors;
}

function validateOldEmail(data: patchBody): string[] {
    const errors = [];
    if ((typeof data.oldEmail !== 'string' && data.oldEmail !== null) || data.oldEmail === '') {
        errors.push('errorEmailNoString')
    } else {
        if (data.oldEmail !== null) {
            data.oldEmail = data.oldEmail?.trim() as string;
            if (typeof data.oldEmail === 'undefined') {
                errors.push('errorEmailUndefined');
            }
            else if (!testEmailPattern(data.oldEmail) || data.oldEmail.length > 320) {
                errors.push('errorEmailFormat');
            }
        }
    }
    return errors;
}

function validateOldPassword(data: patchBody): string[] {
    const errors = [];
    if ((typeof data.oldPassword !== 'string' && data.oldPassword !== null) || data.oldPassword === '') {
        errors.push('errorPasswordNoString');
    } else {
        if (data.oldPassword !== null) {
            data.oldPassword = data.oldPassword.trim();
            if (!testPasswordPattern(data.oldPassword) || data.oldPassword.length < 12) {
                errors.push('errorNewPassword');
            }
        }
    }
    return errors;
}

function validateOldUsername(data: patchBody, isGoogleLogin: number): string[] {
    const errors = [];
    if (isGoogleLogin === 0) {
        if (typeof data.oldUsername !== 'string' || data.oldUsername === '') {
            errors.push('errorUsernameNoString');
        } else if (typeof data.oldUsername === 'string' && !testUsernamePattern(data.oldUsername)) {
            errors.push('errorUsername');
        }
    }
    return errors;
}

function validatePathToProfileP(data: patchBody): string[] {
    const errors = [];
    if (typeof data.pathToProfileP === 'string') {
        if (!fs.existsSync(data.pathToProfileP)) {
            errors.push('errorNoPath');
        }
    }
    return errors;
}

function validateEmail(email: string): string[] {
    const errors = [];
    if ((typeof email !== 'string' && email !== null) || email === '') {
        errors.push('errorEmailNoString')
    } else {
        if (email !== null) {
            email = email?.trim() as string;
            if (typeof email === 'undefined') {
                errors.push('errorEmailUndefined');
            }
            else if (!testEmailPattern(email) || email.length > 320) {
                errors.push('errorEmailFormat');
            }
        }
    }
    return errors;
}

function validatePassword(password: string): string[] {
    const errors = [];
    if ((typeof password !== 'string' && password !== null) || password === '') {
        errors.push('errorPasswordNoString');
    } else {
        if (password !== null) {
            password = password.trim();
            if (!testPasswordPattern(password) || password.length < 12) {
                errors.push('errorNewPassword');
            }
        }
    }
    return errors;
}

function validateUsername(username:string): string[] {
    const errors = [];
    if (typeof username !== 'string') {
        errors.push('errorUsernameNoString');
    } else {
        if (!testUsernamePattern(username)) {
            errors.push('errorUsername');
        }
    }
    return errors;
}

function checkMimeType(type: string ): boolean
{
    const list = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp', 'image/svg+xml'];
    for (const item in list) {
        if (type === item) {
            return true;
        }
    }
    return false;
}

export function validateUserUpdateData(data: patchBody, isGoogleLogin: number): string[] {
    const validator = [
        validateNewUsername,
        validateNewPassword,
        validateNewEmail,
        validateOldEmail,
        validateOldPassword,
        (data: patchBody) => validateOldUsername(data, isGoogleLogin),
        validatePathToProfileP
    ];
    const errors = validator.flatMap((validator) => validator(data));
    return errors;
}

export function validateRegisterData(data: registerBody): string[] {
    data.email = data.email.trim();
    data.password = data.password.trim();
    data.username = data.username.trim();
    const validator = [
        (data: registerBody) => validateEmail(data.email),
        (data: registerBody) => validatePassword(data.password),
        (data: registerBody) => validateUsername(data.username)
    ];
    const errors = validator.flatMap((validator) => validator(data));
    return errors;
}

export function validateLoginData(data: loginBody): string[] {
    data.email = data.email.trim();
    data.password = data.password.trim();
    const validator = [
        (data: loginBody) => validateEmail(data.email),
        (data: loginBody) => validatePassword(data.password)
    ];
    const errors = validator.flatMap((validator) => validator(data));
    return errors;
}

export async function validateFile(part: MultipartFile): Promise<string | 'TOO LARGE' | 'MIMETYPE INCORRECT' | 'FILE EMPTY'> {
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
    if (size === 0) {
        return 'FILE EMPTY'
    }
    const fileBuffer = Buffer.concat(chunks);
    const ext = path.extname(part.filename);
    const fileName = `user_${Date.now()}${ext}`;
    const mimeType = part.mimetype;
    if (!checkMimeType(mimeType)) {
        return 'MIMETYPE INCORRECT';
    }
    const filePath = path.join(__dirname, '..', 'uploads', 'profile_pictures', fileName);
    fs.writeFileSync(filePath, fileBuffer);
    return filePath;
}

export async function verifyPassword( password1: string, password2: string ): Promise<boolean> {
   return await bcrypt.compare(password1, password2)
}