
import React from 'react'
import "./login.css"


const Login = () => {

    // const loginwithgoogle = ()=>{
    //     window.open("https://todo-backend-steel-six.vercel.app/auth/google/callback","_self")
    // }

//     const loginwithgoogle = () => {
//   window.open("https://todo-backend-steel-six.vercel.app/auth/google?state=todo", "_self");
        
// }

    const loginWithGoogle = () => {
  window.open("https://todo-backend-steel-six.vercel.app/auth/google?site=quicksign", "_self");
};

  return (
    <>
        <div className="login-page">
       
           <span style={{fontSize:"100px", padding:"20px", fontWeight:"bolder", color:"white"}}>QuickSign</span>
           
       
            <div className="form">
              
              <div className='google-login'>
            <button className='google-btn' onClick={loginwithgoogle}>
                  <img src="/public/img/search.png" alt="" className='google-icon' /> 
                  <span> Sign In With Google</span>
                </button>
                </div>
             
              
            </div>
        </div>
    </>
  )
}

export default Login
