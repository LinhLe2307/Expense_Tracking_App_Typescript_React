import { nanoid } from 'nanoid';
import React, {useState, useEffect} from 'react'
import { Button, Nav } from 'react-bootstrap'
import { Calendar } from 'react-calendar';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { initializeCategories } from '../../features/categories/categoriesSlice';
import { initializeExpense } from "../../features/expense/expenseSlice";
import { customDate } from '../../functions/reusableFunction';
import CategoryDetails from './CategoryDetails'
import CategoryForm from './CategoryForm';


const MonthlyBilling = () => {
  const [value, onChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    dispatch(initializeCategories());
    dispatch(initializeExpense());
    
  }, [dispatch]);


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
      <CategoryDetails />

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
        <CategoryForm 
          handleClose={handleClose}
          show={show}
        />
    </div>
  )
}

export default MonthlyBilling