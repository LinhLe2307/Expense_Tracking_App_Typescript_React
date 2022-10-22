import { nanoid } from 'nanoid';
import React, {useState, useEffect} from 'react'
import { Button, Nav } from 'react-bootstrap'
import { Calendar } from 'react-calendar';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNewCategory, editCategory, initializeCategories } from '../../features/categories/categoriesSlice';
import { initializeExpense } from "../../features/expense/expenseSlice";
import { customDate } from '../../functions/reusableFunction';
import { DefaultModel } from '../../models/reduxModels';
import FormModel from '../FormModel';
import CategoryDetails from './CategoryDetails'


const CategoriesReport = () => {
  const [value, onChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const dispatch = useAppDispatch();

  const openEditCategory = useAppSelector((state) => state.categories.openEditItem);
  const expenseId = useAppSelector((state) => state.categories.editId);

  const [inputCategory, setInputCategory] = useState<DefaultModel>({
        date: customDate(new Date()),
        title: "",
        description: "", 
        color: ""
    });

    const handleInputExpense = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setInputCategory({
            ...inputCategory,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
       if(!openEditCategory) {
            dispatch(addNewCategory(inputCategory)) 
        } else {
            dispatch(editCategory(inputCategory))
        }
        window.location.reload()
    } 
  
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

      {/* <Button
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
        </Button> */}

        <FormModel 
          handleShow={handleShow}
          inputExpense={inputCategory}
          expenseId={expenseId}
          show={show} 
          handleClose={handleClose}
          submitHandler={submitHandler}
          handleInputExpense={handleInputExpense}
          type="categories"
          baseURL="http://localhost:3010/categories"
    />
    </div>
  )
}

export default CategoriesReport