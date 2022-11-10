import { nanoid } from "nanoid";
import { Card, Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteCategory,
  handleOpenEditCategory,
} from "../../features/categories/categoriesSlice";
import {
  deleteExpenseCategories,
  handleOpenForm,
} from "../../features/expense/expenseSlice";
import { CategoriesModel } from "../../models/reduxModels";

import { detailsDiv } from "../../functions/reusableFunction";
import { ExpenseModel } from "../../models/reduxModels";
interface MyProps {
  filterExpenseList: ExpenseModel[];
}

const CategoryDetails = ({ filterExpenseList }: MyProps) => {
  const categoriesList = useAppSelector((state) => state.categories.inputLists);
  const expenseLists = useAppSelector((state) => state.expense.inputLists);

  const dispatch = useAppDispatch();

  // const handleDelete = (selectedItem: [{ value: string }]) => {
  //   const findIndex = categoriesList.find(
  //     (category) => category.title.indexOf(selectedItem[0].value) !== -1
  //   );
  //   if (findIndex !== undefined && findIndex.id !== undefined) {
  //     const selectedCategory = expenseLists.map((expense) => {
  //       const newClone = expense.categories.filter(
  //         (category) => category !== selectedItem[0].value
  //       );
  //       return { ...expense, categories: newClone };
  //     });

  //     Promise.all([
  //       dispatch(deleteCategory(findIndex.id)),
  //       dispatch(deleteExpenseCategories(selectedCategory)),
  //     ]);
  //   }
  // };

  const handleEdit = (selectedItem: string) => {
    // const findIndex = categoriesList.find(category => category.title === selectedItem)

    // if(findIndex !== undefined && findIndex.id !== undefined) {
    console.log(selectedItem);
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
                    <Dropdown.Item
                    // onClick={() => handleDelete(list[0])}
                    >
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
                  .map((cate) => (
                    <p>{cate.field_description}</p>
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
