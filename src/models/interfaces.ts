

export interface ISkin extends Document {
    name: string;
    kind: string;
    price: number;
    color: string;
    user: IUser;
}

export interface IUser extends Document{
    _id: string;
    name: string;
    password: string;
    email: string;
    status?: Boolean;
}

export interface ISkinJson{
    id: number;
    name: string;
    kind: string;
    price: number;
    color: string;
}