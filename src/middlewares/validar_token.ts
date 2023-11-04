import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.Schema';
import { IUser } from '../models/interfaces';

interface payloadToken {
    email: string;
    name: string;
}

declare module 'express' {
    interface Request {
        user?: IUser;
    }
}

export const validarToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('jw-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try {
        if (!process.env.SECRETKEY_JWT) {
            return res.status(400).json({
                msg: 'Error',
            });
        }

        const payload= jwt.verify(token, process.env.SECRETKEY_JWT) as payloadToken;

        
        const { email }= payload;
        
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({
                msg: 'Token no válido',
            });
        }
        
        if (!user.status) {
            return res.status(401).json({
                msg: 'Token no válido',
            });
        }
        
        req.user = user;
        
        next();
    } catch (error) {
    
        console.log(error);
        return res.status(401).json({
            msg: 'Token no existe',
        });
    }
};
