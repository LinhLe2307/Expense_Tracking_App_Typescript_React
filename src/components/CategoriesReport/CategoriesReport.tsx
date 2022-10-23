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
  
  const dispatch = useAppDispatch();

  const openEditCategory = useAppSelector((state) => state.categories.openEditItem);
  const expenseId = useAppSelector((state) => state.categories.editId);

  const [inputCategory, setInputCategory] = useState<DefaultModel>({
        date: customDate(new Date()),
        title: "",
        description: "", 
        color: ""
    });

    const handleInputCategory = (e:React.ChangeEvent<HTMLInputElement>):void => {
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
      {/* <Nav defaultActiveKey="/home" as="ul">
        
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">October</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-2">November</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-3">December</Nav.Link>
        </Nav.Item>
      </Nav> */}
      <CategoryDetails />
      
        <FormModel 
          inputExpense={inputCategory}
          expenseId={expenseId}
          submitHandler={submitHandler}
          handleInputExpense={handleInputCategory}
          type="categories"
          baseURL="http://localhost:3010/categories"
    />
    </div>
  )
}

export default CategoriesReport