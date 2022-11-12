import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initializeExpense } from "../../features/expense/expenseSlice";
import { customDate } from "../../functions/reusableFunction";
import { ExpenseModel } from "../../models/reduxModels";
import SingleCard from "../Card/SingleCard";

const DailyReport = () => {
  const [value, onChange] = useState(new Date());
  const expenseLists = useAppSelector((state) => state.expense.inputLists);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeExpense());
  }, [dispatch]);

  return (
    <div>
      <Calendar onChange={onChange} value={value} showDoubleView={true} />
      <h3>{customDate(value)}</h3>
      {expenseLists
        .filter(
          (expense: ExpenseModel) =>
            customDate(new Date(expense.field_date[0].value.slice(0, 10))) ===
            customDate(value)
        )
        .map((expense: ExpenseModel) => (
          <SingleCard expense={expense} key={nanoid()} />
        ))}
    </div>
  );
};

export default DailyReport;
