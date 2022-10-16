import Card from 'react-bootstrap/Card';


interface MyProps {
    expense: {
    title: string,
    price: number,
    color: string
}
}

const SingleCard = ({expense}: MyProps) => {
  return (
    <Card>
        <Card.Body>
            <Card.Title>Title {expense.title}</Card.Title>
            <Card.Text>Price {expense.price}</Card.Text>
        </Card.Body>
    </Card>
  )
}

export default SingleCard