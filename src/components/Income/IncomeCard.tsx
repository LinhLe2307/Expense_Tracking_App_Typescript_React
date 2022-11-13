import { Card } from "react-bootstrap";
import {
  deleteIncome,
  handleOpenEditIncome,
} from "../../features/income/incomeSlice";
import { customDate } from "../../functions/reusableFunction";
import { IncomeModel } from "../../models/reduxModels";
import CustomDropdown from "../Card/CustomDropdown";

interface MyProps {
  income: IncomeModel;
}

const IncomeCard = ({ income }: MyProps) => {
  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Header>
        {customDate(new Date(income.field_date[0].value.slice(0, 10)))}
        {income.nid && income.nid[0].value && (
          <CustomDropdown
            deleteItem={deleteIncome}
            handleOpenEditItem={handleOpenEditIncome}
            itemId={income.nid[0].value}
          />
        )}
      </Card.Header>
      <Card.Body>
        <Card.Title>{income.title[0].value}</Card.Title>
        <Card.Text>{income.field_description[0].value}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default IncomeCard;
