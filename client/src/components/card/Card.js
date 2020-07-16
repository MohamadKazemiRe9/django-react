import React from 'react';
import './styles.css';
import axios from 'axios';

export default function Card(props) {

    const deleteEducation = () => {
        axios.delete(`http://localhost:8000/api/education/${props.id}/`)
        .then(response => {props.onDelete(props.id)})
    }
    
    let style_fornt = ""
    let style_back = ""
    if (props.index%3===0){
        style_fornt = "card_side card_side_front card_background_red";
        style_back = "card_side card_side_back card_background_red_revere"
    }else if(props.index%3===1){
        style_fornt = "card_side card_side_front card_background_green";
        style_back = "card_side card_side_back card_background_green_revere"
    }else{
        style_fornt = "card_side card_side_front card_background_blue";
        style_back = "card_side card_side_back card_background_blue_revere"
    }

    return (
        <div className="card">
            <div className={style_fornt}>
                <h5>{props.title}</h5>
                <h6>{props.location}</h6>
            </div>
            <div className={style_back}>
            <p>{props.start}</p>
            {props.end?<p>{props.end}</p>:"until now"}
            {props.auth?<i className="fas fa-trash card_trash_icon" onClick={deleteEducation}></i>:""}
            </div>
        </div>
    )
}
