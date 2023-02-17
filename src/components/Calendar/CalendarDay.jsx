import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import stl from '../../style/calendar.module.css'

export const CalendarDay = ({ dayNumber,monthNumber,yearNumber,rentDaysInfo }) => {

    const { rentInfo,setRentInfo } = useContext( UserContext );
    const navigate = useNavigate();

    const SelectDay = (day) => {

        let dayselected = false;

        rentDaysInfo.map((rdInfo) => {
            if (monthNumber == DayFormatter(rdInfo.FechaAlquiler).month &&
                yearNumber == DayFormatter(rdInfo.FechaAlquiler).year &&
                day >=  DayFormatter(rdInfo.FechaAlquiler).day && 
                day <=  DayFormatter(rdInfo.FechaDevolucion).day) {
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

    const DayFormatter = (rawDay) => {
        let date = rawDay.split(' ')[0]; 

        return {
            "day":date.split('-')[0],
            "month":date.split('-')[1],
            "year":date.split('-')[2],
            "hour":rawDay.split(' ')[1]
        }

    }

    const setRentDay = (day) => {

        let percentage = 0;
        let orientation = "to bottom";

        rentDaysInfo.map((rdInfo) =>{ 
            if( monthNumber == DayFormatter(rdInfo.FechaAlquiler).month && 
                yearNumber == DayFormatter(rdInfo.FechaAlquiler).year){
                    
                if(day >=  DayFormatter(rdInfo.FechaAlquiler).day && 
                    day <=  DayFormatter(rdInfo.FechaDevolucion).day){
                    percentage = 100;
                }

                if(day ==  DayFormatter(rdInfo.FechaAlquiler).day){
                    percentage = 100 - Math.round(DayFormatter(rdInfo.FechaAlquiler).hour * 100/24);
                    orientation = "to top";
                }

                if(day ==  DayFormatter(rdInfo.FechaDevolucion).day){
                    percentage = Math.round(DayFormatter(rdInfo.FechaDevolucion).hour * 100/24);
                    orientation = "to bottom";
                }
            }
        } )

        if(rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler!== undefined){
        
            if( DayFormatter(rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler).year == yearNumber &&
                DayFormatter(rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler).month == monthNumber &&
                DayFormatter(rentInfo.Detalle[rentInfo.Detalle.length-1].FechaAlquiler).day == day){
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
