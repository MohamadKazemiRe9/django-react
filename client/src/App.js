import React , {useState , useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Skill from "./components/Skill";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Education from './components/Education';
import { withCookies } from "react-cookie";
import Navigation from "./components/navigation/Navigation";

function App(props) {
  const [user , setUser] = useState({});
  const [skills , setSkills] = useState([]);
  const [educations , setEducations] = useState([]);
  const [description , setDescription] = useState("");
  const [token,setToken] = useState("");
  const [authentication,setAuthentication] = useState(false);

  useEffect(() => {
    setToken(props.cookies.get("user-token"));
    setAuthentication(true)
  },[props.token]); 
  

  useEffect(()=>{
    axios.get("http://localhost:8000/api/profiles/1/")
      .then(response => { 
        setUser(response.data.user)
        setSkills(response.data.skills)
        setEducations(response.data.education)
        setDescription(response.data.description)
        }).catch(err=>console.log(err))
  },[]);

  return (
    <div className="contain">
      <Header/>
      <Navigation />
      <About description={description}/>
        <div className="App d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 text-center">
            <p>{user.username}</p>
            <Skill skills={skills} user={user} token={token} />
            <Education educations={educations}/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default withCookies(App);
