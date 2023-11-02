import jwt from 'jsonwebtoken'


const deCode = (payload:Object) => {
    return jwt.sign(payload,process.env.SEC_KEY as string);
}


const unCode = (token:string) => {
    return jwt.verify(token,process.env.SEC_KEY as string);
}


export {deCode,unCode};


