import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import stl from '../../style/calendar.module.css'
import CFormat from '../../helpers/CFormat';

export const CalendarDay = ({ dayNumber,monthNumber,yearNumber,rentDaysInfo }) => {

    const { rentInfo,setRentInfo } = useContext( UserContext );
    const navigate = useNavigate();

    const SelectDay = (day) => {

        let dayselected = false;

        rentDaysInfo.map((rdInfo) => {
            if (monthNumber == CFormat().date(rdInfo.FechaAlquiler).month &&
                yearNumber == CFormat().date(rdInfo.FechaAlquiler).year &&
                day >=  CFormat().date(rdInfo.FechaAlquiler).day && 
                day <=  CFormat().date(rdInfo.FechaDevolucion).day) {
                    dayselected = true;
            }
        })

        if(dayselected)
            return;

        if(rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler === undefined)
            rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler = `${day}-${monthNumber}-${yearNumber}`;
        else
            rentInfo.Detalle[rentInfo.Detalle.length-1].FechaDevolucion = `${day}-${monthNumber}-${yearNumber}`;
        setRentInfo(rentInfo);
        navigate('/hourpicker');
    }

    const setRentDay = (day) => {

        let percentage = 0;
        let orientation = "to bottom";

        rentDaysInfo.map((rdInfo) =>{ 
            if( monthNumber == CFormat().date(rdInfo.FechaAlquiler).month && 
                yearNumber == CFormat().date(rdInfo.FechaAlquiler).year){
                    
                if(day >=  CFormat().date(rdInfo.FechaAlquiler).day && 
                    day <=  CFormat().date(rdInfo.FechaDevolucion).day){
                    percentage = 100;
                }

                if(day ==  CFormat().date(rdInfo.FechaAlquiler).day){
                    percentage = 100 - Math.round(CFormat().date(rdInfo.FechaAlquiler).hour * 100/24);
                    orientation = "to top";
                }

                if(day ==  CFormat().date(rdInfo.FechaDevolucion).day){
                    percentage = Math.round(CFormat().date(rdInfo.FechaDevolucion).hour * 100/24);
                    orientation = "to bottom";
                }
            }
        } )

        if(rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler!== undefined){
        
            if( CFormat().date(rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler).year == yearNumber &&
                CFormat().date(rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler).month == monthNumber &&
                CFormat().date(rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler).day == day){
                    return `to bottom, #b4d426 100%, transparent 100%`
                }
        }

        return `${orientation}, #970760 ${percentage}%, transparent ${percentage}%`
    }

    return (
        <>
            <button
                key={dayNumber}
                style={{backgroundImage:`linear-gradient(${setRentDay(dayNumber)})`}}
                className={stl.dayContainer}
                disabled={dayNumber == null ? true : false}
                onClick={()=>SelectDay(dayNumber)}>
                {dayNumber}
            </button>
        </>
    )
}
