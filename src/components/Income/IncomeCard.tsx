import { Card } from "react-bootstrap";
import {
  deleteIncome,
  handleOpenEditIncome
} from "../../features/income/incomeSlice";
import { IncomeModel } from "../../models/reduxModels";
import CustomDropdown from "../Card/CustomDropdown";

interface MyProps {
  income: IncomeModel;
}

const IncomeCard = ({ income }: MyProps) => {
  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Header>
        {income.field_date[0].value}
        {income.id && (
          <CustomDropdown
            deleteItem={deleteIncome}
            handleOpenEditItem={handleOpenEditIncome}
            itemId={income.id}
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
