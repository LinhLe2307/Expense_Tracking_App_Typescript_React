import React from "react";
import { nanoid } from "nanoid";
import { CloseButton, Dropdown, Form } from "react-bootstrap";
import { CategoryExpense } from "../../models/reduxModels";
import { useAppSelector } from "../../app/hooks";

const CategoryAddition = ({
  selectedCategories,
  handleSelectedCategories,
  deleteCategory,
}: CategoryExpense) => {
  const categoriesList = useAppSelector((state) => state.categories.inputLists);
  return (
    <>
      {categoriesList !== undefined &&
        handleSelectedCategories !== undefined &&
        deleteCategory !== undefined &&
        selectedCategories !== undefined && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Categories</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Choose category
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {categoriesList.map((item, i) => (
                    <Dropdown.Item
                      onClick={() => handleSelectedCategories(item)}
                      eventKey={item.nid && item.nid[0].value}
                      // eventKey={item.nid && item.nid[0].value}
                      // eventKey={i}
                      key={nanoid()}
                    >
                      {item.title[0].value}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            {selectedCategories.map((category) => (
              <div key={category.target_id}>
                {category.target_id}
                <CloseButton
                  onClick={() => deleteCategory(category.target_id)}
                />
              </div>
            ))}
          </>
        )}
    </>
  );
};

export default CategoryAddition;
