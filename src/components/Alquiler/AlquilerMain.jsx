import React, {  useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { AlquilerForm } from './AlquilerForm';
import { AlquilerTable } from './AlquilerTable';

export const AlquilerMain= () => {

  const [displayForm, setdisplayForm] = useState(false);
  const { rentInfo,setRentInfo } = useContext( UserContext );
  
   useEffect(() => {
      if(rentInfo )
          setdisplayForm(true);
   }, [rentInfo])

  return (
    <>
      {!displayForm && <AlquilerTable setdisplayForm={setdisplayForm} />}
      
      {displayForm && <AlquilerForm setdisplayForm={setdisplayForm} />}
      
    </>
  )
}
