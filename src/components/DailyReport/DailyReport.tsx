import { useState } from "react";
import { Button } from "react-bootstrap";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleOpenForm } from "../../features/expense/expenseSlice";
import { customDate } from "../../functions/reusableFunction";
import { ExpenseModel } from "../../models/reduxModels";
import ExpenseInfo from "./ExpenseInfo";

const DailyReport = () => {
  const [value, onChange] = useState(new Date());
  const dispatch = useAppDispatch();
  const expenseLists = useAppSelector((state) => state.expense.inputLists);

  const filterExpense = expenseLists.filter(
    (expense: ExpenseModel) =>
      customDate(new Date(expense.field_date[0].value.slice(0, 10))) ===
      customDate(value)
  );

  return (
    <div>
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
      <Calendar onChange={onChange} value={value} showDoubleView={true} />
      <h3>{customDate(value)}</h3>
      <ExpenseInfo expenseLists={filterExpense} />
    </div>
  );
};

export default DailyReport;
