import React, { useState } from 'react'
import { TrajesForm } from './TrajesForm';
import { TrajesTable } from './TrajesTable';

export const TrajesMain = () => {

  const [displayForm, setdisplayForm] = useState(false);

  return (
    <>
      {!displayForm && <TrajesTable setdisplayForm={setdisplayForm} />}
      
      {displayForm && <TrajesForm setdisplayForm={setdisplayForm} />}
    </>
  )
}
