import "./database";
import 'dotenv/config';

import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/error.controller";
import express from 'express';
import queriesRoutes from './routes/query.route';
import blogsRoutes from './routes/blog.route';
import userRoutes from './routes/user.route';

import res from "express/lib/response";



const server = express();

server.get('/', (req, res) => {
    res.status(200).json({success: true, message: "You successfully on salim's app API"})
});

const port = 3000;

server.listen(port, () => {console.log("Server listening on port "+port)});



server.use(express.json());

server.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

server.use('/api/v1/queries', queriesRoutes);
server.use('/api/v1/blogs', blogsRoutes);
server.use('/api/v1/users', userRoutes);


server.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

  server.use(globalErrorHandler);
 