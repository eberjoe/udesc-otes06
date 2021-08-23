"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const endpoints_1 = __importDefault(require("./endpoints"));
const app = express_1.default();
const port = 8080; // porta default
// defina uma rota para a Home
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use(endpoints_1.default);
// inicializa o servidor Express
server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map