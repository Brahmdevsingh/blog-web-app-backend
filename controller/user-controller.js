import User from '../model/user.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Token from '../model/token.js';
import { sign, decode } from 'myjwt';

dotenv.config();

export const singupUser = async (request, response) => {

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const user = { username: request.body.username, name: request.body.name, password: hashedPassword }
        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'signup successfull' })
    }
    catch (error) {


        return response.status(500).json({ msg: 'Error while signup the user' })
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessTokenPayload = { ...user.toJSON(), expiresIn: '15m' };
            const accessToken = sign({
                payload: accessTokenPayload,
                secret: process.env.ACCESS_SECRET_KEY,
            });

            const refreshTokenPayload = { ...user.toJSON() };
            const refreshToken = sign({
                payload: refreshTokenPayload,
                secret: process.env.REFRESH_SECRET_KEY,
            });

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return response.status(200).json({
                accessToken,
                refreshToken,
                name: user.name,
                username: user.username,
            });
        } else {
            return response.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        return response.status(500).json({ msg: 'Error while login in user' });
    }
};
