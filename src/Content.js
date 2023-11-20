import React from 'react'

import ItmesList from './ItmesList'

const Content = ({items,handleCheck,deleteClick}) => {
     
  return (
    <>
      {
      (items.length) ? 
      (
        <ItmesList
        items={items}
        handleCheck={handleCheck}
        deleteClick={deleteClick}
        />
      ) : 
      (
        <p style={{marginTop:'50%'}}>Your list is Empty</p>
      )
      }
    </>
  )
}

export default Content