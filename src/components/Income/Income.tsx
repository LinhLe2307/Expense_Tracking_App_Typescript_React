import { nanoid } from 'nanoid';
import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { initializeCategories } from '../../features/categories/categoriesSlice';
import { addNewIncome, initializeIncome } from '../../features/income/incomeSlice';
import { customDate } from '../../functions/reusableFunction';
import { IncomeModel } from '../../models/reduxModels';
import FormModel from '../FormModel';
import IncomeCard from './IncomeCard';


const Income = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useAppDispatch();

    const incomeList = useAppSelector(state => state.income.inputLists);

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
            incomeList.map(income => <IncomeCard key={nanoid()} income={income}/>)
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

        <FormModel 
            show={show}
            handleClose={handleClose}
            submitHandler={submitHandler}
            handleInputExpense={handleInputExpense}
        />
    </>
    )
}

export default Income