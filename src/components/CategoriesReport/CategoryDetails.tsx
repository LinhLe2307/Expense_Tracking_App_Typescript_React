import { nanoid } from 'nanoid';
import React from 'react'
import { Button, Card, CloseButton } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCategory, handleOpenEditCategory } from '../../features/categories/categoriesSlice';
import { deleteExpenseCategories } from '../../features/expense/expenseSlice';
import CustomDropdown from '../CustomDropdown';

const CategoryDetails = () => {
  const categoriesList = useAppSelector(state => state.categories.inputLists);
  const expenseLists = useAppSelector((state) => state.expense.inputLists);
  const categoriesTitles = categoriesList.map(category => category.title)

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
      console.log(selectedCategory)
      Promise.all([
        dispatch(deleteCategory(findIndex.id)),
        dispatch(deleteExpenseCategories(selectedCategory))
      ])
    }
  }


  return (
    <>
      {
        detailsDiv().map((list, i) => {
        return (
          // <div key={nanoid()}>
          //   {list[0]}{list[1]}
          //     <CloseButton onClick={()=>handleDelete(list[0])}/>
          // </div>
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Header>
              {list[0]}
              <CloseButton onClick={()=>handleDelete(list[0])}/>
            </Card.Header>

        <Card.Body>
          <Card.Title>{list[0]}</Card.Title>
          <Card.Text>
            "Hello"
          </Card.Text>
        </Card.Body>
      </Card>
        )})
      }
    </>
  )
}

export default CategoryDetails