import React from 'react';
import stl from '../style/message.module.css'
import delIcon from '../gif/delete.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Message = () => {
    
    const confirm = (onConfirm,msg) => {
        toast((
            <div>
                <img className={stl.MsgIcon} src={delIcon} alt="loading..." />
                <div className={stl.MsgTitle}>{msg}</div>
                <br />
                <button className={stl.MsgButton} onClick={() => onConfirm()}>OK</button>
                <button className={stl.MsgButton}>Cancel</button>
            </div>
        ), {
            className: stl.MsgContainer,
            passive: false,
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: false,
            closeButton: false
        })
    };
    return {confirm};
}
export default Message;