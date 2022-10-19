import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ExpenseModel } from '../../models/reduxModels';
import {handleOpenEditExpense, deleteExpense, editExpense} from "../../features/expense/expenseSlice";
import { Link } from 'react-router-dom';
import { removeTransaction } from '../../features/categories/categoriesSlice';

interface MyProps {
  expense: ExpenseModel,
  handleShow: ()=>void
}

const SingleCard = ({expense, handleShow}: MyProps) => {
  const dispatch = useAppDispatch();
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
            <Card.Title>-€{expense.price}</Card.Title>
              <Dropdown>
                <Dropdown.Toggle 
                  variant="light" 
                  id="dropdown-basic"
                >
                </Dropdown.Toggle>

                <Dropdown.Menu >
                  <Dropdown.Item
                    onClick={()=> {
                      Promise.all([
                        dispatch(deleteExpense(expense.id)),
                        dispatch(removeTransaction(
                          {
                            selectedCategories: expense.categories,
                            inputPrice: expense.price,
                          }
                        ))
                      ])
                    }}
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
            </div>
        </Card.Body>
    </Card>
  )
}

export default SingleCard