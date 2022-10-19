import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import React, { useState } from "react";
import { useAppDispatch } from '../../app/hooks';
import { addNewCategory } from '../../features/categories/categoriesSlice';
import {CategoriesModel} from "../../models/reduxModels";
import { Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'

interface MyProps {
  handleClose: ()=>void,
  show:boolean
}

function MonthlyForm ({handleClose, show }: MyProps){

    const dispatch = useAppDispatch()

    const [inputCategory, setInputCategory] = useState<CategoriesModel>({
        title: "",
        description: "", 
        color: ""
    });

    const handleInputExpense = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setInputCategory({
            ...inputCategory,
            [e.target.name] : e.target.value
        })
    }


    const submitHandler = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        dispatch(addNewCategory(inputCategory))
        window.location.reload()
    }

  return (
    <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}>
                <Row className="mb-3">
                <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="titleInput"
                    label="Enter Category"
                >
                    <Form.Control 
                    required 
                    name="title" 
                    type="text" 
                    placeholder="Enter Category"
                    onChange={handleInputExpense}/>
                </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                <InputGroup className="mb-3">
                    <FloatingLabel
                    controlId="descriptionInput"
                    label="Enter Description"
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

export default MonthlyForm