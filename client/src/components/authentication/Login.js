 import { Link } from 'react-router-dom';
 import React,{useState,useContext,useEffect} from 'react'
 import {GlobalContext} from '../../context/GlobalState'
 import {useHistory} from 'react-router-dom'
 const Login=() => {
    const { userLogin,error,isauthenticated} = useContext(GlobalContext)
    const [email,setEmail]=useState('')
    const [pwd,setPwd]=useState('')
    const [err,setErr] =useState(error)
    
    const history=useHistory();
    console.log(isauthenticated)
    
    useEffect(() => {
        if (isauthenticated) {
          history.push('/');
        }
    
        if (error) {
          console.log(error)
            setErr(error)
            
           }
        
        // eslint-disable-next-line
      }, [error,isauthenticated,history]);

      
      function clearError(e)
  {
    document.getElementById("error").style.display="none"
    setEmail('')
    setPwd('')
    setErr('')
  }
  const newLogin={
    email:email.toLowerCase(),
    password:pwd
    }
 function onsub(e){
        e.preventDefault();
        
           userLogin(newLogin)
           
         //history.push('/')
       }
    return (
        <div className="container">
            <form onSubmit={onsub} className="white" >
                <h4 className="grey-text text-darken-3">LogIn</h4>
                <div >
    {err ? (<div id="error" className="alert-p"><span >{err}</span><button onClick={clearError}>X</button>
</div> ):null} 
  </div>  
                <div className="input-field">
                    <label htmlFor="emailCurrent">E-Mail</label>
                    <input type="email" id="mail-alert" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <p id="demo" className="alert-p"></p>
                </div>
                <div className="input-field">
                    <label htmlFor="pwdCurrent">Password</label>
                    <input type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
                    <p id="demo1" className="alert-p"></p>
                </div>
                <div className="input-field">
                    <button className="btn blue darken-2 z-depth-0">Login</button>
                    <span className="right">
                <h6 className="black-text">Don't Have an account...  <Link to="/register"><b> Register </b></Link></h6>
                </span>
                </div>

            </form>
           
        </div>
    )
}
export default Login
