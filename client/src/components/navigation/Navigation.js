import React from 'react';
import "./navigations.css";

export default function Navigation() {
    return (
        <div className="navigation"> 
            <input type="checkbox" className="navigation_checkbox" id="navigation_toggle"/>
            <label htmlFor="navigation_toggle" className="navigation_button">
                <span className="navigation_icon">&nbsp;</span>
            </label>
            <div className="navigation_background"></div>

            <nav className="navigation_nav">
                <ul className="navigation_list">
                    <li className="navigation_item">HOME</li>
                    <li className="navigation_item">ABOUT</li>
                    <li className="navigation_item">REGISTER</li>
                    <li className="navigation_item">LOGIN</li>
                </ul>
            </nav>
        </div>
    )
}
