import React , { useState , useEffect} from "react";
import ReactDOM from "react-dom";
import Resume from "./Resume";
import axios from "axios";
import Profile from "./Profile";

function App() {
    // const myUsers = ["user1",'user2']
    const [users, setUsers] = useState([]);

    useEffect(() => { 
        fetch("/api/profiles/",{
            method : "GET",
        }).then(response=>response.json()).then(res => setUsers(res))
        .catch(err=>console.log(err))
    },[]);
    return (
        <div>
            <Resume users={users}/>
            <Profile />
        </div>
    )
}

ReactDOM.render(<App />,document.getElementById("root"));