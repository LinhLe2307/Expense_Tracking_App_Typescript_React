import { nanoid } from 'nanoid';
import React from 'react'
import { CloseButton } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCategory } from '../../features/categories/categoriesSlice';

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
    console.log(selectedItem)
    console.log(categoriesList)
    const findIndex = categoriesList.find(category => category.title.indexOf(selectedItem) !== -1)
    console.log(findIndex)
    if(findIndex !== undefined && findIndex.id !== undefined) {
      dispatch(deleteCategory(findIndex.id))
    }
  }


  return (
    <>
      {
        detailsDiv().map((list, i) => {
        return (
          <div key={nanoid()}>
            {list[0]}{list[1]}
              <CloseButton onClick={()=>handleDelete(list[0])}/>
          </div>
        )})
      }
    </>
  )
}

export default CategoryDetails