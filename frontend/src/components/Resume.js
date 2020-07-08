import React from 'react'

export default function Resume(props) {

    const profileShower = user => e => {
        console.log(user)
    }

    return (
        <React.Fragment>
        {props.users.map(user=>{
            return (
                    <li key={user.id} onClick={profileShower(user)}>
                        {user.user.username}
                    </li>
                )
        })}
        </React.Fragment>
    )
}
