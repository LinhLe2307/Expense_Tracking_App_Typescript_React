import ProgressBar from "react-bootstrap/ProgressBar";
import { useAppSelector } from "../../app/hooks";

const GraphDisplay = () => {
  const expenseLists = useAppSelector((state) => state.expense.inputLists);

  const incomeList = useAppSelector((state) => state.income.inputLists);

  const totalExpense = expenseLists.reduce(
    (prev, curr) => prev + curr.field_amount[0].value,
    0
  );

  const totalIncome = expenseLists.reduce(
    (prev, curr) => prev + curr.field_amount[0].value,
    0
  );

  return (
    <div>
      <ProgressBar animated now={(totalExpense * 100) / totalIncome} />
      <ProgressBar animated now={totalIncome} />
    </div>
  );
};

export default GraphDisplay;
