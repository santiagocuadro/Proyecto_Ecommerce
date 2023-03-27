import { 
  DATE_UTILS,
  LOGGER_UTILS
} from '../../utils/index.js';
import { ChatDao } from '../../Dao/index.js';
import moduleName from 'http';

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);



const guardarMensaje = async (message) => {
  const dateFormated = DATE_UTILS.getTimestamp();
  const newMessage = { ...message, createdAt: `${dateFormated} hs` };
  await ChatDao.save(newMessage);
  const allMessage = await Message.getAll();
  io.sockets.emit("all message", allMessage);
};

const enviarTodosLosMensajes = async (socket) => {
  const allMessage = await Message.getAll();
  socket.emit("all message", allMessage);
};


const enviarMensaje = async (req, res) => {
	try {
		io.on("connection", async (socket) => {

			enviarTodosLosMensajes();		

			socket.on("new message", (nuevoMensaje) => {
				guardarMensaje(nuevoMensaje);
			});
		});
	} catch (error) {
		await LOGGER_UTILS.addLog(error);
	}
}



const enviarEmail = () => {}






const ChatController = {
	enviarMensaje,
	enviarEmail,
}