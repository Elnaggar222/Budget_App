import { createContext, useCallback, useEffect, useReducer, useRef } from "react";
import {GetCategories } from "services/apis/categories.api";

export const CategoriesContext = createContext();

const initialstate = {
    data: [],
    loading: true,
    error: null
}

const ReducerFunc = (state,action) => {

    switch(action.type){

        case 'FETCH_START':
            return {...state, loading: true, error: null};
        case 'FETCH_SUCCESS':
            return  {...state, loading: false, data: action.payload}; 
        case 'FETCH_ERROR':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

export const CategoriesProvider = ({ children }) => {

    const [state,dispatch] = useReducer(ReducerFunc,initialstate)
    const isMount = useRef(false)

    const fetchData = useCallback( async () => {
        dispatch({type:'FETCH_START'})
        try {
            const mydata = await GetCategories()
            dispatch({type:'FETCH_SUCCESS' ,payload:mydata})
        } catch (error) {
            dispatch({type:'FETCH_ERROR' ,payload:error.message})
        }
    },[])

    useEffect(()=>{
        if(!isMount.current){
            fetchData()
            isMount.current = true
        }
    },[fetchData])

    
    return (
        <CategoriesContext.Provider value={{...state}}  >
            {children}
        </CategoriesContext.Provider>
    )
}