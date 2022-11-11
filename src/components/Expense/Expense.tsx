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
import { DefaultModel, ExpenseModel } from "../../models/reduxModels";
import SingleCard from "../Card/SingleCard";
import FormModel from "../FormModel";
import TopSpending from "../TopSpending/TopSpending";
import GraphDisplay from "./GraphDisplay";

const Expense = () => {
  const [selectView, setSelectView] = useState("");

  const dispatch = useAppDispatch();
  // const selectedCategories: { target_id: number }[] = [];
  const [selectedCategories, setSelectedCategories] = useState<
    { target_id: number }[]
  >([]);

  const openEditExpense = useAppSelector((state) => state.expense.openEditItem);

  const expenseId = useAppSelector((state) => state.expense.editId);

  const expenseLists = useAppSelector((state) => state.expense.inputLists);

  const categoriesList = useAppSelector((state) => state.categories.inputLists);

  // const filterExpense: ExpenseModel[] = expenseLists.filter(
  //   (expense: ExpenseModel) => expense.date === customDate(new Date())
  // );

  const [inputExpense, setInputExpense] = useState<ExpenseModel>({
    type: [
      {
        target_id: "expense",
        target_type: "node_type",
      },
    ],
    field_date: [
      {
        value: "2022-11-10T23:22:02+00:00",
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

    field_expense_categories: selectedCategories,
    // color: "",
  });

  const deleteCategory = (deleteItem: number) => {
    setSelectedCategories((prev) => {
      return prev.filter((category) => category.target_id !== deleteItem);
    });
  };

  const handleSelectedCategories = (category: DefaultModel) => {
    const inputCategory = category.nid && category.nid[0].value;
    if (
      selectedCategories.find(
        (category) => category.target_id === inputCategory
      ) === undefined
    ) {
      if (inputCategory) {
        // selectedCategories.push({
        //   target_id: inputCategory,
        // });
        // setSelectedCategories((prev) => {
        //   return [...prev, { target_id: inputCategory }];
        // });
        setSelectedCategories((prev) =>
          prev.concat({ target_id: inputCategory })
        );
      }
    }
    // console.log(selectedCategories);
  };

  const handleInputExpense = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(selectedCategories);
    setInputExpense({
      ...inputExpense,
      field_expense_categories: selectedCategories,
      [e.target.name]: [
        {
          value: e.target.value,
        },
      ],
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
    // setTimeout(() => window.location.reload(), 500);
  };

  useEffect(() => {
    dispatch(initializeCategories());
    dispatch(initializeExpense());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(selectedCategories);
  // }, [selectedCategories]);

  return (
    <>
      <GraphDisplay />
      <TopSpending />
      <h1>
        €
        {expenseLists.reduce(
          (prev, curr) => prev + +curr.field_amount[0].value,
          0
        )}{" "}
        spent today
      </h1>

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
        {expenseLists
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
        selectedCategories={selectedCategories}
        deleteCategory={deleteCategory}
        handleSelectedCategories={handleSelectedCategories}
        type="expense"
      />
    </>
  );
};

export default Expense;
