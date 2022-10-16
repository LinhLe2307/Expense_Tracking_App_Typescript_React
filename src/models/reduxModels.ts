export interface ExpenseModel {
    title: string,
    price: number,
    color: string,
    id?: number
}

export interface ExpenseArrayModel {
    expenseLists: ExpenseModel[],
    openAddExpense: boolean,
    openEditExpense: boolean
}
