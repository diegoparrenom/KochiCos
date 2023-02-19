import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { DisplayTable } from '../../helpers/DisplayTable'
import { useNavigate } from 'react-router-dom';
import gSource from '../../helpers/gSource';
import Loader from '../../helpers/Loader';
import Message from '../../helpers/Message';

const HeadItem = ["personaje","Serie","Genero","Talla","PrecioAlquiler","PrecioVenta",
                    "Editar","Eliminar","Alquilar","Agregar"];

export const TrajesTable = ({setdisplayForm}) => {

    const { rentInfo, setRentInfo } = useContext( UserContext );
    const navigate = useNavigate();
    const [table,setTable] = useState();
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        gSource().getTable("Trajes",setTable);
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
        gSource().getTable("Trajes",setTable);
    }

    const onDeleteOk = (rowInfo) => {
        setLoading(true);
        gSource().deleteRow("Trajes","id_traje",rowInfo.id_traje,{returnMessage});
    }

    const onDeleteItem = (rowInfo) => {
        setLoading(false);
        Message().confirm(()=>onDeleteOk(rowInfo),`¿Esta Realmente Seguro de Eliminar : ${rowInfo.personaje}?`);
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
            {loading?
            <Loader message={'Cargando info de Trajes'} /> :
            <>
            {   
                table == undefined? 
                <Loader  message={'Cargando info de Trajes'}/>:
                <DisplayTable data={table} headerData={HeadItem}
                            onEditItem={onEditItem} onDeleteItem={onDeleteItem}
                            onAddItem={onAddItem} onRentItem={onRentItem}/>
            }
            </>}
        </>
    )
}
