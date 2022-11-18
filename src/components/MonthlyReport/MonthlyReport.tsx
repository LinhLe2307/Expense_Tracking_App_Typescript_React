import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Calendar } from "react-calendar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addNewCategory,
  editCategoryContent,
  initializeCategories,
} from "../../features/categories/categoriesSlice";
import {
  handleOpenForm,
  initializeExpense,
} from "../../features/expense/expenseSlice";
import { customDate } from "../../functions/reusableFunction";
import { DefaultModel, ExpenseModel } from "../../models/reduxModels";
import CategoryDetails from "./CategoryDetails";
import CategoriesReport from "./CategoryDetails";
import FormModel from "../Form/FormModel";

const MonthlyReport = () => {
  const dispatch = useAppDispatch();
  const [value, onChange] = useState(new Date());
  const [isClicking, setIsClicking] = useState(false);
  const [spendingBudget, setSpendingBudget] = useState(0);
  const openEditCategory = useAppSelector(
    (state) => state.categories.openEditItem
  );
  const expenseId = useAppSelector((state) => state.categories.editId);
  const expenseLists = useAppSelector((state) => state.expense.inputLists);
  const [monthlyExpense, setMonthlyExpense] = useState<ExpenseModel[]>([]);

  const [inputCategory, setInputCategory] = useState<DefaultModel>({
    type: [
      {
        target_id: "categories",
        target_type: "node_type",
      },
    ],
    field_date: [
      {
        value: "2022-11-18T23:22:02+00:00",
      },
    ],
    title: [
      {
        value: "",
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

  const handleInputCategory = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputCategory({
      ...inputCategory,
      [e.target.name]: [
        {
          value: e.target.value,
        },
      ],
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!openEditCategory) {
      dispatch(addNewCategory(inputCategory));
    } else {
      dispatch(editCategoryContent(inputCategory));
    }
    setTimeout(() => window.location.reload(), 500);
  };

  const handleClick = (
    value: Date,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const selectedMonth = month[value.getMonth()];
    const newList = expenseLists.filter((expense) =>
      customDate(new Date(expense.field_date[0].value.slice(0, 10))).includes(
        selectedMonth
      )
    );
    const budget = newList.reduce(
      (prev, curr) => prev + +curr.field_amount[0].value,
      0
    );
    setMonthlyExpense(newList);
    setSpendingBudget(budget);
    setIsClicking(true);
  };

  useEffect(() => {
    dispatch(initializeExpense());
    dispatch(initializeCategories());
  }, [dispatch]);

  return (
    <>
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          onClickMonth={(value, event) => handleClick(value, event)}
          view="year"
        />
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
        {isClicking ? (
          <>
            <h3>Spending Budget: €{spendingBudget}</h3>
            <CategoryDetails filterExpenseList={monthlyExpense} />
          </>
        ) : (
          <>
            <h3>All</h3>
            <CategoryDetails filterExpenseList={expenseLists} />
          </>
        )}
      </div>
      <FormModel
        inputExpense={inputCategory}
        expenseId={expenseId}
        submitHandler={submitHandler}
        handleInputExpense={handleInputCategory}
        type="categories"
      />
    </>
  );
};

export default MonthlyReport;