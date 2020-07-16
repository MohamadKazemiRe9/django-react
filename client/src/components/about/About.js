import React from 'react';
import "./Style.css";
import axios from "axios";
import user_image from "../../assets/image/user_deafult.png";

export default function About(props) {
    const [description,setDescription] = React.useState(props.description.text);
    const [textareaValue,setTextareaVlue] = React.useState("");
    const [editState,setEditState] = React.useState(false);
    

    React.useEffect(()=>{
        setDescription(props.description.text);
        setTextareaVlue(props.description.text);
    },[props.description])


    const remove = () => {
        setTextareaVlue("");
    };
    const undo = ()=>{
        setTextareaVlue(props.description.text);
    }
    const done = () => {
        axios({
            method: 'put',
            url: `http://localhost:8000/api/description/${props.description.id}/`,
                data: {
                    profile: props.user.id,
                    "text":textareaValue,
                }
        }).then(getUpdateDescription);
    }
    
    const getUpdateDescription = ()=>{
        axios({
            method: 'get',
            url: `http://localhost:8000/api/description/${props.description.id}/`,
        }).then(res => setDescription(res.data.text));
    } 


    const getUpdateAbout = () => {
        axios.get(`http://localhost:8000/api/profiles/${props.user.id}/`)
        .then(response => { setTextareaVlue(response.data.description.text)
        }).catch(err=>console.log(err));
    }

    const onChangeTextarea = (event) => {
        setTextareaVlue(event.target.value);
    }

    const onEditMode = () =>{
        setEditState(!editState);
    }

    return (
        <div className="about_container">
            <h3 className="about_header">
                About me! {props.userAuth === props.user.username?
                    <i className="fas fa-edit" onClick={onEditMode}></i>:""}
            </h3>
            <div className="story">
                <figure className="story_shape">
                    <img src={user_image} className="story_image" />
                    <figcaption className="story_caption">
                        Mohamad Kazemi
                    </figcaption>
                </figure>

                <div className="story_text">
                    <p>{description}</p>
                </div>
            </div>
            {props.userAuth === props.user.username?
            <div className={editState?"description_open description_container":"description_close"}>
                <div className="about_edit">
                    <textarea value={textareaValue} onChange={onChangeTextarea}/>
                </div>
            
                <div className="d-flex justify-content-center about_buttons">
                    <i className="fas fa-check m-2 text-success" onClick={done}></i>
                    <i className="fas fa-times m-2 text-danger" onClick={remove}></i>
                    <i className="fa fa-undo text-primary m-2" onClick={undo}></i>
                </div>
            </div>:""}
        </div>
    )
}
