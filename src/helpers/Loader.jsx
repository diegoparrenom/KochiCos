import React from "react";
import loadergif from '../gif/loader.gif';
import stl from '../style/loader.module.css'

const Loader = ({message}) => {
    return (
        <>
            <div className={stl.messagetxt}>{message}</div>
            <img style={{ zoom: '50%' }} src={loadergif} alt="loading..." />
        </>
    )
}

export default Loader;