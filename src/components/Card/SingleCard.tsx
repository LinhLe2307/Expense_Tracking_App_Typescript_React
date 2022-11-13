import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import {
  deleteExpense,
  handleOpenEditExpense,
} from "../../features/expense/expenseSlice";
import { customDate } from "../../functions/reusableFunction";
import { ExpenseModel } from "../../models/reduxModels";
import CustomDropdown from "./CustomDropdown";

interface MyProps {
  expense: ExpenseModel;
}

const SingleCard = ({ expense }: MyProps) => {
  return (
    <>
      <Card className="mb-2" style={{ width: "40rem" }}>
        <Card.Body
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "3rem",
            }}
          >
            <Link
              to={`${expense.nid && expense.nid[0].value}`}
              state={{ expenseDetails: expense }}
            >
              {/* <div
                style={{
                  backgroundColor: `${expense.color}`,
                  width: "5rem",
                  height: "5rem",
                }}
              ></div> */}
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1664574653790-cee0e10a4242?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                style={{
                  width: "250px",
                }}
              />
            </Link>
            <div>
              <Card.Title>{expense.title[0].value}</Card.Title>
              <Card.Title>-€{expense.field_amount[0].value}</Card.Title>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                {expense.new_expense_categories?.map((category) => (
                  <Button
                    variant="primary"
                    key={category}
                    style={{ margin: "0.25rem" }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "3rem",
            }}
          >
            {/* <Card.Text>{expense.field_description[0].value}</Card.Text> */}

            {expense.nid && expense.nid[0].value && (
              <CustomDropdown
                deleteItem={deleteExpense}
                handleOpenEditItem={handleOpenEditExpense}
                itemId={expense.nid[0].value}
              />
            )}
          </div>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            {customDate(new Date(expense.field_date[0].value.slice(0, 10)))}
          </small>
        </Card.Footer>
      </Card>
    </>
  );
};

export default SingleCard;
