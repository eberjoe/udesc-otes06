"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require(".prisma/client");
const endpoints = express_1.default.Router();
const prisma = new client_1.PrismaClient();
endpoints.get('/fetch-user/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                name: req.params.user
            }
        });
        res.status(200).json(user);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
endpoints.post('/create-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield prisma.user.create({
            data: {
                name: req.body.name
            }
        });
        res.status(201).json(newUser);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
exports.default = endpoints;
//# sourceMappingURL=endpoints.js.map