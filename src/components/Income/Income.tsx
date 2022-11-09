import { nanoid } from 'nanoid';
import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { initializeCategories } from '../../features/categories/categoriesSlice';
import { handleOpenForm } from '../../features/expense/expenseSlice';
import { addNewIncome, editIncome, initializeIncome } from '../../features/income/incomeSlice';
import { customDate } from '../../functions/reusableFunction';
import { IncomeModel } from '../../models/reduxModels';
import FormModel from '../FormModel';
import IncomeCard from './IncomeCard';


const Income = () => {
    const dispatch = useAppDispatch();
    const openEditIncome = useAppSelector((state) => state.income.openEditItem);

    const expenseId = useAppSelector((state) => state.income.editId);

    const incomeList = useAppSelector(state => state.income.inputLists);

    const [inputExpense, setInputExpense] = useState<IncomeModel>({
        date: customDate(new Date()),
        title: "",
        amount: 0,
        description: "", 
        color: ""
    });

    const handleInputIncome = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setInputExpense({
            ...inputExpense,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        if(!openEditIncome) {
            dispatch(addNewIncome(inputExpense)) 
        } else {
            dispatch(editIncome(inputExpense))
        }
        // window.location.reload()
        setTimeout (() => window.location.reload(), 500);
    }

    useEffect(()=>{
        dispatch(initializeIncome());
        dispatch(initializeCategories());
    }, [dispatch])

  return (
    <>
        <h1>
            Total earn: {
            incomeList.reduce((prev, curr) => {
                return prev + (+curr.amount)
            }, 0)
        }</h1>

        {
            incomeList.map(income => <IncomeCard 
                key={nanoid()} 
                income={income}
            />)
        }

        <FormModel 
            type="income"
            inputExpense={inputExpense}
            expenseId={expenseId}
            submitHandler={submitHandler}
            handleInputExpense={handleInputIncome}
            baseURL="http://localhost:3010/income"
        />
    </>
    )
}

export default Income