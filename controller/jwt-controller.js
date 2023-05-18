import { verify } from 'myjwt';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return response.status(401).json({ msg: 'token is missing' });
    }

    try {
        const user = verify({ token, secret: process.env.ACCESS_SECRET_KEY });
        request.user = user;
        next();
    } catch (error) {
        return response.status(403).json({ msg: error.message });
    }
}
