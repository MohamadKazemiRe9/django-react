import React, {useState} from 'react';

const [userData,setUserData] = useState([]);

useEffect(()=>{
    axios.get("http://localhost:8000/api/profiles/")
      .then(response => { setUserData(response.data) });
  },[]);

  const usernameList = userData.map(user => {
    return user.user.username;
  });


export default props => {
    const [navState,setNavState] = useState(false);
    return (
        <NavbarContext.Provider value={{navbarState : navState}}>
            {props.children}
        </NavbarContext.Provider>
    )
}
