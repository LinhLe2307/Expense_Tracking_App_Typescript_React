import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initializeCategories } from "../../features/categories/categoriesSlice";
import {
  addNewExpense,
  editExpense,
  initializeExpense
} from "../../features/expense/expenseSlice";
import { customDate } from "../../functions/reusableFunction";
import { DefaultModel, ExpenseModel } from "../../models/reduxModels";
import SingleCard from "../Card/SingleCard";
import FormModel from "../FormModel";
import TopSpending from "../TopSpending/TopSpending";
import GraphDisplay from "./GraphDisplay";

const Expense = () => {
  const [selectView, setSelectView] = useState("");

  const dispatch = useAppDispatch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const openEditExpense = useAppSelector((state) => state.expense.openEditItem);

  const expenseId = useAppSelector((state) => state.expense.editId);

  const expenseLists = useAppSelector((state) => state.expense.inputLists);

  const categoriesList = useAppSelector((state) => state.categories.inputLists);

  const filterExpense: ExpenseModel[] = expenseLists.filter(
    (expense: ExpenseModel) => expense.date === customDate(new Date())
  );

  const [inputExpense, setInputExpense] = useState<ExpenseModel>({
    date: customDate(new Date()),
    title: "",
    amount: 0,
    description: "",
    categories: selectedCategories,
    color: "",
  });

  const deleteCategory = (deleteItem: string) => {
    setSelectedCategories((prev) =>
      prev.filter((category) => category !== deleteItem)
    );
  };

  const handleSelectedCategories = (category: DefaultModel) => {
    const inputCategory = category.title;
    if (selectedCategories.indexOf(inputCategory) === -1) {
      setSelectedCategories((prev) => prev.concat(category.title));
    }
  };

  const handleInputExpense = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputExpense({
      ...inputExpense,
      [e.target.name]: e.target.value,
      categories: selectedCategories,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!openEditExpense) {
      dispatch(addNewExpense(inputExpense));
    } else {
      dispatch(editExpense(inputExpense));
    }
    // window.location.reload()
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
        €{filterExpense.reduce((prev, curr) => prev + +curr.amount, 0)} spent
        today
      </h1>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Default View
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categoriesList.map((item) => (
            <Dropdown.Item
              eventKey={item.title}
              key={nanoid()}
              onClick={() => setSelectView(item.title)}
            >
              {item.title}
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
              : expense.categories.indexOf(selectView) !== -1;
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
        selectedCategories={selectedCategories}
        deleteCategory={deleteCategory}
        handleSelectedCategories={handleSelectedCategories}
        type="expense"
        baseURL="http://localhost:3010/notes"
      />
    </>
  );
};

export default Expense;
