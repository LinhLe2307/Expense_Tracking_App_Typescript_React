import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


interface MyProps {
    expense: {
    title: string,
    price: number,
    color: string
  }, 
  handleEditExpense: ()=>void
}

const SingleCard = ({expense, handleEditExpense}: MyProps) => {

  return (
    <Card>
        <Card.Body>
            <div style={{backgroundColor: `${expense.color}`, width: "5rem", height: "5rem"}}></div>
            <Card.Title>Title {expense.title}</Card.Title>
            <Card.Text>Price {expense.price}</Card.Text>
            <Button onClick={handleEditExpense}>...</Button>
        </Card.Body>
    </Card>
  )
}

export default SingleCard