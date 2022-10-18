import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewExpense, editExpense } from '../../features/expense/expenseSlice';
import {ExpenseModel} from "../../models/reduxModels";
import { Dropdown, Form } from 'react-bootstrap';
import {CategoriesModel} from "../../models/reduxModels";
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'
import CloseButton from 'react-bootstrap/CloseButton';
import { initializeCategories, addNewTransaction } from '../../features/categories/categoriesSlice';

interface MyProps {
  typeForm: string,
  handleClose: ()=>void,
  show:boolean
}

function ExpenseForm ({typeForm, handleClose, show }: MyProps){
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const categoriesList = useAppSelector(state => state.categories.categoriesList)

    const dispatch = useAppDispatch()

    const [inputExpense, setInputExpense] = useState<ExpenseModel>({
        title: "",
        price: 0,
        description: "", 
        categories: [],
        color: ""
    });

    const deleteCategory = (deleteItem: string) => {
      setSelectedCategories(prev => prev.filter(category => category !== deleteItem))
    }

    const handleSelectedCategories = (category: CategoriesModel) => {
      const inputCategory = category.categoryTitle;
      if(selectedCategories.indexOf(inputCategory) === -1) {
        setSelectedCategories(prev => prev.concat(category.categoryTitle))
      }
    }

    const handleInputExpense = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setInputExpense({
            ...inputExpense,
            [e.target.name] : e.target.value,
            categories: selectedCategories
        })
    }


    const submitHandler = (e: React.FormEvent<HTMLFormElement>, typeForm: string):void => {
        e.preventDefault();
        if(typeForm === "add") {
          dispatch(addNewExpense(inputExpense))
          
        } else {
          dispatch(editExpense(inputExpense))
        }

        dispatch(addNewTransaction(
        {
          selectedCategories: selectedCategories,
          inputPrice: inputExpense.price,
        }
        ));
        
        window.location.reload()
    }

    useEffect(()=>{
      dispatch(initializeCategories());
  }, [dispatch])

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
          <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e, typeForm)}>
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
                    placeholder="Enter Price"
                    onChange={handleInputExpense}/>
                </FloatingLabel>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categories</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Choose category
                </Dropdown.Toggle>

                <Dropdown.Menu >
                  {categoriesList
                    .map(item => (
                        <Dropdown.Item 
                          onClick={()=> handleSelectedCategories(item)}
                          eventKey={item.categoryTitle}
                          key={item.categoryTitle}
                        >
                          {item.categoryTitle}
                        </Dropdown.Item>
                  ))} 
                  </Dropdown.Menu>
                
              </Dropdown>
            </Form.Group>
            
            {selectedCategories.map((category) => 
              <div key={category}>{category}
                <CloseButton 
                  onClick={()=>deleteCategory(category)}
                />
              </div>
            )}

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

export default ExpenseForm