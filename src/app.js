import "./database";
import express from 'express';
import queriesRoutes from './routes/query.route';
import blogsRoutes from './routes/blog.route';



const server = express();

// default route
server.get('/', (req, res) => {
    res.status(200).json({success: true, message: "You successfully on salim's app API"})
});

server.use(express.json());

server.use('/api/v1/queries', queriesRoutes);
server.use('/api/v1/blogs', blogsRoutes);


const port = 3000;

server.listen(port, () => {console.log("Server listening on port "+port)});