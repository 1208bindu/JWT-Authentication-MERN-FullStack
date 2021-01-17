import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {GlobalContext} from '../../context/GlobalState'
import {useHistory} from 'react-router-dom'

const Register = (props) => {

    const { addUserDetails,error,registrationSuccess} = useContext(GlobalContext)

      const history=useHistory();

      let [firstname,setFirstName]=useState('')
      let [lastname,setLastName]=useState('')
      let [email,setEmail]=useState('')
      let [password,setPwd]=useState('')
      let [password2,setPwd2]=useState('')
      const [err,setErr] =useState(error)
    
    
    useEffect(() => {
        if (registrationSuccess) {
          history.push('/login');
        }
    
        if (error) {
          console.log(error)
            setErr(error)
            
           }
        
        // eslint-disable-next-line
      }, [error,registrationSuccess,history]);
 
  function getPwd(e)
      {
        document.getElementById("demo1").innerHTML="";
        setPwd(e.target.value)
      }
  
  function getFname(e)
      {
        setFirstName(e.target.value)
      }      
      function clearError(e)
      {
        document.getElementById("error").style.display="none"
        setEmail('')
        setPwd2('')
        setPwd('')
        setErr('')
      }
  
  function onsub(e) {
    e.preventDefault()
    if(password.length<6)
     {
      setPwd('');
      setPwd2('');
        document.getElementById("demo1").innerHTML="Password Must be atleast 6 characters " 
     }
     else if (password !== password2) {
      setPwd('');
      setPwd2('');
        document.getElementById("demo1").innerHTML="Password Must Match "
     }
     else
     {const newUser={
        firstname:firstname.toLowerCase(),
        lastname:lastname.toLowerCase(),
        email:email.toLowerCase(),
        password:password
      }
      addUserDetails(newUser)
      
       }
  };

     
  return (
    <div className="container">
        <form id="form" onSubmit={onsub} className="white" >
            <h4 className="grey-text text-darken-3">Register</h4>
            <div >
        {err ? (<div id="error" className="alert-p"><span>{err}</span><button onClick={clearError}>X</button>
    </div> ):null} 
      </div>      
            <div className="input-field">
                <label htmlFor="firstName">FirstName</label>
                <input type="text" name="firstname" value={firstname} onChange={getFname} required />
            </div>
            <div className="input-field">
                <label htmlFor="lastName">LastName</label>
                <input type="text" name="lastname" value={lastname} onChange={(e)=>setLastName(e.target.value)} required/>
            </div>
            <div className="input-field">
                <label htmlFor="email">E-Mail</label>
                <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={getPwd} required/>
            </div>
            <div className="input-field">
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" name="password2" value={password2} onChange={(e)=>setPwd2(e.target.value)} required />
                <p id="demo1" className="alert-p"></p>
            </div>
            <div className="input-field">
                <button className="btn blue darken-2 z-depth-0">Sign Up</button>
                <span className="right">
                <h6 className="black-text">Already Have an account...  <Link to="/login"><b> Login </b></Link></h6>
                </span>
            </div>
    </form>
      </div >
  )

 
}

export default Register





