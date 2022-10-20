import React, { useState, useEffect } from "react";
import { useAppDispatch } from '../../app/hooks';
import { IncomeModel} from "../../models/reduxModels";
import { initializeCategories } from '../../features/categories/categoriesSlice';
import { customDate } from "../../functions/reusableFunction";
import { addNewIncome } from "../../features/income/incomeSlice";
import FormModel from "../FormModel";

interface MyProps {
  handleClose: ()=>void,
  show:boolean
}

function IncomeForm ({ handleClose, show }: MyProps){
    const dispatch = useAppDispatch()

    const [inputExpense, setInputExpense] = useState<IncomeModel>({
        date: customDate(new Date()),
        title: "",
        amount: 0,
        description: "", 
        color: ""
    });

    const handleInputExpense = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setInputExpense({
            ...inputExpense,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        
        dispatch(addNewIncome(inputExpense)) 
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
    />
  )
}

export default IncomeForm