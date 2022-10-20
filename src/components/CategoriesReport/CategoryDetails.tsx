import React from 'react'
import { useAppSelector } from '../../app/hooks';

const CategoryDetails = () => {
  const categoriesList = useAppSelector(state => state.categories.inputLists);
  const expenseLists = useAppSelector((state) => state.expense.inputLists);
  const categoriesTitles = categoriesList.map(category => category.title)

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
  
  
  const detailsDiv = () => {

    const cloneList = {...transactionList};
    categoriesTitles.forEach(category => {
        if(Object.keys(cloneList).indexOf(category) === -1) {
          transactionList[category] = 0 
        }
    })
  
    return Object.entries(transactionList).map((list, i) => <div key={i}>{list[0]}{list[1]}</div>)

  }
  return (
    <>
      {
        detailsDiv()
      }
    </>
  )
}

export default CategoryDetails