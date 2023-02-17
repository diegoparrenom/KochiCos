import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import stl from '../../style/calendar.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons'

export const HourPicker = () => {

    const Am = useRef(null);
    const Pm = useRef(null);
    const [Hour,setHour] = useState(8);
    const [AmPmInfo, setAmPmInfo] = useState('AM');
    const { rentInfo } = useContext( UserContext );
    const navigate = useNavigate();

    const selectAmPm = () => {
        setAmPmInfo(event.target.innerHTML);
        Am.current.className= stl.HourPickerBtn+' '+stl.AmPmPicker;
        Pm.current.className= stl.HourPickerBtn+' '+stl.AmPmPicker;
        event.target.className = stl.HourPickerBtn+' '+stl.AmPmSelected
    }
    const HourPlus = (Hour) => { 
        if(Hour< 12) setHour(Hour+1);
    }
    const HourMinus = (Hour) => { 
        if(Hour> 0)setHour(Hour-1);
    }
    const sendData = () => {

        if(rentInfo.Detalle[rentInfo.Detalle.length-1].FechaDevolucion === undefined){
            if(AmPmInfo === 'PM')
                rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler +=" "+(Hour+12);
            else
                rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler +=" "+Hour;
            navigate('/calendar');
        }
        else{
            if(AmPmInfo === 'PM')
                rentInfo.Detalle[rentInfo.Detalle.length-1].FechaDevolucion +=" "+(Hour+12);
            else
                rentInfo.Detalle[rentInfo.Detalle.length-1].FechaDevolucion +=" "+Hour;
            navigate('/alquiler');
        }

    }
    return (
        <>
            <div className={stl.HourPickerContainer}>
                <div className={stl.HourPickerSubContainer}>
                    <div className={stl.HourPickerBtn + ' ' + stl.Plus} onClick={() => HourPlus(Hour)} >
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <div className={stl.HourPickerBtn + ' ' + stl.NumberDisplay} >{Hour}</div>
                    <div className={stl.HourPickerBtn + ' ' + stl.Minus} onClick={() => HourMinus(Hour)}>
                        <FontAwesomeIcon icon={faMinus} />
                    </div>
                </div>
                <div className={stl.HourPickerSubContainer}>
                    <div className={stl.HourPickerBtn+' '+stl.AmPmSelected} ref={Am} onClick={() => selectAmPm()} >AM</div>
                    <div className={stl.HourPickerBtn+' '+stl.AmPmPicker} ref={Pm} onClick={() => selectAmPm()} >PM</div>
                </div>
                <div className={stl.HourPickerSubContainer}>
                    <div className={stl.HourPickerBtn + ' ' + stl.OkBtn} onClick={()=>{sendData()}}>OK</div>
                </div>
            </div>
        </>
    )
}
