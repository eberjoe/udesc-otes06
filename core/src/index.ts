import express from "express";
import http from 'http';
import cors from 'cors';

import endpoints from './endpoints';

const app = express();
app.use(cors());
const port = 3333; // porta default

// defina uma rota para a Home
const server = http.createServer(app);
app.use(express.json());
app.use(endpoints);

// inicializa o servidor Express
server.listen( port, () => {
    console.log( `server started at http://localhost:${port}` );
} );