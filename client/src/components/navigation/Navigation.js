import React from 'react';
import "./navigations.css";

export default function Navigation(props) {

    const onHandlerLogout = () => {
        props.onLogout("logout");
    }
    const onLogin = () => {
        window.location.href="/login";
    }

    const onRegister = () => {
        window.location.href="/register";
    }
    const onHandlerAccount = () => {
        window.location.href=`/${props.user}`;
    }


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
                    {props.token?
                    <div>
                        <li className="navigation_item" onClick={onHandlerAccount}>my account</li>
                        <li className="navigation_item" onClick={onHandlerLogout}>Logout</li>
                    </div>
                    :<div>
                        <li className="navigation_item" onClick={onRegister}>REGISTER</li>
                        <li className="navigation_item" onClick={onLogin}>LOGIN</li>
                    </div>}
                </ul>
            </nav>
        </div>
    )
}
