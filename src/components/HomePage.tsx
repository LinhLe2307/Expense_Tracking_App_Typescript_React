import { useEffect, useState } from "react";

import Expense from "./Expense/Expense";
import { initializeExpense } from "../features/expense/expenseSlice";
import GraphDisplay from "./Expense/GraphDisplay";
import TopSpending from "./TopSpending/TopSpending";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const HomePage = () => {
  const categoriesList = useAppSelector((state) => state.categories.inputLists);

  const expenseLists = useAppSelector((state) => state.expense.inputLists);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeExpense());
  }, [dispatch]);

  return (
    <div>
      <TopSpending
        categoriesList={categoriesList}
        expenseLists={expenseLists}
      />
      <Link to="/history">All</Link>
      <Expense categoriesList={categoriesList} expenseLists={expenseLists} />
    </div>
  );
};

export default HomePage;
