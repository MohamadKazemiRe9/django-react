import React ,{ useState} from 'react';
import axios from "axios";
import { withCookies } from "react-cookie";

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
            window.location.href="/";
            props.cookies.set('user-token',res.data.token);
        });
    }

    return (
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
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                    <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default withCookies(Login);