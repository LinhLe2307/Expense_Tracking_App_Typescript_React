import React, {useState, useEffect} from 'react'
import { Button, Nav } from 'react-bootstrap'
import { Calendar } from 'react-calendar';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { initializeCategories } from '../../features/categories/categoriesSlice';
import { initializeExpense } from "../../features/expense/expenseSlice";
import { customDate } from '../../functions/reusableFunction';
import MonthlyDetails from './MonthlyDetails'
import MonthlyForm from './MonthlyForm';


const MonthlyBilling = () => {
  const [value, onChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const categoriesList = useAppSelector(state => state.categories.inputLists);
  const expenseLists = useAppSelector((state) => state.expense.inputLists);

  const dispatch = useAppDispatch();

  const transactionCategories = () => {
    const transactionList = expenseLists
          .map(expense => expense.categories)
          .map(category => (category))
          .flat(1)

    const newList = typeof transactionList
    console.log(newList); 
    // const transactionsAmount = 
    //   transactionList.reduce((prev, curr) => {
    //         if(curr in prev) {
    //           prev[curr]++
    //         } else {
    //           prev[curr] = 1
    //         }
    //         return prev
    //       }, {})
          
    
  }

  useEffect(()=>{
    dispatch(initializeCategories());
    dispatch(initializeExpense());
  }, [dispatch])

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

      {
        categoriesList.map(category => <p key={category.id}>{category.title}</p>)
      }

      {/* {
        transactionCategories()
      } */}
      <Button
            variant="dark" 
            onClick={handleShow} 
            type="button" 
            style={{
                position:"absolute",
                bottom: "3rem",
                right: "3rem",
                borderRadius: "50%"
            }}
        >
            +
        </Button>
        <MonthlyForm 
          handleClose={handleClose}
          show={show}
        />
    </div>
  )
}

export default MonthlyBilling