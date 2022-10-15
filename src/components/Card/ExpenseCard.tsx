import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

type MyProps = {
  handleAddExpense: () => void
}

function ExpenseCard ({handleAddExpense}:MyProps ){
  return (
    <Card>
      <Card.Body>
        <Card.Title>Add Expense</Card.Title>
        <div>
          <label>Title</label>
          <input />
        </div>
        <div>
          <label>Price</label>
          <input />
        </div>
        <div>
          <label>Categories</label>
          <div>

          </div>
        </div>
        <div>
          <label>Color</label>
          <input type="color"/>
        </div>
        <Button variant="primary" onClick={handleAddExpense}>Save</Button>
      </Card.Body></Card>
  )
}

export default ExpenseCard