import { nanoid } from 'nanoid';
import React, {useState, useEffect} from 'react'
import { Button, Nav } from 'react-bootstrap'
import { Calendar } from 'react-calendar';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNewCategory, editCategoryContent, initializeCategories } from '../../features/categories/categoriesSlice';
import { deleteExpenseCategories, initializeExpense } from "../../features/expense/expenseSlice";
import { customDate } from '../../functions/reusableFunction';
import { DefaultModel } from '../../models/reduxModels';
import FormModel from '../FormModel';
import CategoryDetails from './CategoryDetails'


const CategoriesReport = () => {
  const [value, onChange] = useState(new Date());
  
  const dispatch = useAppDispatch();
  const expenseLists = useAppSelector((state) => state.expense.inputLists);
  const openEditCategory = useAppSelector((state) => state.categories.openEditItem);
  const expenseId = useAppSelector((state) => state.categories.editId);
  const editCategory = useAppSelector((state) => state.categories.editCategory);

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
            const selectedCategory = expenseLists.map(expense => {
              // const newClone = expense.categories.map(category => category + "hi")
              
              const newClone = expense.categories.map(category => editCategory && category.indexOf(editCategory) !== -1 ? inputCategory.title : category)
              return {...expense, categories: newClone}
            });
            // console.log(selectedCategory)
            Promise.all([
            dispatch(deleteExpenseCategories(selectedCategory)),
              dispatch(editCategoryContent(inputCategory))
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