import React , {useState , useEffect } from "react";
import "./Style.css";
import Stars from "./Stars";
import axios from 'axios';
import uuid from 'react-uuid';

function Skill(props) {
    const [input,setInput] = useState("");
    const [stars,setStars] = useState(1);
    const [skills,setSkills] = useState(props.skills);
    const [editState,SetEditstate] = useState(false);
    const [skillIndex,setSkillIndex] = useState("");
    const [listIndex,setListIndex] = useState("");


    useEffect(() => {
        setSkills(props.skills);
    }, [props.skills]);  

    const onHandlerSkill = name => e => {
    }

    const onchangeStarsHandler = (e) => {
        setStars(parseInt(e.target.value));
    }

    let newSkills =[]
    const onAddSkillHandler = () => {
        if( editState ){
            SetEditstate(false);
        }
        if (input !== ""){
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/skills/',
                data: {
                    profile: props.user.id,
                    "title": input,
                    "level": stars
                }
            }).then(res =>{
                newSkills=[...skills,res.data];
                setSkills(newSkills);
                newSkills=[];
            });
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
        .then(response => {
            newSkills=skills.filter(elem => elem !== skill);
            setSkills(newSkills);
            newSkills=[];
        });
    }
    const leaveSkill = () =>{
        setInput("");
        setStars(1);
        SetEditstate(false);
    }

    const editSkill = (skill,index) => {
        setInput(skill.title);
        setStars(skill.level);
        SetEditstate(true);
        setSkillIndex(skill.id)
        setListIndex(index)
        // axios.delete(`http://localhost:8000/api/skills/${skill.id}/`)
    }
    const saveEditSkill = (skill) => {
        axios({
            method: 'put',
            url: `http://localhost:8000/api/skills/${skillIndex}/`,
            data: {
                profile: props.user.id,
                "title": input,
                "level": stars
            }
        }).then(res => getUpdateskills());
        SetEditstate(false);
        setInput("");
        setStars(1);
    }
    let skillsIntegrate=(
        <div>{skills.map((skill,index) => {
            return (<li key={uuid()} className={listIndex===index && editState?"skills_edit":"skills_list"}

                        onClick={onHandlerSkill(skill.title)}>{skill.title}
                    <Stars stars={skill.level} />
                </li>)
        })}
        </div>
    )

    if(props.userAuth === props.user.username){
        skillsIntegrate = (
            <div>{skills.map((skill,index) => {
                return (<li key={uuid()} className={listIndex===index && editState?"skills_edit":"skills_list"}
    
                            onClick={onHandlerSkill(skill.title)}>{skill.title}
                        <Stars stars={skill.level} />
                        {listIndex===index && editState?<i className="fas fa-times" onClick={leaveSkill}></i>
                            : <i className="fas fa-edit" onClick={() => editSkill(skill,index)}></i>}
                        <i className="fas fa-trash mx-2" onClick={removeSkill(skill)}></i>
                    </li>)
            })}
            </div>
        )
    }
    

    return (
        <div>
            {skillsIntegrate}
            {props.userAuth === props.user.username?<>
                <label htmlFor="skill">add skill</label>
                <input type="text" value={input} className="form-control mb-2" id="skill" onChange={onChangeInputHandler}></input>
                <select id="level" className="form-control" onChange={onchangeStarsHandler}>
                    <option value="1">در حد آشنایی</option>
                    <option value="2">تا حدودی</option>
                    <option value="3">به طور متوسط</option>
                    <option value="4">مسلط</option>
                    <option value="5">کاملا مسلط</option>
                </select>
                { editState ? 
                    <span className="btn btn-success mt-2" onClick={saveEditSkill}>
                        save
                    </span>
                    : <span className="btn_education_form" onClick={onAddSkillHandler}>
                        Click to Add
                    </span>}
            </>:""}
            
        </div>
    )
}

export default Skill;