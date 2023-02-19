import React, { useEffect, useState } from 'react'
import { DisplayTable } from '../../helpers/DisplayTable'
import gSource from '../../helpers/gSource';
import Loader from '../../helpers/Loader';
import CFormat from '../../helpers/CFormat';

const HeadItem = ["personaje","Serie","nombre","dni","Telefono","Direccion",
                    "FechaAlquiler","FechaDevolucion","Estado"];
// const Fecha = new Date();

export const RegistroTable = () => {

    const [table,setTable] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        setLoading(true);
        gSource().getTable("Registro",setTableRegistro)
    },[]);

    const setTableRegistro = (result) => {
        setLoading(false);
        setTable(result);
    }
 

    return (
        <>
        {   
           loading? 
            <Loader  message={'Cargando Registros'}/>:
            <DisplayTable data={table} headerData={HeadItem}/>
        }
        </>
    )
}
