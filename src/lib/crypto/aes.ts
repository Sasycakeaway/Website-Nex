import crypto from 'crypto';
import { Buffer } from 'node:buffer';
import * as config from './config.json';

export function encrypt(text: string) {
	const cipher = crypto.createCipheriv(
		'aes-256-cbc',
		Buffer.from(config.password),
		Buffer.from(config.iv)
	);
	let crypted = cipher.update(text, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

export function decrypt(text: string) {
	const decipher = crypto.createDecipheriv(
		'aes-256-cbc',
		Buffer.from(config.password),
		Buffer.from(config.iv)
	);
	let dec = decipher.update(text, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
}
