"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.html_email = void 0;
const html_email = (code) => {
    `
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
            <button>${code}</button>
          </body>
        </html>
      `;
};
exports.html_email = html_email;
