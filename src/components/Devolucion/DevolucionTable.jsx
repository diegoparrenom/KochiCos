import React, { useEffect, useState } from 'react'
import { DisplayTable } from '../../helpers/DisplayTable'
import gSource from '../../helpers/gSource';
import Loader from '../../helpers/Loader';
import CFormat from '../../helpers/CFormat';

const HeadItem = ["personaje","Serie","nombre","Telefono","HoraDevolucion",
                    "Entregado"];
const Fecha = new Date();

export const DevolucionTable = () => {

    const [table,setTable] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        setLoading(true);
        gSource().getTableUnion("AlquilerDetalle","Trajes","id_traje",setTableAlquiler)
    },[]);

    const setTableAlquiler = (result) => {
        gSource().getInfoFromTable(result,"Alquileres","id_alquiler",setTableTrajes);
    }
    const setTableTrajes = (result) => {
        result.map( (row) => { 
            row.HoraDevolucion=CFormat().date(row.FechaDevolucion).hour 
        });
        setTable(
            result.
            filter( (r)=>(
                CFormat().date(r.FechaDevolucion).day== Fecha.getDate() &&
                CFormat().date(r.FechaDevolucion).month== Fecha.getMonth()+1 &&
                CFormat().date(r.FechaDevolucion).year== Fecha.getFullYear() && 
                r.Estado == "No Disponible"
            ))
        );
        setLoading(false);
    }
    const returnMessage = () => {
        gSource().getTableUnion("AlquilerDetalle","Trajes","id_traje",setTableAlquiler)
    }
    const onRentedItem = (row) => {
        setLoading(true);

        const row_traje = {
            "id_traje":row.id_traje,
            "personaje":row.personaje,
            "Serie":row.Serie,
            "Genero":row.Genero,
            "Talla":row.Talla,
            "PrecioAlquiler":row.PrecioAlquiler,
            "PrecioVenta":row.PrecioVenta,
            "Estado":"Disponible"
        }
        gSource().updateRow("Trajes","id_traje",row.id_traje,row_traje,{returnMessage});

        let RegisterRow = {
            "personaje":row.personaje,
            "Serie":row.Serie,
            "nombre":row.nombre,
            "dni":row.dni,
            "Telefono":row.Telefono,
            "Direccion":row.Direccion,
            "FechaAlquiler":row.FechaAlquiler,
            "FechaDevolucion":row.FechaDevolucion,
            "Estado":"Devuelto"
        }
        gSource().addRow("Registro",RegisterRow,{returnMessage});
    }

    return (
        <>
        {   
           loading? 
            <Loader  message={'Buscando Devoluciones para hoy...'}/>:
            <DisplayTable data={table} headerData={HeadItem} onRentedItem={onRentedItem}/>
        }
        </>
    )
}
