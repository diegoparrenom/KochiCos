import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { DisplayTable } from '../../helpers/DisplayTable'
import gSource from '../../helpers/gSource';
import Loader from '../../helpers/Loader';
import Message from '../../helpers/Message';

import 'react-toastify/dist/ReactToastify.css';

const HeadItem = ["nombre","dni","Telefono","Direccion","Editar","Eliminar","Agregar"];
const SheetId = "Alquileres";

export const AlquilerTable = ({setdisplayForm}) => {

    const navigate = useNavigate();
    const { setRentInfo } = useContext( UserContext );
    const [table,setTable] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        gSource().getTable(SheetId,setTable);
    },[]);

    const onAddItem = () => {
        navigate('/trajes')
        setRentInfo();
    }

    const onEditItem = (rowInfo) => {
        setRentInfo(rowInfo);
        setdisplayForm(true);
    }

    const returnMessage = () => {
        setLoading(false);
        setTable(undefined);
        gSource().getTable(SheetId,setTable);
    }
    const onDeleteOk = (rowInfo) => {
        setLoading(true);
        gSource().deleteRow(SheetId,"id_alquiler",rowInfo.id_alquiler,{returnMessage});
        gSource().deleteRow("AlquilerDetalle","id_alquiler",rowInfo.id_alquiler,{returnMessage});
    }

    const onDeleteItem = (rowInfo) => {
        setLoading(false);
        Message().confirm(()=>onDeleteOk(rowInfo),`¿Esta Realmente Seguro de Eliminar a: ${rowInfo.nombre}?`);
    }

    return (
        <>
            {loading?
            <Loader message={'Cargando info de Alquiler'} /> :
            <>
                {
                    table == undefined ?
                        <Loader message={'Cargando info de Alquiler'} /> :
                        <DisplayTable 
                            data={table} 
                            headerData={HeadItem}
                            onEditItem={onEditItem}
                            onDeleteItem={onDeleteItem}
                            onAddItem={onAddItem}/>
                }
            </>}
        </>
    )
}
