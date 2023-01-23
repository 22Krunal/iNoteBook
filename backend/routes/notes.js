const express=require('express')
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Note=require('../models/Note');
const {body,validationResult}=require('express-validator');

// ROUTE 1:get all the notes using :get "api/notes/fetchallnotes".login requried
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try{

        const notes=await Note.find({user:req.user.id});
        res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Sever Error");
    }
})

// ROUTE 2:add a new note using :POST "api/notes/addnote".login requried
router.post('/addnote',fetchuser,[body('title','Enter a valid title').isLength({min:3}),
body('description','Description must be atleast 5 characters').isLength({min:5})] ,async (req,res)=>{
    const {title,description,tag}=req.body;
    try{

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        
        const note=new Note({
            title,description,tag,user:req.user.id
        });
        const savedNote=await note.save();
        res.json(savedNote);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Sever Error");
    }
    })
    // ROUTE 3:Update an exiting notes using :PUT "api/notes/updatenote/:id".login requried
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
        const {title,description,tag}=req.body;
        try{
            
            const newNote={};
            
            if(title)
            {
                newNote.title=title;
            }if(description)
            {
                newNote.description=description;
            }if(tag)
            {
                newNote.tag=tag;
            }
            let note= await Note.findById(req.params.id);
            if(!note){
                return  res.status(404).send('Not Found');
            }
            if(note.user.toString()!==req.user.id){
                return res.status(401).send("Not Allowed");
            }
            note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
            res.json(note);
        }catch(error){
            console.error(error.message);
            res.status(500).send("Internal Sever Error");
        }
})
    // ROUTE 4:Delete an exiting note  using :DELETE "api/notes/updatenote/:id".login requried
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag}=req.body;
    try{
        
        let note=await Note.findById(req.params.id);
        if(!note){
            return  res.status(404).send('Not Found');
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note=await Note.findByIdAndDelete(req.params.id);
        res.json({"message":"successfully deleted",note:note});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Sever Error");
    }
    })
    module.exports=router;