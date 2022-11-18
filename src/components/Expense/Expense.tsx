import { nanoid } from "nanoid";
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleOpenForm } from "../../features/expense/expenseSlice";
import { customDate } from "../../functions/reusableFunction";
import { ExpenseModel } from "../../models/reduxModels";
import ExpenseInfo from "../DailyReport/ExpenseInfo";

const Expense = () => {
  const [selectView, setSelectView] = useState("");

  const dispatch = useAppDispatch();
  const expenseLists = useAppSelector((state) => state.expense.inputLists);

  const categoriesList = useAppSelector((state) => state.categories.inputLists);

  const filterExpense: ExpenseModel[] = expenseLists.filter(
    (expense: ExpenseModel) => {
      const newDate = new Date(expense.field_date[0].value.slice(0, 10));
      return customDate(newDate) === customDate(new Date());
    }
  );

  return (
    <>
      <h1>
        €
        {filterExpense.reduce(
          (prev, curr) => prev + +curr.field_amount[0].value,
          0
        )}{" "}
        spent today
      </h1>
      <h4>{customDate(new Date())}</h4>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Default View
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categoriesList.map((item) => (
            <Dropdown.Item
              eventKey={item.title[0].value}
              key={nanoid()}
              onClick={() => setSelectView(item.title[0].value)}
            >
              {item.title[0].value}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Button onClick={() => setSelectView("")}>Reset</Button>

      <h3>{selectView === "" ? "All" : selectView}</h3>
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
      <ExpenseInfo expenseLists={filterExpense} />
    </>
  );
};

export default Expense;
