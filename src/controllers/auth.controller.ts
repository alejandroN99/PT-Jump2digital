import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';
import { generarToken } from '../helpers/generarToken';
import { User } from '../models/user.Schema';

export const authUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password }: { name: string; email: string; password: string } = req.body; 

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Password or email are incorrect!',
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Password or email are incorrect!',
            });
        }

        const token = await generarToken({name, email});

        console.log(token);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Talk to the administrator',
        });
    }
};

