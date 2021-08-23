import express from "express";
import http from 'http';

import endpoints from './endpoints';

const app = express();
const port = 8080; // porta default

// defina uma rota para a Home
const server = http.createServer(app);
app.use(express.json());
app.use(endpoints);

// inicializa o servidor Express
server.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );