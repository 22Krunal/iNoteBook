import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const authtoken=localStorage.getItem('token');
  const host="http://localhost:5000"
const note=[];
const [notes, setnotes] = useState(note);
const [token,settoken]=useState(authtoken);
const getnotes=async ()=>{
  console.log('get notes');
  const url=`${host}/api/notes/fetchallnotes`
  const response=await fetch(url,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'auth-token':token,
    },
  });
  const json=await response.json();
  console.log(json)
  setnotes(json);
}
// Add a Note
const addnote= async ({title,description,tag})=>{
  console.log(title);
  
  // localhost:5000/api/notes/addnote
  const url=`${host}/api/notes/addnote`
  const response=await fetch(url,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'auth-token':token,
      // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNTlkY2VkNTYyYzI2MGEyYjFmMGU5In0sImlhdCI6MTYzMDkwMzc5M30.w-LD5IglJ8kVyCt7T-b7d6UmEMTbt0LkBgv_sjz2KZI',
    },
    body:JSON.stringify({title:title,description:description,tag:tag})
  });
  const json=await response.json();
  console.log(json);
  getnotes();
    // setnotes(notes.concat(not));
}
// Delete a Note
const deletenote=async (id)=>{
  // Api call
  const url=`${host}/api/notes/deletenote/${id}`
  const response=await fetch(url,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
        'auth-token':token,
      // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNTlkY2VkNTYyYzI2MGEyYjFmMGU5In0sImlhdCI6MTYzMDkwMzc5M30.w-LD5IglJ8kVyCt7T-b7d6UmEMTbt0LkBgv_sjz2KZI',
    },
  });
  const json= await response.json();
  // const newnotes=notes.filter((note)=>{return note._id!==id});
 console.log(json);
 getnotes();
//  setnotes(json);
}
// Edit a Note
const editnote=async (note)=>{
  console.log(note.eid);
  // Api call
  const url=`${host}/api/notes/updatenote/${note.eid}`;
  const response=await fetch(url,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
      'auth-token':token,
      // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNTlkY2VkNTYyYzI2MGEyYjFmMGU5In0sImlhdCI6MTYzMDkwMzc5M30.w-LD5IglJ8kVyCt7T-b7d6UmEMTbt0LkBgv_sjz2KZI',
    },
    body:JSON.stringify({title:note.etitle,description:note.edescription,tag:note.etag})
  });
  const json=await response.json();
  console.log(json);
 
  // Logic to update note
       for (let index = 0; index < notes.length; index++) {
         const element = notes[index];
            if(element._id===note.eid){
              element.title=note.etitle;
              element.description=note.edescription;
              element.tag=note.etag;
            }         
       }
       getnotes();
}

    return (
        <NoteContext.Provider value={{notes,token,settoken,setnotes,addnote,deletenote,editnote,getnotes}}>
          {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;