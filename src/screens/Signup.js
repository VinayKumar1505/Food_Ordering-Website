import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

export default function Signup() {
  let navigate = useNavigate()
    const[credentials, setCredentials]= useState({name:"", email:"", password:"", geolocation:""})
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response= await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation})
        });

        const json= await response.json();
        console.log(json);

        if (json.success) {
          //save the auth toke to local storage and redirect
          localStorage.setItem('token', json.authToken)
          navigate("/login")
        }
        else {
          alert("Enter Valid Credentials")
        }
    }

    function onChange(event){
      setCredentials({...credentials, [event.target.name]: event.target.value})
    }

  return (
  <>
  <div className="container">
  <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange}/>
  </div>
   
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange}/>
  </div>
   
  <button type="submit" className="btn" style={{ background: "rgba(51, 255, 167, 0.5)"}}>Create</button>
  <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
</form>

</div>
  </>
  )
  }