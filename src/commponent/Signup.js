import React,{useState,useContext} from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const Signup = (props) => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setname] = useState('');
    let context=useContext(noteContext);
    let {settoken}=context;
    let history=useHistory();
    const namechange=(event)=>{
       setname(event.target.value);
    }
    const emailchange=(event)=>{
        setemail(event.target.value);
     }
     const passwordchange=(event)=>{
        setPassword(event.target.value);
     }
    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log('submiting'+email+password);
        const url=`http://localhost:5000/api/auth/createuser`
       const response=await fetch(url,{
            method:'POST',
            headers:{
               'Content-Type':'application/json'
            }
            ,
            body:JSON.stringify({email:email,password:password,name:name})
        })
        const json=await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            settoken(json.authtoken);
            history.push("/");
          props.showAlert("Account Created Successfully","success");

        }else{
          props.showAlert("Invalid Credentials","danger");
        }
    }
    return (
        <div>
            <div className="shadow-lg p-3 mb-5 bg-light rounded text-align-center"> 
            <div className="container text-lg-center">
              <h4>Sign Up</h4>
            </div>

            <form className="container">
            <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={name} onChange={namechange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email"value={email} onChange={emailchange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password"value={password} onChange={passwordchange}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Submit</button>
</form>
</div>
        </div>
    )
}

export default Signup
