import { Figure } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { detailsDiv } from "../../functions/reusableFunction";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const TopSpending = () => {
  const dispatch = useAppDispatch();
  const categoriesList = useAppSelector((state) => state.categories.inputLists);

  const expenseLists = useAppSelector((state) => state.expense.inputLists);

  const categoriesTitles = detailsDiv(categoriesList, expenseLists).map(list => list[0]);

  const categoriesTransaction = detailsDiv(categoriesList, expenseLists).map(list => list[1])

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: categoriesTitles,
    datasets: [
      {
        label: '# of Votes',
        data: categoriesTransaction,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h4>Top Spending</h4>
      {/* {detailsDiv(categoriesList, expenseLists)
        .map((category, i) => (
          <Figure key={i}>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src="holder.js/171x180"
            />
            <Figure.Caption>{category[0]}</Figure.Caption>
          </Figure>
        ))} */}
      <Doughnut data={data} />
    </div>
  );
};

export default TopSpending;
