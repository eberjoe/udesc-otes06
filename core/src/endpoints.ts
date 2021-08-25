import express, { Request, Response } from 'express';
import { PrismaClient } from '.prisma/client';

const endpoints = express.Router();
const prisma = new PrismaClient();

endpoints.get('/fetch-user/:user', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: req.params.user
      }
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

endpoints.post('/create-user', async (req: Request, res: Response) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name
      }
    });
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

endpoints.put('/assign-user/:user', async (req: Request, res: Response) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        name: req.params.user
      },
      data: {
        asteroid_id: req.body.id,
        passage_timestamp: req.body.timestamp
      }
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default endpoints;
