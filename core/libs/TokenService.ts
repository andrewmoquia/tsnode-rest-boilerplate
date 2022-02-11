/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { CustomResponse, Response401 } from "../defaults";
import { HttpRequest, Identity } from '../libs/ApiEvent';
import 'dotenv/config';

const JWT_TOKEN = process.env?.JWT_TOKEN ?? '';
const JWT_ADMIN_TOKEN = process.env?.JWT_ADMIN_TOKEN ?? '';
export interface TokenReponse {
    token: string;
    data: Identity;
}

export class TokenService {
    static async clientJWT(data: Identity): Promise<string> {
        return await this.generateJWT(data, JWT_TOKEN)
    }

    static async adminJWT(data: Identity): Promise<string> {
        return await this.generateJWT(data, JWT_TOKEN)
    }

    private static async generateJWT(data: Identity, TOKEN: string): Promise<string> {
        const token = jwt.sign({
            data
        }, TOKEN, { expiresIn: '1d' });
        return token;
    }

    static async generateRefreshJWT(data: unknown): Promise<string> {
        const token = jwt.sign({
            data
        }, JWT_TOKEN, { expiresIn: '7d' });
        return token;
    }

    static async verifyToken(token: string): Promise<any> {
        try {
            const response = jwt.verify(token, JWT_TOKEN, (err, decoded) => {
                if (decoded === undefined)
                    throw new CustomResponse(Response401, err?.message);
                return decoded;
            });
            return response;
        }
        catch(e: any) {
            throw new CustomResponse(e, e.message);
        }
    }

    static getUserData(req: HttpRequest): unknown {
        return req?.identity ?? {};
    }
}