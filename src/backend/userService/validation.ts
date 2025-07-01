import bcrypt from 'bcryptjs';
import { patchBody, registerBody, loginBody, googleUpdateBody } from './index';
import fs from 'fs';

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
        errors.push('New Username needs to be string or null');
    }

    if (typeof data.newUsername === 'string' && data.newUsername === '') {
        data.newUsername = null;
    }
    return errors;
}

function validateNewPassword(data: patchBody): string[] {
    const errors = [];
    if (typeof data.newPassword !== 'string' && data.newPassword !== null) {
        errors.push('New Password needs to be  string or null');
    } else if (typeof data.newPassword === 'string') {
        data.newPassword = data.newPassword.trim();
        if (data.newPassword === '') {
            data.newPassword = null;
        } else {
            if (!testPasswordPattern(data.newPassword) || data.newPassword.length < 12 ) {
                errors.push(`Invalid password: your password should be at least 12 characters long, 
                    have at least 1 upper case letter, 
                    have at least 1 lower case letter, 
                    have at least 1 number, 
                    and have at least 1 special character`);
            }
        }
    }
    return errors;
}

function validateNewEmail(data: patchBody): string[] {
    const errors = [];
    if (typeof data.newEmail !== 'string' && data.newEmail !== null) {
        errors.push('New Email must be a valid email address or null');
    }
    if (typeof data.newEmail === 'undefined') {
        errors.push('New Email undefined');
    }
    else if (data.newEmail !== null) {
        data.newEmail = data.newEmail.trim();
        if (data.newEmail === '') {
            data.newEmail = null;
        } else {
            if (!testEmailPattern(data.newEmail) || data.newEmail.length > 320) {
                errors.push('Invalid new email address');
            }
        }
    }
    return errors;
}

function validateOldEmail(data: patchBody): string[] {
    const errors = [];
    if ((typeof data.oldEmail !== 'string' && data.oldEmail !== null) || data.oldEmail === '') {
        errors.push('Old email needs to be a string')
    } else {
        if (data.oldEmail !== null) {
            data.oldEmail = data.oldEmail?.trim() as string;
            if (typeof data.oldEmail === 'undefined') {
                errors.push('Old Email is undefined');
            }
            else if (!testEmailPattern(data.oldEmail) || data.oldEmail.length > 320) {
                errors.push('Invalid old email address format');
            }
        }
    }
    return errors;
}

function validateOldPassword(data: patchBody): string[] {
    const errors = [];
    if ((typeof data.oldPassword !== 'string' && data.oldPassword !== null) || data.oldPassword === '') {
        errors.push('Old password needs to be a string');
    } else {
        if (data.oldPassword !== null) {
            data.oldPassword = data.oldPassword.trim();
            if (!testPasswordPattern(data.oldPassword) || data.oldPassword.length < 12) {
                errors.push(`Invalid password: your password should be at least 12 characters long, 
                    have at least 1 upper case letter, 
                    have at least 1 lower case letter, 
                    have at least 1 number, 
                    and have at least 1 special character`);
            }
        }
    }
    return errors;
}

function validateOldUsername(data: patchBody, isGoogleLogin: number): string[] {
    const errors = [];
    if (isGoogleLogin === 0) {
        if (typeof data.oldUsername !== 'string' || data.oldUsername === '') {
            errors.push('Old username needs to be a string');
        }
    }
    return errors;
}

function validatePathToProfileP(data: patchBody): string[] {
    const errors = [];
    if (typeof data.pathToProfileP === 'string') {
        if (!fs.existsSync(data.pathToProfileP)) {
            errors.push('path to profile does not exist');
        }
    }
    return errors;
}

function validateEmail(email: string): string[] {
    const errors = [];
    if ((typeof email !== 'string' && email !== null) || email === '') {
        errors.push('Email needs to be a string')
    } else {
        if (email !== null) {
            email = email?.trim() as string;
            if (typeof email === 'undefined') {
                errors.push('Email is undefined');
            }
            else if (!testEmailPattern(email) || email.length > 320) {
                errors.push('Invalid email address format');
            }
        }
    }
    return errors;
}

function validatePassword(password: string): string[] {
    const errors = [];
    if ((typeof password !== 'string' && password !== null) || password === '') {
        errors.push('Password needs to be a string');
    } else {
        if (password !== null) {
            password = password.trim();
            if (!testPasswordPattern(password) || password.length < 12) {
                errors.push(`Invalid password: your password should be at least 12 characters long, 
                    have at least 1 upper case letter, 
                    have at least 1 lower case letter, 
                    have at least 1 number, 
                    and have at least 1 special character`);
            }
        }
    }
    return errors;
}

function validateUsername(username:string): string[] {
    const errors = [];
    if (typeof username !== 'string') {
        errors.push('Invalid username');
    } else {
        if (!testUsernamePattern(username)) {
            errors.push('username must only consist of letters and numbers');
        }
    }
    return errors;
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

export async function verifyPassword( password1: string, password2: string ): Promise<boolean> {
   return await bcrypt.compare(password1, password2)
}