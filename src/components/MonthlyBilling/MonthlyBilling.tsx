import React, {useState, useEffect} from 'react'
import { Button, Nav } from 'react-bootstrap'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { initializeCategories } from '../../features/categories/categoriesSlice';
import MonthlyDetails from './MonthlyDetails'
import MonthlyForm from './MonthlyForm';

const MonthlyBilling = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const categoriesList = useAppSelector(state => state.categories.categoriesList)
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(initializeCategories());
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
        categoriesList.map(category => <p key={category.id}>{category.categoryTitle}</p>)
      }
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