export interface DefaultModel {
    date: string;
    title: string,
    description: string,
    color: string,
    id?: number
}

export interface ExpenseModel extends DefaultModel {
    price: number,
    categories: string[],
}
export interface IncomeModel extends DefaultModel {
    amount: number, 
}
export interface ExpenseArrayModel<T> {
    inputLists: T[],
    openEditItem: boolean,
    editId: number
}


export interface CategoryExpense {
    handleSelectedCategories?: (category: DefaultModel)=>void,
    deleteCategory?:(deleteItem: string)=>void,
    selectedCategories?: string[]
}

export interface FormTypeModels extends CategoryExpense {
    show: boolean, 
    handleClose:()=>void,
    submitHandler:(e: React.FormEvent<HTMLFormElement>, typeForm?:string)=>void,
    handleInputExpense:(e: React.ChangeEvent<HTMLInputElement>)=>void,
    type?:string,
}