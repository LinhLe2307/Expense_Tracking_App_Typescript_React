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
            <div style={{backgroundColor: `${expense.color}`, width: "5rem", height: "5rem"}}></div>
            <Card.Title>Title {expense.title}</Card.Title>
            <Card.Text>Price {expense.price}</Card.Text>
        </Card.Body>
    </Card>
  )
}

export default SingleCard