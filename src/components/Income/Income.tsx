import { nanoid } from 'nanoid';
import React, {useEffect, useState} from 'react'
import { Button, Form, FloatingLabel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewIncome, initializeIncome } from '../../features/income/incomeSlice';
import { customDate } from '../../functions/reusableFunction';
import { IncomeModel } from '../../models/reduxModels';
import IncomeCard from './IncomeCard';
import IncomeForm from './IncomeForm';


const Income = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addIncome, setAddIncome] = useState<IncomeModel>({
        date: customDate(new Date()),
        title: "",
        description: "",
        color: "",
        amount: 0
    });
    const incomeList = useAppSelector(state => state.income.inputLists);
    const dispatch= useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setAddIncome({
            ...addIncome,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addNewIncome(addIncome));
    }

    useEffect(()=>{
        dispatch(initializeIncome());
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

        <IncomeForm 
            handleClose={handleClose}
            show={show}
        />
    </>
    )
}

export default Income