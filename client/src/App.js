import React , {useState , useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Skill from "./components/Skill";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/about/About";
import Education from './components/Education';
import { withCookies } from "react-cookie";
import Navigation from "./components/navigation/Navigation";

function App(props) {
  const [user , setUser] = useState({});
  const [skills , setSkills] = useState([]);
  const [educations , setEducations] = useState([]);
  const [description , setDescription] = useState("");
  const [token,setToken] = useState("");
  const [tokenEmail,setTokenEmail] = useState("");
  const [userData,setUserData] = useState([]);

  useEffect(() => {
    setToken(props.cookies.get("user-token"));
    setTokenEmail(props.cookies.get("email-token"));
  },[props.token]); 
  

  
  useEffect(()=>{
    axios.get("http://localhost:8000/api/profiles/")
      .then(response => { setUserData(response.data) });
  },[]);

  let userID = 1;
  useEffect(()=>{
    userData.map(user => {
      if(user.user.username===props.userUrl){
        userID = user.id;
      }
    });


    axios.get(`http://localhost:8000/api/profiles/${userID}/`)
      .then(response => { 
        setUser(response.data.user)
        setSkills(response.data.skills)
        setEducations(response.data.education)
        setDescription(response.data.description)
        }).catch(err=>console.log(err));
  },[userData])

  const handleLogout = (logoutState) => {
    props.cookies.remove('user-token');
    props.cookies.remove('email-token');
    setToken("");
    setTokenEmail("");
  }

  return (
    <div className="contain">
      <Header/>
      <Navigation token={token} onLogout={handleLogout} user={tokenEmail}/>
      <About description={description} user={user} userAuth={tokenEmail}/>
        <div className="App d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 text-center">
            <Skill skills={skills} user={user} userAuth={tokenEmail} />
            <Education educations={educations} user={user} userAuth={tokenEmail}/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default withCookies(App);
