import React from 'react'
import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { Dropdown } from 'react-bootstrap';
import { useAppDispatch } from '../app/hooks';
import { ExpenseModel } from '../models/reduxModels';
import { handleOpenForm } from '../features/expense/expenseSlice';
interface Action {
    action: {
        payload:number,
        type:string
    }
}

interface MyProps {
    deleteItem:(itemId: number)=> AnyAction,
    handleOpenEditItem:(itemId:number)=>AnyAction,
    itemId: number,
}

const CustomDropdown = ({deleteItem, handleOpenEditItem, itemId}:MyProps) => {
    const dispatch = useAppDispatch();
    return (
        <>
        {
            (typeof itemId === "number") &&
            <Dropdown>
                <Dropdown.Toggle 
                    variant="light" 
                    id="dropdown-basic"
                >
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                    <Dropdown.Item
                            onClick={()=> {
                                dispatch(deleteItem(itemId))
                    }}
                    >
                            Delete
                    </Dropdown.Item>

                    <Dropdown.Item
                        onClick={()=> {
                            dispatch(handleOpenEditItem(itemId));
                            dispatch(handleOpenForm())
                        }}
                        >
                            Edit
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
    }
    </>
  )
}

export default CustomDropdown