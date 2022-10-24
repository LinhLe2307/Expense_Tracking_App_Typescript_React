import { nanoid } from 'nanoid';
import React from 'react'
import { Card, CloseButton, Dropdown } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCategory, handleOpenEditCategory } from '../../features/categories/categoriesSlice';
import { deleteExpenseCategories } from '../../features/expense/expenseSlice';
import { handleOpenForm } from '../../features/expense/expenseSlice';

const CategoryDetails = () => {
  const categoriesList = useAppSelector(state => state.categories.inputLists);
  const expenseLists = useAppSelector((state) => state.expense.inputLists);
  const categoriesTitles = categoriesList.map(category => category.title);
  

  const dispatch = useAppDispatch()

  const detailsDiv = () => {
    let identity : Record<string, number> = {};
    const transactionList = expenseLists
    .map(expense => expense.categories)
    .map(category => (category))
    .flat(1)
    .reduce((prev, curr)=> {
      if(curr in prev) {
        prev[curr]++
      } else {
        prev[curr] = 1
      }
      return prev
    }, identity)

    const cloneList = {...transactionList};
    categoriesTitles.forEach(category => {
        if(Object.keys(cloneList).indexOf(category) === -1) {
          transactionList[category] = 0 
        }
    })
  
    return Object.entries(transactionList)
  }

  const handleDelete = (selectedItem:string) => {
  
    const findIndex = categoriesList.find(category => category.title.indexOf(selectedItem) !== -1)
    if(findIndex !== undefined && findIndex.id !== undefined) {
      const selectedCategory = expenseLists.map(expense => {
        const newClone = expense.categories.filter(category => category !== selectedItem)
        return {...expense, categories: newClone}
      });
  
      Promise.all([
        dispatch(deleteCategory(findIndex.id)),
        dispatch(deleteExpenseCategories(selectedCategory))
      ])
    }
  }

  const handleEdit = (selectedItem:string) => {
    // const findIndex = categoriesList.find(category => category.title === selectedItem)

    // if(findIndex !== undefined && findIndex.id !== undefined) {  
        console.log(selectedItem)
        selectedItem && dispatch(handleOpenEditCategory(selectedItem))
    // }
  }


  return (
    <>
      {
        detailsDiv().map((list, i) => {
        return (
          <Card border="primary" style={{ width: '18rem' }} key={nanoid()}>
            <Card.Header>
              {list[1]} transaction(s)

            { 
              (typeof list[0] === "string") &&
              // <CloseButton onClick={() => handleDelete(list[0])}/>
              <Dropdown>
                <Dropdown.Toggle 
                    variant="light" 
                    id="dropdown-basic"
                >
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                    <Dropdown.Item
                            onClick={() => handleDelete(list[0])}
                    >
                            Delete
                    </Dropdown.Item>

                    <Dropdown.Item
                        onClick={()=> {
                            handleEdit(list[0]);
                            dispatch(handleOpenForm())
                        }}
                        >
                            Edit
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            }
            </Card.Header>

        <Card.Body>
          <Card.Title>{list[0]}</Card.Title>
          <Card.Text>
            {categoriesList[i]?.description}
          </Card.Text>
        </Card.Body>
      </Card>
        )})
      }
    </>
  )
}

export default CategoryDetails