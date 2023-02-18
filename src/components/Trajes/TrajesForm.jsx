import React, { useContext,useState,useEffect} from 'react'
import { UserContext } from '../../context/UserContext';
import gSource from '../../helpers/gSource';
import Loader from '../../helpers/Loader';
import { useForm2 } from '../../hooks/useForm2';
import stl from '../../style/form.module.css'

const SheetId = "Trajes";
const idgen = new Date();

export const TrajesForm = ({setdisplayForm}) => {

    const { rentInfo, setRentInfo } = useContext( UserContext );
    const [loading, setLoading] = useState(false);

    const {formState, setFormState, onInputChange, onResetForm, 
        personaje,Serie,Genero,Talla,PrecioAlquiler,PrecioVenta} = useForm2({
        personaje: '',
        Serie: '',
        Genero: '',
        Talla:'',
        PrecioAlquiler:'',
        PrecioVenta:'',
    })

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

        formState.PrecioAlquiler = String(formState.PrecioAlquiler).replace('.',',');
        formState.PrecioVenta= String(formState.PrecioVenta).replace('.',',');

        if(formState.id_traje !== undefined){
            gSource().updateRow(SheetId,"id_traje",formState.id_traje,formState,{returnMessage});
        }
        else{
            formState.id_traje = idgen.getTime();
            gSource().addRow(SheetId,formState,{returnMessage});
        }
        setLoading(true);
    }

    useEffect(() => {
        if(rentInfo !== undefined)
            setFormState(rentInfo);
    }, [rentInfo])
    
    return (
        <>
            {loading ?
                <Loader message={'Guardando el Traje'}/> :
                <div>
                    <h1>Trajes</h1>
                    <hr />
                    <div className={stl.FormFieldContainer}>
                        <label htmlFor="personaje">Personaje:</label>
                        <input
                            type="text" className="form-control"
                            placeholder="personaje" name="personaje" value={personaje}
                            onInput={onInputChange}
                        />
                        <label htmlFor="Serie">Serie:</label>
                        <input
                            type="text" className="form-control mt-2"
                            placeholder="Serie" name="Serie" value={Serie}
                            onInput={onInputChange}
                        />
                        <label htmlFor="Genero">Genero:</label>
                        <input
                            type="text" className="form-control mt-2"
                            placeholder="Genero" name="Genero" value={Genero}
                            onInput={onInputChange}
                        />
                        <label htmlFor="Talla">Talla:</label>
                        <input
                            type="text" className="form-control mt-2"
                            placeholder="Talla" name="Talla" value={Talla}
                            onInput={onInputChange}
                        />
                        <label htmlFor="PrecioAlquiler">Precio Alquiler:</label>
                        <input
                            type="text" className="form-control mt-2"
                            placeholder="PrecioAlquiler" name="PrecioAlquiler" value={PrecioAlquiler}
                            onInput={onInputChange}
                        />
                        <label htmlFor="PrecioVenta">Precio Venta:</label>
                        <input
                            type="text" className="form-control mt-2"
                            placeholder="PrecioVenta" name="PrecioVenta" value={PrecioVenta}
                            onInput={onInputChange}
                        />

                    </div>
                    <div className={stl.FormButtonContainer}>
                        <button onClick={onSaveForm} >Guardar</button>
                        <button onClick={onResetForm} >Limpiar</button>
                        <button onClick={onCancel} >Cancelar</button>
                    </div>
                </div>
            }
        </>
    )
}