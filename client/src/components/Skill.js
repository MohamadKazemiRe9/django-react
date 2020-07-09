import React , {useState , useEffect } from "react";
import "./Style.css";
import Stars from "./Stars";
import axios from 'axios';
import uuid from 'react-uuid';

function Skill(props) {
    const [input,setInput] = useState("");
    const [stars,setStars] = useState(1);
    const [skills,setSkills] = useState(props.skills);

    useEffect(() => {
        setSkills(props.skills);
    }, [props.skills]);  

    const onHandlerSkill = name => e => {
    }

    const onchangeStarsHandler = (e) => {
        setStars(parseInt(e.target.value));
    }

    const onAddSkillHandler = () => {
        if (input !== ""){
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/skills/',
                data: {
                    profile: props.user.id,
                    "title": input,
                    "level": stars
                }
            }).then(res => getUpdateskills());
            setInput("");
        }
    }

    const getUpdateskills = () => {
        axios.get(`http://localhost:8000/api/profiles/${props.user.id}/`)
        .then(response => { setSkills(response.data.skills)
        }).catch(err=>console.log(err));
    }

    const onChangeInputHandler = (event)=>{
        setInput(event.target.value)
    }

    const removeSkill = skill => event =>{
        axios.delete(`http://localhost:8000/api/skills/${skill.id}/`)
        .then(response => {getUpdateskills()})
    }

    let skillsIntegrate = (
        <div>{skills.map(skill => {
            return (<li key={uuid()} className="skills_list"
                onClick={onHandlerSkill(skill.title)}>{skill.title}
                    <Stars stars={skill.level} />
                    <i className="fas fa-edit"></i>
                    <i className="fas fa-trash mx-2" onClick={removeSkill(skill)}></i>
                </li>)
        })}
        </div>
    )
    
    return (
        <div>
            {skillsIntegrate}
            <label htmlFor="skill">add skill</label>
            <input type="text" value={input} className="form-control mb-2" id="skill" onChange={onChangeInputHandler}></input>
            <select id="level" className="form-control" onChange={onchangeStarsHandler}>
                <option value="1">در حد آشنایی</option>
                <option value="2">تا حدودی</option>
                <option value="3">به طور متوسط</option>
                <option value="4">مسلط</option>
                <option value="5">کاملا مسلط</option>
            </select>
            <span className="btn btn-primary mt-2" onClick={onAddSkillHandler}>click here!</span>
        </div>
    )
}

export default Skill;