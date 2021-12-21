
import jwt from 'jsonwebtoken';
import { CustomResponse, Response401 } from "../defaults";
import { HttpRequest } from '../libs/ApiEvent';
import 'dotenv/config';
import { LoginRequest } from '../../apis/login/request';

const JWT_TOKEN = process.env?.JWT_TOKEN ?? '';
class TokenService {
    static async generateJWT(data: LoginRequest): Promise<string> {
        const token = jwt.sign({
            data
        }, JWT_TOKEN, { expiresIn: '1d' });
        return token;
    }

    static async generateRefreshJWT(data: unknown): Promise<string> {
        const token = jwt.sign({
            data
        }, JWT_TOKEN, { expiresIn: '7d' });
        return token;
    }

    static async verifyToken(token: string): Promise<unknown> {
        try {
            const reponse = jwt.verify(token, JWT_TOKEN, (err, decoded) => {
                if (decoded === undefined)
                    throw new CustomResponse(Response401, err?.message);
                return decoded;
            });
            return reponse;
        }
        catch(e: any) {
            throw new CustomResponse(e, e.message);
        }
    }

    static getUserData(req: HttpRequest): unknown {
        return req?.identity ?? {};
    }
}

export { TokenService };