import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Button, FloatingLabel, InputGroup, Modal, Row, Form } from 'react-bootstrap'
import { useAppSelector } from '../app/hooks';
import { customDate } from '../functions/reusableFunction';
import { CategoriesModel, ExpenseModel, FormTypeModels, IncomeModel } from '../models/reduxModels'
import CategoryAddition from './Card/CategoryAddition';


function FormModel({
    inputExpense,
    show, 
    handleClose,
    submitHandler,
    handleInputExpense,
    handleSelectedCategories,
    type,
    selectedCategories,
    deleteCategory,
    baseURL, 
    expenseId
}:FormTypeModels) {
    const [displayInput, setDisplayInput] = useState<CategoriesModel | ExpenseModel | IncomeModel>(inputExpense);

    useEffect(() => {
        async function fetchData () {
            const response = await axios.get(`${baseURL}/${expenseId}`)
            
            // console.log(response.data)
            const resData:ExpenseModel = await response.data;
            setDisplayInput(resData);

            console.log(displayInput) 
        }
            
        fetchData().catch(console.error)

    }, [expenseId, baseURL])

  return (
    <>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
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

            {/* <Button variant="primary" type="button" onClick={() =>{
                closeForm();
                handleClose()
            }
            }>Close</Button> */}
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