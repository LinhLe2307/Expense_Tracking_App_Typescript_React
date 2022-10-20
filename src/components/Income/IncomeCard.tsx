import React from 'react'
import { Card } from 'react-bootstrap'
import { IncomeModel } from '../../models/reduxModels'

interface MyProps {
    income: IncomeModel
}

const IncomeCard = ({income}: MyProps) => {
  return (
    <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header>{income.date}</Card.Header>
        <Card.Body>
          <Card.Title>{income.title}</Card.Title>
          <Card.Text>
            {income.description}
          </Card.Text>
        </Card.Body>
      </Card>
  )
}

export default IncomeCard