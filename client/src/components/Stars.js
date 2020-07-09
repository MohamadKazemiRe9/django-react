import React from 'react'

export default function Stars(props) {
    return (
        <div>
            <i className={props.stars>=1 ? "fas fa-star orange":"fas fa-star"}></i>
            <i className={props.stars>=2 ? "fas fa-star orange":"fas fa-star"}></i>
            <i className={props.stars>=3 ? "fas fa-star orange":"fas fa-star"}></i>
            <i className={props.stars>=4 ? "fas fa-star orange":"fas fa-star"}></i>
            <i className={props.stars>=5 ? "fas fa-star orange":"fas fa-star"}></i>
        </div>
    )
}
