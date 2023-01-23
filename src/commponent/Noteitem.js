import {React,useContext }from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const context=useContext(noteContext);
    const {deletenote}=context
  const {note,updateNote}=props;
  
    return (
        <div className="col-md-3">
            <div className="card my-3" >
  <div className="card-body">
  <span className="badge position-absolute top-0 end-0" style={{backgroundColor:'#20c997'}}>{note.tag}</span>
      <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fas fa-trash-alt mx-2" onClick={()=>{deletenote(note._id); props.showAlert("Deleted note Successfully","success")}} ></i>
    <i className="far fa-edit mx-2 " onClick={()=>{updateNote(note)}}></i>
    </div>
    <p className="card-text">{note.description} </p>
  </div>
</div>
        </div>
    )
}

export default Noteitem
