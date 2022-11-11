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
                  {categoriesList.map((item) => (
                    <Dropdown.Item
                      onClick={() =>
                        handleSelectedCategories(item)
                      }
                      eventKey={item.nid && item.nid[0].value}
                      key={nanoid()}
                    >
                      {item.title[0].value}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            {/* {selectedCategories.map((category) => (
              <div key={category.value}>
                {category}
                <CloseButton onClick={() => deleteCategory(category.value)} />
              </div>
            ))} */}
          </>
        )}
    </>
  );
};

export default CategoryAddition;
