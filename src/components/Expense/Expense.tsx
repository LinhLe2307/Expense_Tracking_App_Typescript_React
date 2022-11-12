import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initializeCategories } from "../../features/categories/categoriesSlice";
import {
  addNewExpense,
  editExpense,
  initializeExpense,
} from "../../features/expense/expenseSlice";
import { customDate } from "../../functions/reusableFunction";
import { ExpenseModel } from "../../models/reduxModels";
import SingleCard from "../Card/SingleCard";
import FormModel from "../Form/FormModel";
import TopSpending from "../TopSpending/TopSpending";
import GraphDisplay from "./GraphDisplay";

const Expense = () => {
  const [selectView, setSelectView] = useState("");

  const dispatch = useAppDispatch();
  const openEditExpense = useAppSelector((state) => state.expense.openEditItem);

  const expenseId = useAppSelector((state) => state.expense.editId);

  const expenseLists = useAppSelector((state) => state.expense.inputLists);

  const categoriesList = useAppSelector((state) => state.categories.inputLists);

  const filterExpense: ExpenseModel[] = expenseLists.filter(
    (expense: ExpenseModel) => {
      const newDate = new Date(expense.field_date[0].value.slice(0, 10));
      return customDate(newDate) === customDate(new Date());
    }
  );

  const [inputExpense, setInputExpense] = useState<ExpenseModel>({
    type: [
      {
        target_id: "expense",
        target_type: "node_type",
      },
    ],
    field_expense_categories: [],
    field_date: [
      {
        value: "2022-11-12T23:22:02+00:00",
        // value: new Date().format("Y-m-dTH:i:sP"),
      },
    ],
    title: [
      {
        value: "",
      },
    ],
    field_amount: [
      {
        value: 0,
      },
    ],
    field_description: [
      {
        value: "",
      },
    ],
    field_color: [
      {
        value: "",
      },
    ],
  });

  const handleInputExpense = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { field_expense_categories } = inputExpense;
    const { checked, value, name } = e.target;

    if (checked) {
      console.log(`${value} is ${checked}`);
      setInputExpense((prev) => ({
        ...prev,
        [name]: [
          {
            value: value,
          },
        ],
        field_expense_categories: [
          ...field_expense_categories,
          {
            target_id: +value,
            target_type: "node",
          },
        ],
      }));
    } else {
      setInputExpense((prev) => ({
        ...prev,
        [name]: [
          {
            value: value,
          },
        ],
        field_expense_categories: field_expense_categories.filter(
          (category) => category.target_id !== +value
        ),
      }));
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!openEditExpense) {
      dispatch(addNewExpense(inputExpense));
    } else {
      dispatch(editExpense(inputExpense));
    }

    setTimeout(() => window.location.reload(), 500);
  };

  useEffect(() => {
    dispatch(initializeCategories());
    dispatch(initializeExpense());
  }, [dispatch]);

  return (
    <>
      <GraphDisplay />
      <TopSpending />
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {filterExpense
          .filter((expense: ExpenseModel) => {
            return selectView === ""
              ? expense
              : expense.new_expense_categories &&
                  expense.new_expense_categories.find(
                    (category) => category === selectView
                  ) !== undefined;
          })
          .map((expense: ExpenseModel) => (
            <SingleCard expense={expense} key={nanoid()} />
          ))}
      </div>
      <FormModel
        inputExpense={inputExpense}
        expenseId={expenseId}
        submitHandler={submitHandler}
        handleInputExpense={handleInputExpense}
        type="expense"
      />
    </>
  );
};

export default Expense;
