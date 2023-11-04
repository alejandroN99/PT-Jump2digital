import jwt from "jsonwebtoken";


export const generarToken = (payload: {name: string, email: string}) => {
    return new Promise ((res, rej) => {

        if(!process.env.SECRETKEY_JWT){
            return rej("El token no se ha podido generar") 
        }

        jwt.sign(payload, process.env.SECRETKEY_JWT,{
            expiresIn: '4h'
        } ,(err,token) => {
            if(err) {
                console.log(err);
                rej("El token no se ha podido generar")
            }else{
                res(token);
            }
        })
    })
}
