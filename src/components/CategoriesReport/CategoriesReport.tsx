import { nanoid } from 'nanoid';
import React, {useState, useEffect} from 'react'
import { Button, Nav } from 'react-bootstrap'
import { Calendar } from 'react-calendar';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNewCategory, editCategoryContent, initializeCategories } from '../../features/categories/categoriesSlice';
import { deleteExpenseCategories, initializeExpense } from "../../features/expense/expenseSlice";
import { customDate } from '../../functions/reusableFunction';
import { DefaultModel, ExpenseModel } from '../../models/reduxModels';
import FormModel from '../FormModel';
import CategoryDetails from './CategoryDetails'


const CategoriesReport = () => {
  const [value, onChange] = useState(new Date());
  
  const dispatch = useAppDispatch();

  const openEditCategory = useAppSelector((state) => state.categories.openEditItem);
  const editCategory = useAppSelector((state) => state.categories.editCategory);
  const expenseId = useAppSelector((state) => state.categories.editId);
  const expenseLists = useAppSelector((state) => state.expense.inputLists);

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
        console.log(openEditCategory ? "true" : "false")
       if(!openEditCategory) {
            dispatch(addNewCategory(inputCategory)) 
        } else {
          const selectedCategory = expenseLists.map((expense:ExpenseModel) => {
            const index = editCategory && expense.categories.indexOf(editCategory);
            if(index !== -1 && typeof index === "number") {
              expense.categories[index] = inputCategory.title
            }
            return {...expense}
          });
          
          Promise.all([
            dispatch(editCategoryContent(inputCategory)),
            // dispatch(deleteExpenseCategories (selectedCategory)),
          ])
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