import React, {useEffect, useState} from 'react'
import { Button, Form, FloatingLabel } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewIncome, initializeIncome } from '../../features/income/incomeSlice';

interface MyProps {
    addIncome : number
}

const Income = () => {
    const [addIncome, setAddIncome] = useState<number>(0);
    const totalIncome = useAppSelector(state => state.income.totalIncome);
    const dispatch= useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        console.log(typeof Number(e.target.value))
        setAddIncome(Number(e.target.value))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addNewIncome(addIncome))
    }

    useEffect(()=>{
        initializeIncome();
    }, [dispatch])

  return (
    <>
        <h3>{totalIncome}</h3>
        <Form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>handleSubmit(e)}>
            <Form.Group className="mb-3"  controlId="formBasicIncome">
                <FloatingLabel
                    controlId="titleInput"
                    label="Enter Income"
                >
                    <Form.Control 
                        required 
                        type="number" 
                        placeholder="Enter Income"
                        onChange={handleChange}
                    />
                </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </>
    )
}

export default Income