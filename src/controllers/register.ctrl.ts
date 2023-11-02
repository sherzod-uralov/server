import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import * as redis from 'redis';
import { deCode } from '../helpers/jwt.helper.js';
import { User } from '../models/users/users.model';
import bcrypt from 'bcrypt' 

async function func() {
  const url = 'redis://redis-10081.c265.us-east-1-2.ec2.cloud.redislabs.com:10081';
  const client = await redis.createClient({ url ,password:'W4SbAUPSADlYXhnXBg1QKlz7wV7hYUn4'}).connect();
  return client;
}

func()
  .then((client) => {
    console.log('Connected to Redis');
    // Use the client for Redis operations
  })
  .catch((error) => {
    console.error('Error connecting to Redis:', error);
  });
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
} 


const register = async (req: Request, res: Response) => {
  try { 
    const { email,username,password } = req.body;
    const redisClient = await func()

    const verificationCode = generateVerificationCode();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { 
        user: 'sherzoduralov444@gmail.com',
        pass: 'zrqj ceix dqig hsqk',
      },
    });

    const mailOptions = {
      from: 'micrasoft_todo@gmail.com',
      to: email,
      subject: "Ro'yxatdan o'tish uchun tekshiruv kodi",
      html: `
        <html>
          <head>
            <style>
              button {
                background-color: #007BFF;
                color: #fff;
                padding: 10px 20px;
                margin:0 auto;
                display:block;
                border: none;
                margin-top:25px;
                border-radius: 5px;
                text-decoration: none;
              }
              button:hover{
                background-color:black;
                transition:0.4s;
              }
              .img{
                margin:0 auto;
                display:block;
                width:100%
              }
            </style>
          </head>
          <body>
            <p>Ro'yxatdan o'tish uchun tekshiruv kodingiz</p>
            <img class="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJSPhf7NaatJ-ppCy2vSNbZdVA-nKcOn9_eQ&usqp=CAU"></img>
            <button>${verificationCode}</button>
          </body>
        </html>
      `,
    };
    
    

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) { 
        res.status(500).json('Email yuborishda xatolik yuz berdi.');
      } else {
         await redisClient.setEx('email',60,JSON.stringify({verificationCode,username,password,email}));
        return res.status(200).json({
          status:200,
          msg:'tekshiruv kodi emailingizga yuborildi!'
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, msg: 'Internal server error' });
  } 
};

const verifyCode = async (req:Request,res:Response) => { 
  try {
    const {code} = req.body;
    const redisClient = await func()

    let email:string | null = await redisClient.get('email');

    console.log(email);
    
    const vcode = JSON.parse(email as string); 
 
    if(!email){
      return res.status(400).json({
        status:400,
        msg:"kod yuborilmagan yoki xatolik yuz berdi"
      }) 
    }
     

    if(vcode && Number(vcode.verificationCode) === Number(code)){

      const findUser = await User.findOne({where:{email:vcode.email}});

      if(findUser){
        return res.status(201).json({
          status:409,
          msg:'alredy verified' 
        })
      } 

      const hashPaswd = await bcrypt.hash(vcode.password,5); 

      await User.create({
        username:vcode.username, 
        email:vcode.email,
        password:hashPaswd
      });

      const user = await User.findOne({ where: { username: vcode.username } });

      const token = deCode({email:vcode.email,username:vcode.username,user_id:user?.user_id});

      await redisClient.del('email');
      return res.status(201).json({
        status:201,
        msg:'verified',
        token
      })
    }else{
      return res.status(400).json({
        status:400,
        msg:'wrong password'
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, msg: 'Internal server error' });

  }
}

export { register ,verifyCode};



