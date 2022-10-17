import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState } from "react";
import { useAppDispatch } from '../../app/hooks';
import { addNewExpense, editExpense, deleteExpense } from '../../features/expense/expenseSlice';
import {ExpenseModel} from "../../models/reduxModels";
import { Container, Dropdown, Form, Navbar, NavDropdown } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'

import Nav from 'react-bootstrap/Nav';

interface MyProps {
  typeForm: string,
  handleClose: ()=>void,
  show:boolean
}

function ExpenseForm ({typeForm, handleClose, show }: MyProps){
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const dispatch = useAppDispatch()

    const [inputExpense, setInputExpense] = useState<ExpenseModel>({
        title: "",
        price: 0,
        color: ""
    })

    const handleInputExpense = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setInputExpense({
            ...inputExpense,
            [e.target.name] : e.target.value
        })
    }

    const handleSelectedCategories = (category: string) => {
      setSelectedCategories(prev => prev.concat(category))
    }
    const submitHandler = (e: React.FormEvent<HTMLFormElement>, typeForm: string):void => {
        e.preventDefault();
        if(typeForm === "add") {
          dispatch(addNewExpense(inputExpense))
        } else {
          dispatch(editExpense(inputExpense))
        }
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
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => submitHandler(e, typeForm)}>
             <Row className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                required 
                name="title" 
                type="text" 
                placeholder="Please input title"
                onChange={handleInputExpense}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control 
                required 
                name="price"  
                type="number" 
                placeholder="Enter Price"
                onChange={handleInputExpense}/>
              <InputGroup.Text>.00</InputGroup.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categories</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {["Communication", "Education", "Accomodation", "Fuel"]
                .map(item => <Dropdown.Item onClick={()=> handleSelectedCategories(item)}>{item}</Dropdown.Item>)} 
                </Dropdown.Menu>
              </Dropdown>
              {/* <ButtonGroup aria-label="Basic example">
                {["Communication", "Education", "Accomodation", "Fuel"]
                .map(item => <Button variant="secondary" key={item}>{item}</Button>)} 
              </ButtonGroup>               */}
            </Form.Group>
              {selectedCategories.map(category => category)}
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control 
                required 
                type="color" 
                name="color" 
                title="Choose your color"
                defaultValue="#563d7c"
                onChange={handleInputExpense}/>
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose} type="button">
                Close
              </Button>
              <Button variant="primary" type="submit">Submit</Button>
            </Modal.Footer>
            </Row>
          </Form>
            {
              typeForm === "edit" 
              ? <Button variant="secondary" onClick={()=>dispatch(deleteExpense())} type="button">
                Delete
              </Button>
              : ""
            }  
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ExpenseForm