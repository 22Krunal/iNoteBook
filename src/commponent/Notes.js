import React,{useContext,useEffect,useRef,useState} from 'react'
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';

const Notes = (props) => {
    const context=useContext(noteContext);
    const {notes,getnotes,editnote}=context;
const [note, setnote] = useState({etitle:"",edescription:"",etag:""});
const [noteid, setnoteid] = useState("");
const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [tag, settag] = useState('');
    useEffect(() => {
        getnotes();
        //eslint-disable-next-line
    }, [])
    const fill = useRef(null);
const updateNote=(note)=>{
      console.log('update note'+ note.title);
      setnoteid(note._id);
      setdescription(note.description);
      settitle(note.title);
      settag(note.tag)
    fill.current.click();

  }
  const handlechange=(event)=>{
    if(event.target.name==="etitle")settitle(event.target.value);
    else if(event.target.name==="etag")settag(event.target.value);
    else setdescription(event.target.value);
    setnote({...note,[event.target.name]:event.target.value,eid:noteid});

    // console.log(note);

}
const edit=(e)=>{
   e.preventDefault();
   console.log(note);
     editnote(note);
 props.showAlert("Note Updated Successfully","success");

}
    return (
        <>
        <Addnote showAlert={props.showAlert}/>  

<button ref={fill} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className=" container my-3" >
    <div className=" mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" value={title} onChange={handlechange} />
    </div>
    <div className="mb-3">
    <label htmlFor="edescription" className="form-label"  >Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value ={description}onChange={handlechange} />
    </div>
    <div className="mb-3">
    <label htmlFor="etag" className="form-label"  >Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={tag} onChange={handlechange} />
    </div>
    {/* <button type="submit" className="btn btn-primary" onClick={Addnote}>Add Note</button> */}
    </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" disabled={(title.length<5||description.length<5 )&&true} onClick={edit} data-bs-dismiss="modal">Save</button>
      </div>
    </div>
  </div>
</div>
        <div className="container my-3">
          <h2>Your Notes</h2> 
          </div>
          {notes.length===0&&<h3>There is no notes </h3>}
        <div className="container row my-3 ">
           {notes.map((element)=>{
               return <Noteitem key={element._id}note={element} updateNote={updateNote} showAlert={props.showAlert}/>
            })} 
            {/* <Updatenote/> */}
        </div>

        </>
    )
}

export default Notes
