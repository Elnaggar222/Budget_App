import { createContext, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { DeleteTransaction, GetTransactions } from "services/apis/transactions.api";

export const transactionsContext = createContext();

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

export const TransactionProvider = ({ children }) => {

    const [ filters , setFilters] = useState({
        keys: null,
        category: null,
        type: null
    })

    const [state,dispatch] = useReducer(ReducerFunc,initialstate)
    const isMount = useRef(false)

    const fetchData = useCallback( async () => {
        dispatch({type:'FETCH_START'})
        try {
            const mydata = await GetTransactions()
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

    const handleDelete = async (id) => {
        try {
            dispatch({type:'FETCH_START'})
            await DeleteTransaction(id)
            fetchData()
            // dispatch({type:'STOP_LOADING'})
        } catch (error) {
            dispatch({type:'FETCH_ERROR' ,payload:error.message})
        }
    }

    const handleFilters = (f) => {
        setFilters(f)
    }

    const filteredData = useMemo( ()=> {
        let data = [...state.data]

        if(!data || !data.length){
            return []
        }
        if(filters.keys && filters.keys === 'date'){
            data = data.sort( (a,b) => {
                const aDate = new Date(a.date).getTime()
                const bDate = new Date(b.date).getTime()
                return bDate - aDate
            })
        }
        if(filters.keys && filters.keys === 'amount'){
            data = data.sort( (a,b) => {
                return a.amount - b.amount
            })
        }
        if(filters.keys && filters.keys === 'amount'){
            data = data.sort( (a,b) => {
                return b.amount - a.amount
            })
        }
        if(filters.category){
            // eslint-disable-next-line eqeqeq
            data = data.filter( d => d.category == filters.category )
        }
        if(filters.type){
            data = data.filter( d => d.type === filters.type )
        }

        return data
    },[state.data,filters])


    const computedValues = useMemo(() => {

        let income = 0
        let expanse = 0

        if(state.data && state.data.length){
            state.data.forEach( d => {
                if(d.type === "income"){
                    income += +d.amount
                }else{
                    expanse += +d.amount
                }
            })
        }

        return { income , expanse , total:income-expanse }


    },[state.data])
    console.log(computedValues)

    return (
        <transactionsContext.Provider value={{...state , handleDelete , fetchData , handleFilters,filteredData,computedValues}}  >
            {children}
        </transactionsContext.Provider>
    )
}