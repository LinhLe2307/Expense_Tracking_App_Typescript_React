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
        <Form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>handleSubmit(e)}>
            <Form.Group className="mb-3"  controlId="formBasicIncome">
                <FloatingLabel
                    controlId="titleInput"
                    label="Type of Income"
                >
                    <Form.Control 
                        required 
                        name="title"
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
                        name="amount"
                        type="number" 
                        placeholder="Enter Income Amount"
                        onChange={handleChange}
                    />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3"  controlId="formBasicIncome">
                <FloatingLabel
                    controlId="titleInput"
                    label="Enter Income Description"
                >
                    <Form.Control 
                        required 
                        name="description"
                        type="text" 
                        placeholder="Enter Income Description"
                        onChange={handleChange}
                    />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control 
                required 
                type="color" 
                name="color" 
                title="Choose your color"
                onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
        <h1>
            Total earn: {
            incomeList.reduce((prev, curr) => {
                return prev + (+curr.amount)
            }, 0)
        }</h1>
        {
            incomeList.map(income => <p key={nanoid()}>{income.title}{income.amount}</p>)
        }
    </>
    )
}

export default Income