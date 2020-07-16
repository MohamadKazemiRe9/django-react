import React ,{ useState} from 'react';
import axios from "axios";
import { withCookies } from "react-cookie";
import Header from "./Header";
import Navigation from "./navigation/Navigation";

function Login(props) {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const emailSet = (event) => {
        setEmail(event.target.value);
    }

    const passwordSet = (event) => {
        setPassword(event.target.value);
    }

    const login = ()=>{
        axios({
            method: 'post',
            url: `http://localhost:8000/auth/`,
            data: {
                "username": email,
                "password": password
            }
        }).then(res => {
            const url = email.split("@")[0];
            window.location.href=url;
            props.cookies.set('user-token',res.data.token);
            props.cookies.set('email-token',url);
        });
    }

    return (
        <div>
            <Header />
            <Navigation/>
            <div className="container d-flex justify-content-center mt-5">
                <div className="col-lg-4 col-md-6 col">
                    <h3 className="text-center">Login</h3>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" onChange={emailSet} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" onChange={passwordSet} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                        <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default withCookies(Login);