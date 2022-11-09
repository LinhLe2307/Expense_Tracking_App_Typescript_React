import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Button, FloatingLabel, InputGroup, Modal, Row, Form, CloseButton } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleOpenForm } from '../features/expense/expenseSlice';
import { customDate } from '../functions/reusableFunction';
import { CategoriesModel, ExpenseModel, FormTypeModels, IncomeModel } from '../models/reduxModels'
import CategoryAddition from './Card/CategoryAddition';


function FormModel({
    inputExpense,
    submitHandler,
    handleInputExpense,
    handleSelectedCategories,
    type,
    selectedCategories,
    deleteCategory,
    baseURL, 
    expenseId,
}:FormTypeModels) {

    const dispatch = useAppDispatch();
    const show = useAppSelector(state => state.expense.show)
    const [displayInput, setDisplayInput] = useState<CategoriesModel | ExpenseModel | IncomeModel>(inputExpense);

    useEffect(() => {
        
        async function fetchData () {
            if(expenseId !== 0) {
                const response = await axios.get(`${baseURL}/${expenseId}`)
                const resData:ExpenseModel = await response.data;
                setDisplayInput(resData);
            }
                
        }
        fetchData().catch(console.error)

    }, [expenseId, baseURL])

  return (
    <>
    <Button 
            variant="dark" 
            onClick={()=>dispatch(handleOpenForm())} 
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
    <Modal
        show={show}
        onHide={()=>dispatch(handleOpenForm())}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
            {/* <CloseButton 
                onClick={() =>{
                    onCloseForm();
                    handleClose()
                }}
            /> */}
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}>
            <Row className="mb-3">
            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="titleInput"
                    label="Enter title"
                >
                <Form.Control 
                    required 
                    name="title" 
                    type="text" 
                    placeholder="Enter Title"
                    defaultValue={displayInput.title}
                    key={displayInput.title}
                    onChange={handleInputExpense}/>
                </FloatingLabel>
            </Form.Group>

            {
                type !== "categories" && 
                typeof displayInput.amount !== undefined &&
                <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                    <FloatingLabel
                        controlId="priceInput"
                        label="Enter Price"
                    >
                    <Form.Control 
                        required 
                        name="amount"  
                        type="number" 
                        placeholder="Enter Price"
                        defaultValue={displayInput.amount}
                        key={displayInput.amount}
                        onChange={handleInputExpense}/>
                    </FloatingLabel>
                    <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            }

            <Form.Group className="mb-3">
                <InputGroup className="mb-3">
                    <FloatingLabel
                    controlId="descriptionInput"
                    label="Enter description"
                    >
                    <Form.Control 
                    as="textarea"
                    name="description"  
                    type="text" 
                    defaultValue={displayInput.description}
                    key={displayInput.description}
                    placeholder="Enter Description"
                    onChange={handleInputExpense}/>
                </FloatingLabel>
                </InputGroup>
            </Form.Group>

            {
                type === "expense" &&
                <CategoryAddition 
                    deleteCategory={deleteCategory}
                    handleSelectedCategories={handleSelectedCategories}
                    selectedCategories={selectedCategories}
                />
            }

            <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control 
                    required 
                    type="color" 
                    name="color" 
                    title="Choose your color"
                    defaultValue={displayInput.color}
                    key={displayInput.color}
                    onChange={handleInputExpense}/>
                </Form.Group>

            <Modal.Footer>

            <Button variant="primary" type="submit">Submit</Button>
            </Modal.Footer>
            </Row>
            </Form>
        </Modal.Body>
        </Modal>
    </>
  )
}

export default FormModel