import React from 'react';
import "./Style.css";

export default function Education(props) {
    return (
        <div> 
            <h3 className="education_header">Educations:</h3>
            {props.educations.map(education => {
              return (
                    <div className="education_body" key={education.id}>
                        <span className="education_title">title : {education.title}</span>
                        <div>{education.start}</div>
                        <div>{education.end}</div>
                    </div>
                )
            })}
        </div>
    )
}
