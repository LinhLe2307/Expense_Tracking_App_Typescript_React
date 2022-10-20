import React, { useState } from "react";
import { useAppDispatch } from '../../app/hooks';
import { addNewCategory } from '../../features/categories/categoriesSlice';
import {DefaultModel} from "../../models/reduxModels";
import { customDate } from '../../functions/reusableFunction';
import FormModel from '../FormModel';

interface MyProps {
  handleClose: ()=>void,
  show:boolean
}

function MonthlyForm ({handleClose, show }: MyProps){

    const dispatch = useAppDispatch()

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
        dispatch(addNewCategory(inputCategory))
        window.location.reload()
    }

  return (
    <FormModel 
        show={show}
        handleClose={handleClose}
        submitHandler={submitHandler}
        handleInputExpense={handleInputExpense}
        type="categories"
    />
    )
}

export default MonthlyForm