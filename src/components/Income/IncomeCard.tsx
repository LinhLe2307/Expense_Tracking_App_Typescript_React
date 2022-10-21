import React from 'react'
import { Card } from 'react-bootstrap'
import { deleteIncome, handleOpenEditIncome } from '../../features/income/incomeSlice'
import { IncomeModel } from '../../models/reduxModels'
import CustomDropdown from '../CustomDropdown'

interface MyProps {
    income: IncomeModel,
    handleShow: ()=>void
}

const IncomeCard = ({income, handleShow}: MyProps) => {
  return (
    <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header>
          {income.date}
          {
            income.id &&
            <CustomDropdown 
              deleteItem={deleteIncome}
              handleOpenEditItem={handleOpenEditIncome}
              itemId={income.id}
              handleShow={handleShow}
            />

          }
        </Card.Header>
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