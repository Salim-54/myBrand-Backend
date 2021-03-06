import cors from "cors";
import morgan from "morgan";
import "./database";
import 'dotenv/config';

import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/error.controller";
import express from 'express';
import queriesRoutes from './routes/query.route';
import blogsRoutes from './routes/blog.route';
import userRoutes from './routes/user.route';
import commentsRoutes from './routes/comments.route';
import subcriberRoutes from './routes/subcriber.route';
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./api.json";



import res from "express/lib/response";



const server = express();
server.use(cors());
server.use(morgan('dev'));


server.get('/', (req, res) => {
    res.status(200).json({success: true, message: "You successfully on salim's app API"})
});

server.use(express.json());

server.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

server.use('/api/v1/queries', queriesRoutes);
server.use('/api/v1/blogs', blogsRoutes);
server.use('/api/v1/users', userRoutes);
server.use('/api/v1/comments', commentsRoutes);
server.use('/api/v1/subscribe', subcriberRoutes);
server.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, { explorer: true })
);


server.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

  server.use(globalErrorHandler);


  export default server;
 