import React, {useState} from 'react';

const NavbarContext = React.createContext({
    navbarState : navState,
});

export default props => {
    const [navState,setNavState] = useState(false);
    return (
        <NavbarContext.Provider value={{navbarState : navState}}>
            {props.children}
        </NavbarContext.Provider>
    )
}
