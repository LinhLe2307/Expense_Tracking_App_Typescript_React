import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ExpenseModel } from '../../models/reduxModels';
import {handleOpenEditExpense} from "../../features/expense/expenseSlice";

interface MyProps {
  expense: ExpenseModel,
  handleShow: ()=>void
}
 
const SingleCard = ({expense, handleShow}: MyProps) => {
  const dispatch = useAppDispatch();
  const openEditExpense = useAppSelector((state) => state.expense.openEditExpense);
  return (
    <Card className="mb-2">
        <Card.Body>
            <div style={{backgroundColor: `${expense.color}`, width: "5rem", height: "5rem"}}></div>
            <Card.Text>{expense.title}</Card.Text>
            <ButtonGroup  className="me-2" aria-label="Basic example">
              {expense.categories.map(category => <Button variant="secondary" key={category}>{category}</Button>)}
            </ButtonGroup>
            <Card.Title>${expense.price}</Card.Title>
            <Button onClick={()=> {
              dispatch(handleOpenEditExpense(expense.id));
              handleShow()
            }}>...</Button>
        </Card.Body>
    </Card>
  )
}

export default SingleCard