import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
const Login = (props) => {
    const context= useContext(noteContext);
    let {settoken}=context;
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const changeemail=(event)=>{
        setemail(event.target.value);
    }
    const changepassword=(event)=>{
        setPassword(event.target.value);
    }
    let history=useHistory();
 const handlesubmit=async(e)=>{
     e.preventDefault();
     console.log('submiting'+email+password);
     const url=`http://localhost:5000/api/auth/login`
    const response=await fetch(url,{
         method:'POST',
         headers:{
            'Content-Type':'application/json'
         }
         ,
         body:JSON.stringify({email:email,password:password})
     })
     const json=await response.json();
     console.log(json);
     if(json.success){
         localStorage.setItem('token',json.authtoken);
        //  token=json.authtoken;
        //  console.log(token);
         settoken(json.authtoken);
        //  getnotes();
        props.showAlert("Account Created Successfully","success");
         history.push("/");
     }
     else{
      props.showAlert("Invalid details","danger");
     }
 }

    return (
        
        <div>
            <div class="shadow-lg p-3 mb-5 bg-light rounded">
            <div className="container text-lg-center">
              <h4>Login</h4>
            </div>
           <form className="container my-3" onSubmit={handlesubmit}>
  <div className="mb-4">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={email} onChange={changeemail} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-4">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={password} id="password" minLength={6} onChange={changepassword} required/>
  </div>
  <button type="submit" className="btn btn-primary my-3"  onSubmit={handlesubmit}>Submit</button>
</form>
        </div>
        </div>
    )
}

export default Login
