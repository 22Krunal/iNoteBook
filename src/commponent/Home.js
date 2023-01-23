import React from 'react'
import Notes from './Notes';
const Home = (props) => {
    let token=localStorage.getItem('token');
    let bool=false;
    if(token){
       bool=true;
    }
    return (
      <div>
          {
              bool&&<Notes showAlert={props.showAlert}/>
          }
      
          </div>
    )
}

export default Home
