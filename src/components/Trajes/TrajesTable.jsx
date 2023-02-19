import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { DisplayTable } from '../../helpers/DisplayTable'
import { useNavigate } from 'react-router-dom';
import gSource from '../../helpers/gSource';
import Loader from '../../helpers/Loader';

const HeadItem = ["personaje","Serie","Genero","Talla","PrecioAlquiler","PrecioVenta",
                    "Editar","Eliminar","Alquilar","Agregar"];

const SheetId = "Trajes";

export const TrajesTable = ({setdisplayForm}) => {

    const { rentInfo, setRentInfo } = useContext( UserContext );
    const navigate = useNavigate();
    const [table,setTable] = useState();
    
    useEffect(()=>{
        gSource().getTable(SheetId,{setTable});
    },[]);

    const onAddItem = () => {
        setRentInfo();
        setdisplayForm(true);
    }

    const onEditItem = (rowInfo) => {
        setRentInfo(rowInfo);
        setdisplayForm(true);
    }

    const returnMessage = () => {
        setTable(undefined);
        gSource().getTable(SheetId,{setTable});
    }

    const onDeleteItem = (rowInfo) => {
        gSource().deleteRow(SheetId,"id_traje",rowInfo.id_traje,{returnMessage});
    }

    const onRentItem = (rowInfo) => {
        if(rentInfo == null){
            setRentInfo({
                "Detalle": [{
                    "id_traje": rowInfo.id_traje
                }]
            });
        }
        else{
            rentInfo.Detalle = [...rentInfo.Detalle,{"id_traje": rowInfo.id_traje}];
        }
        navigate('/calendar');
    }

    return (
        <>
        {   
            table == undefined? 
            <Loader  message={'Cargando info de Trajes'}/>:
            <DisplayTable data={table} headerData={HeadItem}
                        onEditItem={onEditItem} onDeleteItem={onDeleteItem}
                        onAddItem={onAddItem} onRentItem={onRentItem}/>
        }
        </>
    )
}
