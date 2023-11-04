import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.Schema';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password }: { name: string; email: string; password: string } = req.body; 

        const user = new User({ name, email, password });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        user.password = hash;

        await user.save();

        res.json({
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Talk to the administrator',
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; 

        const user = await User.findByIdAndUpdate(id, { status: false }); 
        if (!user) {
            return res.status(404).json({
                msg: 'User not found!',
            });
        }

        res.json({
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Talk to the administrator',
        });
    }
};
