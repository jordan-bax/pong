import bcrypt from 'bcryptjs';
import { patchBody, registerBody, loginBody } from './index';

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

export function validateUserUpdateData(data: patchBody): string[] {
    const errors = [];
    if (typeof data.newUsername !== 'string' && typeof data.newUsername !== null) {
        errors.push('New Username needs to be string or null');
    }
    if (typeof data.newUsername === 'string' && data.newUsername === '') {
        data.newUsername = null;
    }

    if (typeof data.newPassword !== 'string' && typeof data.newPassword !== null) {
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

    if (typeof data.newEmail !== 'string' && typeof data.newEmail !== null) {
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

    if (typeof data.oldEmail !== 'string' || data.oldEmail === '') {
        errors.push('Old email needs to be a string')
    } else {
        data.oldEmail = data.oldEmail.trim();
        if (typeof data.oldEmail === 'undefined') {
            errors.push('Old Email is undefined');
        }
        else if (!testEmailPattern(data.oldEmail) || data.oldEmail.length > 320) {
            errors.push('Invalid old email address format');
        }
    }

    if (typeof data.oldPassword !== 'string' || data.oldPassword === '') {
        errors.push('Old password needs to be a string');
    } else {
        data.oldPassword = data.oldPassword.trim();
        if (!testPasswordPattern(data.oldPassword) || data.oldPassword.length < 12) {
            errors.push(`Invalid password: your password should be at least 12 characters long, 
                have at least 1 upper case letter, 
                have at least 1 lower case letter, 
                have at least 1 number, 
                and have at least 1 special character`);
        }
    }

    if (typeof data.oldUsername !== 'string' || data.oldUsername === '') {
        errors.push('Old password needs to be a string');
    }

    return errors;
}

export function validateRegisterData(data: registerBody): string[] {
    const errors = [];
    data.email = data.email.trim();
    data.password = data.password.trim();
    data.username = data.username.trim();

    if (typeof data.email !== 'string' || !testEmailPattern(data.email) || data.email.length > 320) {
        errors.push('Invalid email given');
    }

    if (typeof data.username !== 'string') {
        errors.push('Invalid username');
    } else {
        if (!testUsernamePattern(data.username)) {
            errors.push('username must only consist of letters and numbers');
        }
    }

    if (typeof data.password !== 'string' || data.password.length < 12 || !testPasswordPattern(data.password)) {
        errors.push(`Invalid password: your password should be at least 12 characters long, 
            have at least 1 upper case letter, 
            have at least 1 lower case letter, 
            have at least 1 number, 
            and have at least 1 special character`);
    }
    return errors;
}

export function validateLoginData(data: loginBody): string[] {
    const errors = [];
    data.email = data.email.trim();
    data.password = data.password.trim();

    if (typeof data.email !== 'string'|| !testEmailPattern(data.email) || data.email.length > 320) {
        errors.push('Invalid email given');
    }

    if (typeof data.password !== 'string' || !testPasswordPattern(data.password) || data.password.length < 12) {
          errors.push(`Invalid password: your password should be at least 12 characters long, 
            have at least 1 upper case letter, 
            have at least 1 lower case letter, 
            have at least 1 number, 
            and have at least 1 special character`);  
    }
    return errors;
}

export async function verifyPassword( password1: string, password2: string ): Promise<boolean> {
   return await bcrypt.compare(password1, password2)
}