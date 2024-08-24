import express from 'express';
import mongoose from 'mongoose';
import { Schema,model } from 'mongoose';
import cors from "cors";
//  const express=require('express');
//  const mongoose=require('mongoose');
 
 const app=express();
// app.use(express.json())
// let todo=[];

// app.post('/add',async(req,res)=>{
//     const{title,description}=req.body;
//     const newtodo={
//         id:todo.length+1,title,description
//     };
//     todo.push(newtodo);
//     console.log(todo);
//     res.status(201).json(newtodo);
// })

// app.get('/')

// //start server
// const port=3000;
// app.listen(port,()=>{
//     console.log("server is listening to port "+port);
// })

app.use(express.json());
app.use(cors());
let todo=[];
mongoose.connect('mongodb://localhost:27017/vps-organisation').then(() => {
    console.log("hello every one")
}).catch((err) => {
    
});
// const db=async()=>{
//     try {
//         mongoose.connect('mongodb://localhost:27017/mern-app')
//    console.log('DB connected!')

//     } catch (error) {
//         console.log(error)

//     }
// }
// db()
const todoSchema=new  mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:String

})
const todoModel=mongoose.model('Todo',todoSchema);
app.post('/todo',async(req,res)=>{
        const{title,description}=req.body;
    //     const newtodo={
    //         id:todo.length+1,title,description
    //     };
    //     todo.push(newtodo);
    // console.log(todo);
    try{
        const newTodo=new todoModel({title,description});
        await newTodo.save();
        res.status(201).json(newTodo);
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.message});
    }
  
})
app.get('/todo',async(req,res)=>{
    try{const todos=await todoModel.find(); 
        res.json(todos);}
        catch(error){
            console.log(error)
            res.status(500).json({message:error.message});
        }
       
   
})
app.put("/todo/:id",async(req,res)=>{
    try{
        const{
            title,description}=req.body;
            const id=req.params.id;
            const updatedTodo=await todoModel.findByIdAndUpdate(
                id,{
                    title,description
                },{new:true}
            )
            if(!updatedTodo){
                return res.status(404).json({message:"Todo not found"})
            }
            else{
                res.status(200).json(updatedTodo);
            }
            
        }catch(error){
            console.log(error)
            res.status(500),json({message:error.message});
        }
    
})
app.delete('/todo/:id',async(req,res)=>{
    try{
        const id=req.params.id;
     const deletedTodo= await todoModel.findByIdAndDelete(id);
        if(!deletedTodo){
            res.status(404).json({message:"Todo not found"});
        }else{res.status(200).json(deletedTodo);
            
        }
        
            }
            catch(error){
                console.log(error)
                res.status(500).json({message:error.message});
            }
})
const port=8000;
app.listen(port,()=>{
    console.log("server is listening to port ",port);
})