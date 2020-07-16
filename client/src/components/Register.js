import React , {useState} from 'react';
import "./Style.css";
import axios from "axios";
import {withCookies} from "react-cookie";
import Header from "./Header";
import Navigation from "./navigation/Navigation";

function Register(props) {

    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const emailSet = (event) => {
        setEmail(event.target.value);
        setUsername(event.target.value.split("@")[0])
    }
    const passwordSet = (event) => {
        setPassword(event.target.value);
    }

    const register = ()=>{
        axios({
            method:"post",
            url:"http://localhost:8000/api/users/",
            data:{
                "username":username,
                "email":email,
                "password":password
            }
        }).then(res=>{ 
            autoLogin();
        });
    }

    const autoLogin = () => {
        axios({
            method: 'post',
            url: `http://localhost:8000/auth/`,
            data: {
                "username": email,
                "password": password
            }
        }).then(res => {
            window.location.href=`/${username}`;
            props.cookies.set('user-token',res.data.token);
            props.cookies.set('email-token',username);
        });
    }

    const backToLogin = ()=>{
        window.location.href="/login";
    }

    return (
        <div>
            <Header />
            <Navigation/>
            <div className="container d-flex justify-content-center mt-5">
                <div className="col-lg-4 col-md-6 col">
                    <h3 className="text-center">Register</h3>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" onChange={emailSet} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="usenameRegister">Username</label>
                        <input type="text" readOnly value={username} className="form-control" id="usenameRegister" placeholder="Enter Username" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" onChange={passwordSet} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                        <button type="submit" className="btn btn-primary" onClick={register}>Register</button>
                        <p className="text-secondary mt-3 register_to_login" onClick={backToLogin}>click here if you have account already!</p>
                </div>
            </div>
        </div>
    )
}

export default withCookies(Register);