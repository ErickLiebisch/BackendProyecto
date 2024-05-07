import nodemailer from 'nodemailer';
import config from '../config/config.js';
export default class EmailService {
    static #instance=null;
    constructor() {
        this.transport= nodemailer.createTransport({
            service: config.emailService,
            port: config.emailPort,
            auth:{
                user:config.emailUser,
                pass:config.emailPass,
            },
        });
    }

    sendEmail(to,subject,html,attachments=[]){
        return this.transport.sendMail({
            to,
            from:config.emailUser,
            subject,
            html,
            attachments,
        });
    }
    sendPassRecover(user,link){
        return this.sendEmail(
            user.email,
        `Hola ${user.first_Name}, Esta es tu recuperación de contraseña`,
        `<p>Haz click aquí para cambiar tu contraseña:</p>
        <a href=${link}>Cambiar contraseña</a>`
        )
    }
    sendDeleteEmail(user,product){
        return this.sendEmail(
            user.email,
        `El producto ${product.title} fue eliminado` ,
        `<p>Tu producto ya no se encuentra en la tiendita de erick.</p>`
        )
    }
    sendOrderEmail(user){
        return this.sendEmail(
            user.email,
        `Pedido confirmado` ,
        `<p>los productos seran enviados a donde solicite.</p>`
        )
    }
    static getInstance(){
        if(!EmailService.#instance){
            EmailService.#instance= new EmailService();
        }
        return EmailService.#instance;
    }
}