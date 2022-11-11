import React, { useEffect, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import ajax from "../../ajax";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleOpenForm } from "../../features/expense/expenseSlice";
import {
  CategoriesModel,
  ExpenseModel,
  FormTypeModels,
  IncomeModel,
} from "../../models/reduxModels";
import CategoryAddition from "./CategoryAddition";

function FormModel({
  inputExpense,
  submitHandler,
  handleInputExpense,
  type,
  deleteCategory,
  expenseId,
}: FormTypeModels) {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.expense.show);
  const [displayInput, setDisplayInput] = useState<
    CategoriesModel | ExpenseModel | IncomeModel
  >(inputExpense);

  useEffect(() => {
    async function fetchData() {
      if (expenseId !== 0) {
        const axios = await ajax();
        const response = await axios.get(`node/${expenseId}`);
        const resData: ExpenseModel = await response.data;
        setDisplayInput(resData);
      }
    }
    fetchData().catch(console.error);
  }, [expenseId]);

  return (
    <>
      <Button
        variant="dark"
        onClick={() => dispatch(handleOpenForm())}
        type="button"
        style={{
          position: "absolute",
          bottom: "3rem",
          right: "3rem",
          borderRadius: "50%",
        }}
      >
        + 
      </Button>
      <Modal
        show={show}
        onHide={() => dispatch(handleOpenForm())}
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
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}
          >
            <Row className="mb-3">
              <Form.Group className="mb-3">
                <FloatingLabel controlId="titleInput" label="Enter title">
                  <Form.Control
                    required
                    name="title"
                    type="text"
                    placeholder="Enter Title"
                    defaultValue={displayInput.title[0].value}
                    onChange={handleInputExpense}
                    key={displayInput.title[0].value}
                  />
                </FloatingLabel>
              </Form.Group>

              {type !== "categories" &&
                displayInput.field_amount !== undefined &&
                typeof displayInput.field_amount[0].value !== undefined && (
                  <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>$</InputGroup.Text>
                      <FloatingLabel controlId="priceInput" label="Enter Price">
                        <Form.Control
                          required
                          name="field_amount"
                          type="number"
                          placeholder="Enter Price"
                          defaultValue={displayInput.field_amount[0].value}
                          key={displayInput.field_amount[0].value}
                          onChange={handleInputExpense}
                        />
                      </FloatingLabel>
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                )}

              <Form.Group className="mb-3">
                <InputGroup className="mb-3">
                  <FloatingLabel
                    controlId="descriptionInput"
                    label="Enter description"
                  >
                    <Form.Control
                      as="textarea"
                      name="field_description"
                      type="text"
                      defaultValue={displayInput.field_description[0].value}
                      key={displayInput.field_description[0].value}
                      placeholder="Enter Description"
                      onChange={handleInputExpense}
                    />
                  </FloatingLabel>
                </InputGroup>
              </Form.Group>

              {type === "expense" && (
                <CategoryAddition
                  // deleteCategory={deleteCategory}
                  // handleSelectedCategories={handleSelectedCategories}
                  // selectedCategories={selectedCategories}
                  handleInputExpense={handleInputExpense}
                />
              )}

              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  required
                  type="color"
                  name="field_color"
                  title="Choose your color"
                  defaultValue={displayInput.field_color[0].value}
                  key={displayInput.nid && displayInput.nid[0].value}
                  onChange={handleInputExpense}
                />
              </Form.Group>

              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormModel;
