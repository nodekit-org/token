"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const jwt = require("jsonwebtoken");
const logTag = chalk_1.default.cyan('[token]');
const TokenError = {
    TOKEN_CREATE_ERROR: 'TOKEN_CREATE_ERROR',
    TOKEN_DECODE_ERROR: 'TOKEN_DECODE_ERROR',
    TOKEN_NOT_INITIALIZED: 'TOKEN_NOT_INITIALIZED',
};
class Token {
    constructor({ privateKey, tokenDuration = '1d', }) {
        this.isInitialized = false;
        if (privateKey !== undefined && tokenDuration !== undefined) {
            this.isInitialized = true;
            this.privateKey = privateKey;
            this.tokenDuration = tokenDuration;
            console.log(`${logTag} token is initialized with %o`, arguments[0]);
        }
        else {
            console.error(`${logTag} 'privateKey' or 'tokenDuration' undefined`);
            throw new Error('token argument not legit');
        }
    }
    create({ payload, }) {
        return new Promise((resolve, reject) => {
            rejectIfNotInitialized(this.isInitialized, reject);
            jwt.sign(payload, this.privateKey, {
                expiresIn: this.tokenDuration,
            }, (err, token) => {
                if (err) {
                    console.error(`${logTag} error while generating token, %o`, err);
                    reject({ error: TokenError.TOKEN_CREATE_ERROR });
                }
                else {
                    resolve(token);
                }
            });
        });
    }
    decode({ token, }) {
        return new Promise((resolve, reject) => {
            rejectIfNotInitialized(this.isInitialized, reject);
            jwt.verify(token, this.privateKey, (err, decoded) => {
                if (err) {
                    console.error(`${logTag} error while decoding token, %o`, err);
                    reject({ error: TokenError.TOKEN_DECODE_ERROR });
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
exports.default = Token;
function rejectIfNotInitialized(isInitialized, reject) {
    if (!isInitialized) {
        console.error(`${logTag} token is not initialized`);
        reject({ error: TokenError.TOKEN_NOT_INITIALIZED });
    }
}
