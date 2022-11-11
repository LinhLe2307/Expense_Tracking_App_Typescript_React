import { nanoid } from "nanoid";
import { Card, Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  handleOpenEditCategory,
  deleteCategory,
} from "../../features/categories/categoriesSlice";
import { handleOpenForm } from "../../features/expense/expenseSlice";
import { CategoriesModel } from "../../models/reduxModels";

import { detailsDiv } from "../../functions/reusableFunction";
import { ExpenseModel } from "../../models/reduxModels";
interface MyProps {
  filterExpenseList: ExpenseModel[];
}

const CategoryDetails = ({ filterExpenseList }: MyProps) => {
  const categoriesList = useAppSelector((state) => state.categories.inputLists);

  const dispatch = useAppDispatch();

  const handleDelete = (selectedItem: string) => {
    const findIndex = categoriesList.find(
      (category) => category.title[0].value.indexOf(selectedItem) !== -1
    );
    if (window.confirm("Do you want to delete this?")) {
      if (findIndex !== undefined) {
        findIndex.nid && dispatch(deleteCategory(findIndex.nid[0].value));
      }
    }
    setTimeout(() => window.location.reload(), 500);
  };

  const handleEdit = (selectedItem: string) => {
    selectedItem && dispatch(handleOpenEditCategory(selectedItem));
    // }
  };

  return (
    <>
      {detailsDiv(categoriesList, filterExpenseList).map((list, i) => {
        return (
          <Card border="primary" style={{ width: "18rem" }} key={nanoid()}>
            <Card.Header>
              {list[1]} transaction(s)
              {typeof list[0] === "string" && (
                // <CloseButton onClick={() => handleDelete(list[0])}/>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDelete(list[0])}>
                      Delete
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        handleEdit(list[0]);
                        dispatch(handleOpenForm());
                      }}
                    >
                      Edit
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Card.Header>

            <Card.Body>
              <Card.Title>{list[0]}</Card.Title>
              <Card.Text>
                {categoriesList
                  .filter(
                    (cate: CategoriesModel) => cate.title[0].value === list[0]
                  )
                  .map((cate, i) => (
                    <p key={i}>{cate.field_description[0].value}</p>
                  ))}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default CategoryDetails;
