import React from 'react'
import { Button, FloatingLabel, InputGroup, Modal, Row, Form } from 'react-bootstrap'
import { FormTypeModels } from '../models/reduxModels'
import CategoryAddition from './Card/CategoryAddition'

function FormModel({
    show, 
    handleClose,
    submitHandler,
    handleInputExpense,
    handleSelectedCategories,
    type,
    selectedCategories,
    deleteCategory,
}:FormTypeModels) {
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
                    onChange={handleInputExpense}/>
                </FloatingLabel>
            </Form.Group>

            {
                type !== "categories" && 
                <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                    <FloatingLabel
                        controlId="priceInput"
                        label="Enter Price"
                    >
                    <Form.Control 
                        required 
                        name="price"  
                        type="number" 
                        placeholder="Enter Price"
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