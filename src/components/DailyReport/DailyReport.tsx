import { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppSelector } from "../../app/hooks";
import { customDate } from "../../functions/reusableFunction";
import { ExpenseModel } from "../../models/reduxModels";
import ExpenseInfo from "./ExpenseInfo";

const DailyReport = ({}) => {
  const [value, onChange] = useState(new Date());
  const expenseLists = useAppSelector((state) => state.expense.inputLists);

  const filterExpense = expenseLists.filter(
    (expense: ExpenseModel) =>
      customDate(new Date(expense.field_date[0].value.slice(0, 10))) ===
      customDate(value)
  );

  return (
    <div>
      <Calendar onChange={onChange} value={value} showDoubleView={true} />
      <h3>{customDate(value)}</h3>
      <ExpenseInfo expenseLists={filterExpense} />
    </div>
  );
};

export default DailyReport;
