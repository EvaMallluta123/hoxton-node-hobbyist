import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"


const prisma=new PrismaClient()
const app= express()
app.use(cors())
app.use(express.json())

const port= 5000
app.get(`/users`, async(req,res)=>{
const users= await prisma.user.findMany({include:{hobby: true}})
res.send(users)

})


app.get(`/users/:id`, async(req,res)=>{
const oneuser=await prisma.user.findUnique({where:{id: Number(req.params.id)} ,
include: {hobby: true}
})
if(oneuser){
res.send(oneuser)
}
else{
    res.status(404).send({error:"User not found"})
}
})

app.get(`/hobby`, async(req,res)=>{
    const hobby= await prisma.hobby.findMany({include:{user: true}})
    res.send(hobby)
    
    })

    
    app.get(`/hobby/:id`, async(req,res)=>{
    const onehobby=await prisma.hobby.findUnique({where:{id: Number(req.params.id)} ,
    include: {user: true}
    })
    if(onehobby){
    res.send(onehobby)
    }
    else{
        res.status(404).send({error:"Hobby not found"})
    }
    })
    app.listen(port)