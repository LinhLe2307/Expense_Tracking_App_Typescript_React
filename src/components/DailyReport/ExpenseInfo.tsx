import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initializeCategories } from "../../features/categories/categoriesSlice";
import {
  addNewExpense,
  editExpense,
  initializeExpense,
} from "../../features/expense/expenseSlice";
import { ExpenseModel } from "../../models/reduxModels";
import SingleCard from "../Card/SingleCard";
import FormModel from "../Form/FormModel";

interface MyProps {
  expenseLists: ExpenseModel[];
}

const ExpenseInfo = ({ expenseLists }: MyProps) => {
  const expenseId = useAppSelector((state) => state.expense.editId);
  const openEditExpense = useAppSelector((state) => state.expense.openEditItem);

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
        value: "2022-11-18T23:22:02+00:00",
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

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeCategories());
    dispatch(initializeExpense());
  }, [dispatch]);
  return (
    <>
      {expenseLists.map((expense) => (
        <SingleCard expense={expense} key={nanoid()} />
      ))}
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

export default ExpenseInfo;
