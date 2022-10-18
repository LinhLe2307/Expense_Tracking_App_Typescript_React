import { nanoid } from 'nanoid';
import React, {useEffect, useState} from 'react'
import { Button, Form, FloatingLabel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewIncome, initializeIncome } from '../../features/income/incomeSlice';
import { IncomeModel } from '../../models/reduxModels';


const Income = () => {
    let navigate = useNavigate();
    const [addIncome, setAddIncome] = useState<IncomeModel>({
        typeIncome: "",
        incomeAmount: 0
    });
    const incomeList = useAppSelector(state => state.income.incomeList);
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
        <Form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>handleSubmit(e)}>
            <Form.Group className="mb-3"  controlId="formBasicIncome">
                <FloatingLabel
                    controlId="titleInput"
                    label="Type of Income"
                >
                    <Form.Control 
                        required 
                        name="typeIncome"
                        type="text" 
                        placeholder="Type of Income"
                        onChange={handleChange}
                    />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3"  controlId="formBasicIncome">
                <FloatingLabel
                    controlId="titleInput"
                    label="Enter Income Amount"
                >
                    <Form.Control 
                        required 
                        name="incomeAmount"
                        type="number" 
                        placeholder="Enter Income Amount"
                        onChange={handleChange}
                    />
                </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
        <h1>
            Total earn: {
            incomeList.reduce((prev, curr) => {
                return prev + (+curr.incomeAmount)
            }, 0)
        }</h1>
        {
            incomeList.map(income => <p key={nanoid()}>{income.typeIncome}{income.incomeAmount}</p>)
        }
    </>
    )
}

export default Income