import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ExpenseModel } from '../../models/reduxModels';
import {handleOpenEditExpense, deleteExpense, editExpense} from "../../features/expense/expenseSlice";
import { Link } from 'react-router-dom';

interface MyProps {
  expense: ExpenseModel,
  handleShow: ()=>void
}

const SingleCard = ({expense, handleShow}: MyProps) => {
  const dispatch = useAppDispatch();
  return (
    <Card className="mb-2">
        <Card.Body>   
            <Link to={`${expense.id}`}>
              <div style={{backgroundColor: `${expense.color}`, width: "5rem", height: "5rem"}}></div>
            </Link>
            <Card.Text>{expense.title}</Card.Text>
            <ButtonGroup  className="me-2" aria-label="Basic example">
              {expense.categories?.map(category => <Button variant="secondary" key={category}>{category}</Button>)}
            </ButtonGroup>
            <Card.Text>{expense.description}</Card.Text>
            <Card.Text>id {expense.id}</Card.Text>
            <Card.Title>${expense.price}</Card.Title>
              <Dropdown>
                <Dropdown.Toggle 
                  variant="light" 
                  id="dropdown-basic"
                >
                </Dropdown.Toggle>

                <Dropdown.Menu >
                  <Dropdown.Item
                    onClick={()=>dispatch(deleteExpense(expense.id))}
                  >
                    Delete
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={()=> {
                      dispatch(handleOpenEditExpense(expense.id));
                      handleShow()
                    }}
                  >
                    Edit
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
        </Card.Body>
    </Card>
  )
}

export default SingleCard