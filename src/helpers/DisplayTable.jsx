import React, { useState } from 'react'
import stl from '../style/form.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faSplotch, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'// <-- import styles to be used

export const DisplayTable = ({data,headerData,onEditItem,onDeleteItem,onAddItem,onRentItem,
                                onRentedItem}) => {

    const headData = headerData.filter(i=>i!="Editar" && i!="Eliminar" && 
                                          i!="Alquilar" && i!="Entregado" && i!="Agregar");
    const [searchItem, setSearchItem] = useState('');
    const [searchField, setSearchField] = useState(headData[0])

    const ReplaceWords = (word) => {
        word = word.replace('Precio','Precio ');
        return word;
    }

    const MainButtons = ({row}) => {
        return(
            <div>
                {headerData.includes("Editar") &&
                    <button onClick={() => onEditItem(row)} className={stl.TableBtn}>
                        <FontAwesomeIcon icon={faFilePen} /> Editar
                    </button>}
                {headerData.includes("Eliminar") &&
                    <button onClick={() => onDeleteItem(row)} className={stl.TableBtn}>
                        <FontAwesomeIcon icon={faTrashCan} /> Eliminar
                    </button>}
                {headerData.includes("Alquilar") &&
                    <button onClick={() => onRentItem(row)} className={stl.TableBtn}>
                        <FontAwesomeIcon icon={faSplotch} /> Alquilar
                    </button>}
                {headerData.includes("Entregado") &&
                    <button onClick={() => onRentedItem(row)} className={stl.TableBtn}>
                        <FontAwesomeIcon icon={faSplotch} /> Entregado
                    </button>}
            </div>
        )
    }
    const updDisplay = (id) => {
        data.forEach((h,index)=>{
            if(id == index)
                document.getElementById(`Row${index}`).className = stl.TableBtnFrameDisplay;
            else
                document.getElementById(`Row${index}`).className = stl.TableBtnFrameCollapse;
        });
    }

    const RowTable = ({row,idRow,updDisplay}) => {
        return(
            <>
                <tr onClick={()=>updDisplay(idRow)}>
                    {headData.map(headitem => (
                        <td key={row[headitem] + headitem}  >{row[headitem]}</td>
                    ))}
                    <td className={stl.TableBtnFrame} >
                        <MainButtons row={row} />
                    </td>
                </tr>
                <tr id={`Row${idRow}`} className={stl.TableBtnFrameCollapse}>
                    <td colSpan={headData.length} className ={stl.TableBtnFrameRow}  ><MainButtons row={row} /></td>
                </tr>
            </> 
        )
    }
    const sortby = (data,searchItem) => {
        data.sort((p1,p2) =>(p1[headData[0]]>p2[headData[0]]) ? 1 :(p1[headData[0]]<p2[headData[0]]) ? -1:0 )

        if(searchItem.length>0)
            data = data.filter((i)=>String(i[searchField]).toUpperCase().includes(searchItem.toUpperCase()))

        // data = data.slice(0,5);

        return data;
    }

    return (
        <>
            <input
                placeholder={`Buscar ${[searchField]} ...`}
                onChange={() => setSearchItem(event.target.value)}
                className={stl.SearchInput} />
            {headerData.includes("Agregar") &&
            <button onClick={() => onAddItem()} className={stl.TableBtn} >
                <FontAwesomeIcon icon={faSquarePlus} /> Agregar
            </button>}
            <br/>
            <br/>
            <div className={stl.TableContainer}>
                <table className={stl.TrajesTable} >
                    <thead>
                        <tr>
                            {headData.map(headitem => (
                                <th key={headitem} onClick={()=>setSearchField(headitem)}>{ReplaceWords(headitem)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortby(data,searchItem).map((row,index) => (
                            <RowTable key={index} row={row} idRow={index} updDisplay={updDisplay}/>
                        ))}
                    </tbody>
                </table>
            </div>
            <br/>

        </>
    )
}
