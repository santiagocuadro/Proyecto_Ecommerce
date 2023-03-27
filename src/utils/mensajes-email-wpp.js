import twilio from 'twilio';
import nodemailer from 'nodemailer';
import { config } from '../config/index.js';

const enviarEmail = async (destino, subject, html) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 587,
		auth: {
			user: config.EMAIL.user,
			pass: config.EMAIL.pass
		}
})
	const email = {
  	from: 'Servidor Node.js',
  	to: destino,
  	subject: subject,
  	html: html
	}

	try {
 		await transporter.sendMail(email);
	} catch (error) {
		console.log(error)
	}
}


const enviarWpp = (destino, mensaje) => {

	const client = twilio(
		config.WPP.SID,
		config.WPP.PASS,
	)

	client.messages.create({
		body: mensaje,
		from: config.WPP.NUMBER,
		to: destino
	})
}

export { 
	enviarEmail,
	enviarWpp 
};
