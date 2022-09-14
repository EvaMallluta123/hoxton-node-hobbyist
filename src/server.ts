import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;
app.get(`/users`, async (req, res) => {
  const users = await prisma.user.findMany({ include: { hobby: true } });
  res.send(users);
});

app.get(`/users/:id`, async (req, res) => {
  const oneuser = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    include: { hobby: true },
  });
  if (oneuser) {
    res.send(oneuser);
  } else {
    res.status(404).send({ error: "User not found" });
  }
});
app.post(`/users`, async (req, res) => {
    const userData  = {
        name: req.body.name,
        image: req.body.image,
        email:req.body.email,
        hobby: req.body.hobby ? req.body.hobby : []
      }
    
    const newuser = await prisma.user.create({
        data: {
            name: userData.name,
            image: userData.image,
            email:userData.email,
            hobby: {
              // @ts-ignore
              connectOrCreate: userData.hobby.map(hobbi => ({
                where: { name: hobbi },
                create: { name: hobbi }
              }))
            }
          },
          include: { hobby: true }
        })
    res.send(newuser);
  });
  
  app.delete(`/users/:id`, async (req, res) => {
    //   const id=Number(req.params.id)
    const deletedUser = await prisma.user.delete({ where: { id : Number(req.params.id)} });
    res.send(deletedUser);
  });
  //hobby

app.get(`/hobby`, async (req, res) => {
  const hobby = await prisma.hobby.findMany({ include: { user: true } });
  res.send(hobby);
});

app.get(`/hobby/:id`, async (req, res) => {
  const onehobby = await prisma.hobby.findUnique({
    where: { id: Number(req.params.id) },
    include: { user: true },
  });
  if (onehobby) {
    res.send(onehobby);
  } else {
    res.status(404).send({ error: "Hobby not found" });
  }
});

app.post(`/hobby`, async (req, res) => {
    const hobbyData  = {
        name: req.body.name,
        image:req.body.image,
        user: req.body.user ? req.body.user : []
      }            
  const newhobby = await prisma.hobby.create({
    data: {
        name: hobbyData.name,
        image: hobbyData.image,
        user : {
          // @ts-ignore
          connectOrCreate: hobbyData.user.map(user1 => ({
            where: { name: user1 },
            create: { name: user1 }
          }))
        }
      },
      include: { user: true }
    })
  res.send(newhobby);
});

app.delete(`/hobby/:id`, async (req, res) => {
    const id=Number(req.params.id)
  const deletedHobby = await prisma.hobby.delete({ where: { id} });
  res.send(deletedHobby);
});
app.listen(port);
