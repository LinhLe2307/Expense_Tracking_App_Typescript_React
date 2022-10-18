import React from 'react'
import { Nav } from 'react-bootstrap'
import MonthlyDetails from './MonthlyDetails'

const MonthlyBilling = () => {
  return (
    <div>
      <Nav defaultActiveKey="/home" as="ul">
        
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">October</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-2">November</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-3">December</Nav.Link>
        </Nav.Item>
      </Nav>
      <MonthlyDetails />
    </div>
  )
}

export default MonthlyBilling