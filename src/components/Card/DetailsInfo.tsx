import React from 'react'
import { useLocation } from 'react-router-dom'

const DetailsInfo = () => {
    const location = useLocation();
    const expenseDetails = location.state.expenseDetails;
  return (
    <div>{expenseDetails.title}</div>
  )
}

export default DetailsInfo