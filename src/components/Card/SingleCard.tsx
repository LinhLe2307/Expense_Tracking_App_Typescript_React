import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
            <Card.Title>Title {expense.title}</Card.Title>
            <Card.Text>${expense.price}</Card.Text>
            <Card.Text>id {expense.id}</Card.Text>
            <Button onClick={()=> {
              dispatch(handleOpenEditExpense(expense.id));
              handleShow()
            }}>...</Button>
        </Card.Body>
    </Card>
  )
}

export default SingleCard