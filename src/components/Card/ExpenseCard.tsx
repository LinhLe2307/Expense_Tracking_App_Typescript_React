import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface MyProps {
  handleAddExpense: () => void,
  handleInputExpense: (e:React.ChangeEvent<HTMLFormElement>) => void
}

function ExpenseCard ({handleAddExpense, handleInputExpense}:MyProps ){
  return (
    <Card>
      <Card.Body>
        <Card.Title>Add Expense</Card.Title>
        <form onSubmit={handleInputExpense}>
          <div>
            <label>Title</label>
            <input name="title"/>
          </div>
          <div>
            <label>Price</label>
            <input name="price"/>
          </div>
          <div>
            <label>Categories</label>
            <div>

            </div>
          </div>
          <div>
            <label>Color</label>
            <input type="color" name="color"/>
          </div>
          <Button variant="primary" onClick={handleAddExpense} type="submit">Save</Button>
        </form>
      </Card.Body>
      </Card>
  )
}

export default ExpenseCard