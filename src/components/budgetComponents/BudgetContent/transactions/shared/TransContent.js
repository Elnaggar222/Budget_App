import SingleTrans from "./SingleTrans"
import {transactionsContext} from "services/context/budgetContext/TransactionContext"
import {CategoriesContext} from "services/context/budgetContext/CategoriesContext"
import { useContext } from "react"
const TransContent = () => {

    const { filteredData:transactions , loading , error } = useContext(transactionsContext)
    const { data: categories, loading: catLoading , error: catError } = useContext(CategoriesContext)

    return (
        <div className="trans_content">

            {(!loading && !catLoading && !error && transactions.length && categories.length) ? (
                <>
                    {transactions.map( transaction => (
                        <SingleTrans transaction={transaction} key={transaction.id} />
                    ))}
                </>
            ) : (<></>)
            }

            {(loading || catLoading )&&(
                <p className="loading"> Loading.... </p>
            )}
            
            {(error || catError) && (
                <p className="data-error"> {error} </p>
            )}
            {!loading && !error && transactions && !transactions.length && (
                <p className="no-data"> No data </p>
            )}
        </div>
    )
}

export default TransContent