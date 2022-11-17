import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initializeCategories } from "../../features/categories/categoriesSlice";
import {
  addNewIncome,
  editIncome,
  initializeIncome,
} from "../../features/income/incomeSlice";
import { IncomeModel } from "../../models/reduxModels";
import FormModel from "../Form/FormModel";
import IncomeCard from "./IncomeCard";

const Income = () => {
  const dispatch = useAppDispatch();
  const openEditIncome = useAppSelector((state) => state.income.openEditItem);

  const expenseId = useAppSelector((state) => state.income.editId);

  const incomeList = useAppSelector((state) => state.income.inputLists);

  const [inputIncome, setInputIncome] = useState<IncomeModel>({
    type: [
      {
        target_id: "income",
        target_type: "node_type",
      },
    ],
    field_date: [
      {
        value: "2022-11-17T23:22:02+00:00",
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

  const handleInputIncome = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputIncome({
      ...inputIncome,
      [e.target.name]: [
        {
          value: e.target.value,
        },
      ],
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!openEditIncome) {
      dispatch(addNewIncome(inputIncome));
    } else {
      dispatch(editIncome(inputIncome));
    }
    setTimeout(() => window.location.reload(), 500);
  };

  useEffect(() => {
    dispatch(initializeIncome());
    dispatch(initializeCategories());
  }, [dispatch]);

  return (
    <>
      <h1>
        Total earn:{" "}
        {incomeList.reduce((prev, curr) => {
          return prev + +curr.field_amount[0].value;
        }, 0)}
      </h1>

      {incomeList.map((income) => (
        <IncomeCard key={nanoid()} income={income} />
      ))}

      <FormModel
        type="income"
        inputExpense={inputIncome}
        expenseId={expenseId}
        submitHandler={submitHandler}
        handleInputExpense={handleInputIncome}
      />
    </>
  );
};

export default Income;
