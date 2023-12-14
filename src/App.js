import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './commponent/Navbar';
import Home from './commponent/Home';
import About from './commponent/About';
import NoteState from './context/notes/NoteState';
import Alert from './commponent/Alert';
import Login from './commponent/Login';
import Signup from './commponent/Signup';
import { useState } from 'react';
function App() {
  const [alert, setalert] = useState(null);
  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 3000);
  }
  return (
    <>
    <NoteState>
    <Router>
    <Navbar showAlert={showAlert}/>
    <Alert showAlert={showAlert} alert={alert}/>
    <div className="container">
    <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert} />
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert}/>
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert}/>
          </Route>
        </Switch>
        </div>
    </Router>
    </NoteState>
    </>
  );
}
export default App;
