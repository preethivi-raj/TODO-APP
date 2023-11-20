import React from 'react'

import LineItem from './LineItem'

const ItmesList = ({items, handleCheck ,deleteClick}) => {
  return (
    <ul>
    {items.map((item)=>(
      <LineItem
       item={item}
       key={item.id}
       handleCheck={handleCheck}
       deleteClick={deleteClick}
      />
    ))}
  </ul>
  )
}

export default ItmesList