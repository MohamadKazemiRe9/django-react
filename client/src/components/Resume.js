import React , {useState , useEffect} from 'react';
import { BrowserRouter , Route } from "react-router-dom";
import App from "../App";
import axios from "axios";


export default function Resume() {
    const [userData,setUserData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/profiles/")
            .then(response => { setUserData(response.data) });
    },[]);

    const usernameList = userData.map(user => {
        return user.user.username;
    });

    const urlEntered = (window.location.pathname).slice(1);
    const usernameFound = usernameList.find(elm => elm===urlEntered);
    const url = "/"+usernameFound

    return (
        <BrowserRouter>
            <Route exact path={url} render={()=><App userUrl={usernameFound}/>} />
        </BrowserRouter>
    )
}
