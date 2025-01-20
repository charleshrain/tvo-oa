import React from 'react';
import {NavBarLogo} from "@/components/NavBarLogo";
import {NavLinks} from "@/components/NavLinks";


function NavBar() {
    return (
        <div className="navbar bg-[#D52B1E] items-baseline border-b-2 border-b-[#731620]" >
            <NavBarLogo/>
            <NavLinks/>
        </div>
    );
}

export default NavBar;