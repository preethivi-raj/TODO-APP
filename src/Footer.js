import React from 'react'

const Footer = (props) => {
 

  return (
    <footer>List {props.length <=1 ? "Item " :"Itmes "}:{` `+props.length}</footer>
  )
}

export default Footer