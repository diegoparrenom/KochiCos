import React, { useEffect, useState } from 'react'
import { DisplayTable } from '../../helpers/DisplayTable'
import gSource from '../../helpers/gSource';
import Loader from '../../helpers/Loader';
import CFormat from '../../helpers/CFormat';

const HeadItem = ["personaje","Serie","nombre","Telefono","HoraAlquiler",
                    "Entregado"];
const Fecha = new Date();

export const EntregaTable = () => {

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
            row.HoraAlquiler=CFormat().date(row.FechaAlquiler).hour 
        });
        setTable(
            result.
            filter( (r)=>(
                CFormat().date(r.FechaAlquiler).day== Fecha.getDate() &&
                CFormat().date(r.FechaAlquiler).month== Fecha.getMonth()+1 &&
                CFormat().date(r.FechaAlquiler).year== Fecha.getFullYear() && 
                r.Estado == "Disponible"
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
            "Estado":"No Disponible"
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
            "Estado":"Alquilado"
        }
        gSource().addRow("Registro",RegisterRow,{returnMessage});
           
        
    }

    return (
        <>
        {   
           loading? 
            <Loader  message={'Buscando Entregas para hoy...'}/>:
            <DisplayTable data={table} headerData={HeadItem} onRentedItem={onRentedItem}/>
        }
        </>
    )
}
