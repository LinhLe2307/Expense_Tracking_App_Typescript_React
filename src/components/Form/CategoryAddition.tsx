import { Form } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { CategoryExpense } from "../../models/reduxModels";

const CategoryAddition = ({
  handleInputExpense,
}: CategoryExpense) => {
  const categoriesList = useAppSelector((state) => state.categories.inputLists);
  return (
    <>
      {categoriesList !== undefined && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Categories</Form.Label>
            {categoriesList.map((item) => (
              <div key={item.nid && item.nid[0].value}>
                <input
                  type="checkbox"
                  name="field_expense_categories"
                  value={`${item.nid && item.nid[0].value}`}
                  onChange={handleInputExpense}
                  id={`${item.nid && item.nid[0].value}`}
                />
                <label htmlFor={`${item.nid && item.nid[0].value}`}>
                  {item.title[0].value}
                </label>
              </div>
            ))}
          </Form.Group>
        </>
      )}
    </>
  );
};

export default CategoryAddition;
