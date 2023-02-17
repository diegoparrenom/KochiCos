import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import stl from '../style/body.module.css'
import logo from '../gif/Logo.png';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'// <-- import styles to be used

const BtnOptions = [
    {   "link":"/trajes","title":"Consultar Trajes" },
    {   "link":"/alquiler","title":"Consultar Alquileres"},
    {   "link":"/Login","title":"Devolver Trajes"}
];

export const NavBar = () => {
    const [option, setOption] = useState();

  return (
    <nav className={`${stl.CustomNavBar} navbar navbar-expand-lg  rounded-3`}>
        <div className="container-fluid">

            <Link to="/">
                <img style={{ zoom: '40%' }} src={logo} alt="loading..." />
            </Link>

            <div id="navbarNav" className={stl.CustomNavOpt} >
                <ul className="navbar-nav">
                    
                    {BtnOptions.map((opt,index) => ( 
                        <NavLink
                            key={index}
                            className={ ({ isActive }) => `${stl.CustomNavBtn} ${ isActive ? stl.CustomNavBtnAct : '' }`}
                            to={opt.link}>
                            {opt.title}
                        </NavLink>
                    ))}
                 </ul>
            </div>
            <Dropdown onSelect={(a)=>setOption(a)}>
                <Dropdown.Toggle id="dropdown-basic" className={stl.CustomNavDropDown}  >
                    <FontAwesomeIcon className={stl.CustomNavBtnMenu} icon={faBars} />
                </Dropdown.Toggle>
                
                <Dropdown.Menu className={stl.CustomNavDropDownMenu}>
                    {BtnOptions.map((Di,index)=>(
                        
                            <Dropdown.Item 
                                eventKey={index}
                                key={index}
                                as={Link}
                                to={Di.link} 
                                className={option==index?`${stl.CustomNavBtn} ${stl.CustomNavBtnAct}`:stl.CustomNavBtn} >
                                {Di.title}
                            </Dropdown.Item>
                        
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            </div>
    </nav>
  )
}
