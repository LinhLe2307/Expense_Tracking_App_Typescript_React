import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface MyProps {
  handleAddExpense: () => void,
  handleInputExpense: (e: React.ChangeEvent<HTMLInputElement>) => void
  addSubmitHandler: (e: React.FormEvent<HTMLFormElement>)=>void
}

function ExpenseCard ({handleAddExpense, handleInputExpense, addSubmitHandler}:MyProps ){
  return (
    <Card>
      <Card.Body>
        <Card.Title>Add Expense</Card.Title>
        <form onSubmit={addSubmitHandler}>
          <div>
            <label>Title</label>
            <input required name="title" type="text" onChange={handleInputExpense}/>
          </div>
          <div>
            <label>Price</label>
            <input required name="price"  type="text" onChange={handleInputExpense}/>
          </div>
          <div>
            <label>Categories</label>
          </div>
          <div>
            <label>Color</label>
            <input required type="color" name="color" onChange={handleInputExpense}/>
          </div>
          <Button variant="primary" onClick={handleAddExpense} type="submit">Save</Button>
        </form>
      </Card.Body>
      </Card>
  )
}

export default ExpenseCard