import React, { useContext,useState,useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import { useForm2 } from '../../hooks/useForm2';
import stl from '../../style/form.module.css'
import { useNavigate } from 'react-router-dom';
import gSource from '../../helpers/gSource';
import Loader from '../../helpers/Loader'

const SheetId = "Alquileres";
const idgen = new Date();

export const AlquilerForm = ({setdisplayForm}) => {

    const { rentInfo, setRentInfo } = useContext( UserContext );
    const [ detalle,setDetalle] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { formState,setFormState, onInputChange, onResetForm, nombre, dni, Telefono,Direccion } = useForm2({
        nombre: '',
        dni: '',
        Telefono: '',
        Direccion:''
    })

    const onAgregar = () => {
        navigate('/trajes');
    }

    const onCancel = () => {
        onResetForm();
        setRentInfo(null)
        setdisplayForm(false);
    }
    const returnMessage = () => {
        setRentInfo(null)
        setdisplayForm(false);
        setLoading(false);
    }
    const onSaveForm = () => {

        if(formState.id_alquiler !== undefined){
            gSource().updateRow(SheetId,"id_alquiler",formState.id_alquiler,formState,{returnMessage});
        }
        else{
            formState.id_alquiler = idgen.getTime();
            gSource().addRow(SheetId,formState,{returnMessage});
            
            formState.Detalle[formState.Detalle.length-1].id_detalquiler = idgen.getTime()+1;
            formState.Detalle[formState.Detalle.length-1].id_alquiler = formState.id_alquiler;
            gSource().addRow("AlquilerDetalle",formState.Detalle[formState.Detalle.length-1],{returnMessage});
        }
        setLoading(true);
    }

    const setTable = (result) => {
        setDetalle(result);
    }
    useEffect(() => {
        setFormState(rentInfo);
        if(rentInfo.nombre != undefined){
            gSource().getTableUnion("AlquilerDetalle","id_traje","id_alquiler",rentInfo.id_alquiler,
                                    "Trajes","id_traje",{setTable});
        }
        else{
            gSource().getInfoFromTable(rentInfo.Detalle,"Trajes","id_traje",{setTable});
        }
    }, [])
    
    return (
        <>
            {loading ?
                <Loader message={'Guardando Informacion de Alquiler'}/> :
                <div>
                    <h1>INGRESAR INFORMACION DE ALQUILER:</h1>
                    <hr />
                    <div className={stl.FormFieldContainer}>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text" placeholder="Nombre" 
                            name="nombre" value={nombre==undefined?'':nombre} onInput={onInputChange}
                        />
                        <label htmlFor="dni">Dni:</label>
                        <input
                            type="text" placeholder="dni" 
                            name="dni" value={dni==undefined?'':dni} onInput={onInputChange}
                        />
                        <label htmlFor="Telefono">Telefono:</label>
                        <input
                            type="text" placeholder="Telefono" 
                            name="Telefono" value={Telefono==undefined?'':Telefono} onInput={onInputChange}
                        />
                        <label htmlFor="Direccion">Direccion:</label>
                        <input
                            type="text" placeholder="Direccion" 
                            name="Direccion" value={Direccion==undefined?'':Direccion} onInput={onInputChange}
                        />
                    </div>
                    {
                        detalle.length == 0 ?
                        <Loader message={'Cargando info de Alquiler'}/> :
                        <table className={stl.AlquilerDetailTable}>
                            <thead>
                                <tr>
                                    <th>Personaje</th>
                                    <th>Serie</th>
                                    <th>Fecha de Alquiler</th>
                                    <th>Fecha de Devolucion</th>
                                    <th>Precio de Alquiler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalle.map((d, index) => (
                                    <tr key={index}>
                                        <td>{d.personaje}</td>
                                        <td>{d.Serie}</td>
                                        <td>{d.FechaAlquiler}</td>
                                        <td>{d.FechaDevolucion}</td>
                                        <td>{d.PrecioAlquiler}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                    <div className={stl.FormButtonContainer}>
                        <button onClick={onSaveForm} >Guardar</button>
                        <button onClick={onResetForm} >Limpiar</button>
                        <button onClick={onCancel} >Cancelar</button>
                        {detalle.length>0?<button onClick={onAgregar} >Agregar</button>:''}
                    </div>
                </div>
            }
        </>
  )
}
