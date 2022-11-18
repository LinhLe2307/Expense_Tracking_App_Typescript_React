import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { detailsDiv } from "../../functions/reusableFunction";
import { CategoriesModel, ExpenseModel } from "../../models/reduxModels";

interface MyProps {
  categoriesList: CategoriesModel[];
  expenseLists: ExpenseModel[];
}
const TopSpending = ({ categoriesList, expenseLists }: MyProps) => {
  const categoriesTitles = detailsDiv(categoriesList, expenseLists).map(
    (list) => list[0]
  );

  const categoriesTransaction = detailsDiv(categoriesList, expenseLists).map(
    (list) => list[1]
  );

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: categoriesTitles,
    datasets: [
      {
        label: "# of Votes",
        data: categoriesTransaction,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
      <Doughnut
        data={data}
        width={500}
        height={500}
        options={{ maintainAspectRatio: false, responsive: false }}
      />
    </div>
  );
};

export default TopSpending;
