import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { ExpenseModel } from '../../models/reduxModels';

interface MyProps {
  expense: ExpenseModel
}
 
const SingleCard = ({expense}: MyProps) => {

  return (
    <Card>
        <Card.Body>
            <div style={{backgroundColor: `${expense.color}`, width: "5rem", height: "5rem"}}></div>
            <Card.Title>Title {expense.title}</Card.Title>
            <Card.Text>Price {expense.price}</Card.Text>
            <Card.Text>id {expense.id}</Card.Text>
            <Button>...</Button>
        </Card.Body>
    </Card>
  )
}

export default SingleCard