import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useAppDispatch } from '../../app/hooks';
import { ExpenseModel } from '../../models/reduxModels';
import {handleOpenEditExpense, deleteExpense, editExpense} from "../../features/expense/expenseSlice";
import { Link } from 'react-router-dom';
import CustomDropdown from '../CustomDropdown';


interface MyProps {
  expense: ExpenseModel
}

const SingleCard = ({expense}: MyProps) => {
  return (
    <Card className="mb-2">
        <Card.Body style={{display:"flex", justifyContent:"space-between", alignItems: "center"}}>
          <div>{expense.date}</div>
            <div style={{display:"flex", justifyContent:"space-between", gap: "3rem"}}>
              <Link 
                to={`${expense.id}`} 
                state={{ expenseDetails: expense}}
              >
                <div style={{backgroundColor: `${expense.color}`, width: "5rem", height: "5rem"}}></div>
              </Link>
            <div>
              <Card.Text>{expense.title}</Card.Text>
              <ButtonGroup  className="me-2" aria-label="Basic example">
                {expense.categories?.map(category => <Button variant="secondary" key={category}>{category}</Button>)}
              </ButtonGroup>
            </div>
            </div>
            <div style={{display:"flex", justifyContent:"space-between", gap: "3rem"}}>
            {/* <Card.Text>{expense.description}</Card.Text> */}
            <Card.Title>-€{expense.amount}</Card.Title>
            {
              expense.id &&
              <CustomDropdown 
                deleteItem={deleteExpense}
                handleOpenEditItem={handleOpenEditExpense}
                itemId={expense.id}
              />
            }
            </div>
        </Card.Body>
    </Card>
  )
}

export default SingleCard