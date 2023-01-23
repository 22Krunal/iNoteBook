import {useState,useContext} from 'react';
import noteContext from '../context/notes/noteContext';


const Addnote = (props) => {
    const context=useContext(noteContext);
  const {addnote}=context;

//   my way of doing
//   const [Title, setTitle] = useState('');
//   const [Description, setDescription] = useState('');

  //   const Addnote=(event)=>{
//     event.preventDefault();
//        addnote({...notes,title:Title,description:Description,tag:"general",_id:"2313131"});
//        setTitle('');
//        setDescription('');
//   }
//   const ctitle=(event)=>{
//     setTitle(event.target.value);
//   }
//   const cdescription=(event)=>{
//     setDescription(event.target.value);
//   }
const [note, setnote] = useState({title:"",description:"",tag:""});
const addNote=(e)=>{
 e.preventDefault();
 addnote(note);
 props.showAlert("Note added Successfully","success")
 setnote({title:"",description:"",tag:""});
}
const onChange=(event)=>{
    setnote({...note,[event.target.name]:event.target.value});
    // const set=(event)=>{
    //   const call=`set${event.target.name}("${event.target.value}")`
    //    return call;
    // }
    // set(event);
}
    return (
            <div className="container">
            <div className="container my-3">
          <h2>Add a Note</h2>
          </div>
          <form className=" container my-3" onSubmit={addNote}>
    <div className=" mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title}  onChange={onChange} />
    </div>
    <div className="mb-3">
    <label htmlFor="description" className="form-label"  >Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description}onChange={onChange} />
    </div>
    <div className="mb-3">
    <label htmlFor="tag" className="form-label"  >Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
    </div>
    <button type="submit" disabled={(note.title.length<5||note.description.length<5 )&&true} className="btn btn-primary" onSubmit={addNote}>Add Note</button>
    </form>
    <div className="container my-3">
          </div>
        </div>
    )
}

export default Addnote
