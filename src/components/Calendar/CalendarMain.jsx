import React, { useContext, useEffect,useState } from 'react'
import { CalendarDay } from './CalendarDay'
import stl from '../../style/calendar.module.css'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import gSource from '../../helpers/gSource';
import Loader from '../../helpers/Loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft, faBan } from '@fortawesome/free-solid-svg-icons'// <-- import styles to be used

const Fecha = new Date();
const MonthDays = new Date(Fecha.getFullYear(),Fecha.getMonth()+1, 0);
const daySlot = new Array(40).fill(1);
const DiasNombre = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
const MesNombre = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
                    "Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

export const CalendarMain = () => {

    const { rentInfo,setRentInfo } = useContext( UserContext );
    const [table, setTable] = useState();
    const [monthAndYear,setMonthAndYear] = useState(`${MesNombre[Fecha.getMonth()]} - ${Fecha.getFullYear()}`);
    const [primerDia,setPrimerDia] = useState((Fecha.getDate()%7) - (Fecha.getDay()));
    const navigate = useNavigate();

    const getDayNumber = (DayNumber) => {
        if(DayNumber> 0 && DayNumber<=MonthDays.getDate())
            return DayNumber;
        else
            return null;
    }

    const getMessage = () => {

        if(rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler ==undefined)
            return "Seleccionar Fecha de Alquiler";
        else
            return "Seleccionar Fecha de Devolucion";
    }

    const onCancel = () => {
        setRentInfo(null);
        navigate('/trajes');
    }
    const onPrevMonth = () => {
        Fecha.setMonth(Fecha.getMonth()-1);
        UpdateMonthAndYear();
    }
    const onNextMonth = () => {
        Fecha.setMonth(Fecha.getMonth()+1);
        MonthDays.setMonth(Fecha.getMonth()+1);
        UpdateMonthAndYear();
    }
    const UpdateMonthAndYear = () => {
        MonthDays.setDate(0);
        setMonthAndYear(`${MesNombre[Fecha.getMonth()]} - ${Fecha.getFullYear()}`);
        if((Fecha.getDate()%7) - (Fecha.getDay()) > 1)
            setPrimerDia( (Fecha.getDate()%7) - (Fecha.getDay()) -7 );
        else
            setPrimerDia( (Fecha.getDate()%7) - (Fecha.getDay()) );
    }

    useEffect(() => {
        if(!rentInfo){
            setRentInfo(null);
            navigate('/trajes');
        }
        else{
            let costumeId = rentInfo.Detalle[rentInfo.Detalle.length-1].id_traje;
            gSource().getTable("AlquilerDetalle",{setTable},"id_traje",costumeId);
        }
    }, [])
    
    
    return (
        <>
            
            {!table?
            <Loader  message={'Cargando info de Calendario'} />:
            <>
                <h2>{getMessage()}</h2>
                <div className={stl.monthTitleContainer}>
                    <button className={stl.monthBtn} onClick={()=>onPrevMonth()} >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={stl.monthTitle}>{monthAndYear}</div>
                    <button className={stl.monthBtn} onClick={()=>onNextMonth()} >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
                <div className={stl.monthContainer} >
                    {DiasNombre.map((d, index) => (
                        <div key={index} className={stl.dayNameContainer}>{d}</div>
                    ))}
                    {daySlot.map((d, index) => (
                        <CalendarDay key={index}
                            dayNumber={getDayNumber(index + primerDia)}
                            monthNumber={Fecha.getMonth() + 1}
                            yearNumber={Fecha.getFullYear()}
                            rentDaysInfo={table} />
                    ))}
                    
                </div>
                <div className={stl.monthTitleContainer}>
                    <button onClick={onCancel} className={stl.monthBtn}><FontAwesomeIcon icon={faBan} />  Cancelar</button>
                </div>
            </>
            }
            
        </>
        
    )
}
