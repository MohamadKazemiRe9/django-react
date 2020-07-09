import React from 'react';
import "./Style.css";

export default function About(props) {
    return (
        <div className="about_container">
            <h3 className="about_header">
                About me!
            </h3>
            {props.description}
        </div>
    )
}
