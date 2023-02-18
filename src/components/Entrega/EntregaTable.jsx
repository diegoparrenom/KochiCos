import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { DisplayTable } from '../../helpers/DisplayTable'
import { useNavigate } from 'react-router-dom';
import gSource from '../../helpers/gSource';
import Loader from '../../helpers/Loader';

const HeadItem = ["personaje","Serie","Genero","Talla","PrecioAlquiler","PrecioVenta",
                    "Editar","Eliminar","Alquilar"];

const SheetId = "AlquilerDetalle";

export const EntregaTable = ({setdisplayForm}) => {

    const { rentInfo, setRentInfo } = useContext( UserContext );
    const navigate = useNavigate();
    const [table,setTable] = useState([]);
   
    
    useEffect(()=>{
        gSource().getTable2("AlquilerDetalle",setTableDetalle)
    },[]);

    const setTableDetalle = (result) => {

        console.log(result)
    }
   

    return (
        <>
        {/* {   
            table == undefined? 
            <Loader  message={'Cargando info de Trajes'}/>:
            <DisplayTable data={table} headerData={HeadItem} onRentedItem={onRentedItem}/>
        } */}
        </>
    )
}
