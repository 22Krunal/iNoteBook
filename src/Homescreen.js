import { useContext } from "react";
import noteContext from "./context/notes/noteContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './commponent/Navbar';
import Home from './commponent/Home';
import About from './commponent/About';
import Alert from './commponent/Alert';
import Login from './commponent/Login';
import Signup from './commponent/Signup';
import Logscreen from "./Logscreen";

function Homescreen() {
    const context= useContext(noteContext);
    let {token}=context;
    return (
    <>
   {token?<Router>
 <Navbar/>
    <Alert message="This is very good"/>
    <div className="container">
    <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
        </Switch>
        </div>
        </Router>:
        <div className="container my-100">
        <Logscreen/>
        </div>}
    </>
  );
}

export default Homescreen;
