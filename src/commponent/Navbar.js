import {React,useEffect,useContext} from 'react'
import {
    Link,useLocation,useHistory
  } from "react-router-dom";
import noteContext from '../context/notes/noteContext';
const Navbar = (props) => {
 const context=useContext(noteContext);
 let {token,settoken}=context;
 let history=useHistory(); 
const handleuser=()=>{
    settoken('');
    localStorage.setItem('token','');
    history.push('/');
    
}
  // uselocation hook for make navbar item active accroding state
  let location=useLocation();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
        
        
      </ul>
     {!token? <form className="d-flex">
      <Link className="btn btn-outline-info mx-2" to="/login" role="button">LogIn</Link>
      <Link className="btn btn-outline-info mx-2" to="/signup" role="button">SignUp</Link>
    </form>:<>
    <Link className="btn btn-outline-info mx-2" to="/logout" role="button" onClick={()=>{handleuser();props.showAlert("Log out","success")}}>LogOut</Link>
      </>}
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar
