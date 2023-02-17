import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { DisplayTable } from '../../helpers/DisplayTable'
import gSource from '../../helpers/gSource';
import Loader from '../../helpers/Loader';
import stl from '../../style/message.module.css'

import delIcon from '../../gif/delete.png';

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const HeadItem = ["nombre","dni","Telefono","Direccion","Editar","Eliminar"];
const SheetId = "Alquileres";

export const AlquilerTable = ({setdisplayForm}) => {

    const navigate = useNavigate();
    const { setRentInfo } = useContext( UserContext );
    const [table,setTable] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        gSource().getTable(SheetId,{setTable});
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
        gSource().getTable(SheetId,{setTable});
    }
    const onDeleteOk = (rowInfo) => {
        setLoading(true);
        gSource().deleteRow(SheetId,rowInfo,{returnMessage});
        gSource().deleteRow("AlquilerDetalle",rowInfo,{returnMessage},"id_alquiler");
    }

    const onDeleteItem = (rowInfo) => {
        toast((
            <div>
                <img className={stl.MsgIcon} src={delIcon} alt="loading..." />
                <div className={stl.MsgTitle}>
                    ¿Esta Realmente Seguro de Eliminar a: {rowInfo.nombre}?
                </div>
                <br/>
                <button className={stl.MsgButton} onClick={()=>onDeleteOk(rowInfo)}>OK</button>
                <button className={stl.MsgButton}>Cancel</button>
            </div>
          ), {
            className:stl.MsgContainer,
            passive:false,
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: false,
            closeButton: false
          });
    }

    return (
        <>
            <ToastContainer/>
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
