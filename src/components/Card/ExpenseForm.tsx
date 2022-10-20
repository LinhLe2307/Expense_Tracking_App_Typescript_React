import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewExpense, editExpense } from '../../features/expense/expenseSlice';
import {ExpenseModel} from "../../models/reduxModels";
import { Dropdown, Form } from 'react-bootstrap';
import { DefaultModel } from "../../models/reduxModels";
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'
import CloseButton from 'react-bootstrap/CloseButton';
import { initializeCategories } from '../../features/categories/categoriesSlice';
import { customDate } from "../../functions/reusableFunction";
import { nanoid } from "nanoid";
import FormModel from "../FormModel";

interface MyProps {
  typeForm: string,
  handleClose: ()=>void,
  show:boolean
}

function ExpenseForm ({typeForm, handleClose, show }: MyProps){
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const dispatch = useAppDispatch()

    const [inputExpense, setInputExpense] = useState<ExpenseModel>({
        date: customDate(new Date()),
        title: "",
        price: 0,
        description: "", 
        categories: selectedCategories,
        color: ""
    });

    const deleteCategory = (deleteItem: string) => {
      setSelectedCategories(prev => prev.filter(category => category !== deleteItem))
    }

    const handleSelectedCategories = (category: DefaultModel) => {
      const inputCategory = category.title;
      if(selectedCategories.indexOf(inputCategory) === -1) {
        setSelectedCategories(prev => prev.concat(category.title))
      }
    }

    const handleInputExpense = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setInputExpense({
            ...inputExpense,
            [e.target.name] : e.target.value,
            categories: selectedCategories
        })
    }


    const submitHandler = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        if(typeForm === "add") {
            dispatch(addNewExpense(inputExpense)) 
        } else {
            dispatch(editExpense(inputExpense))
        }
        window.location.reload()
    }

    useEffect(()=>{
      dispatch(initializeCategories());
  }, [dispatch])

  return (
    <FormModel 
        show={show}
        handleClose={handleClose}
        submitHandler={submitHandler}
        handleInputExpense={handleInputExpense}
        selectedCategories={selectedCategories}
        deleteCategory={deleteCategory}
        handleSelectedCategories={handleSelectedCategories}
        type="expense"
    />
  )
}

export default ExpenseForm