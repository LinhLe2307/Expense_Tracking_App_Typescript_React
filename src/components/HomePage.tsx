import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { initializeExpense } from "../features/expense/expenseSlice";
import Expense from "./Expense/Expense";
import TopSpending from "./TopSpending/TopSpending";

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
      <Link to="/history/daily-report">All</Link>
      <Expense categoriesList={categoriesList} expenseLists={expenseLists} />
    </div>
  );
};

export default HomePage;
