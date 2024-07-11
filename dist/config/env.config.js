"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCESS_TOKEN_SECRET = exports.RECAPTCHA_SECRET_KEY = exports.DBURI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || '3000';
exports.PORT = PORT;
const DBURI = process.env.DBURI || 'mongodb://localhost:27017/studentdb';
exports.DBURI = DBURI;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
exports.RECAPTCHA_SECRET_KEY = RECAPTCHA_SECRET_KEY;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
