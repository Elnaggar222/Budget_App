import { useContext, useState } from "react"
import { CategoriesContext } from "services/context/budgetContext/CategoriesContext"
import { transactionsContext } from "services/context/budgetContext/TransactionContext"

const TransHeader = () => {
    const { data:catData } = useContext(CategoriesContext)
    const [inputs,setInputs] = useState({
        keys: '',
        category: '',
        type: ''
    })

    const { handleFilters } = useContext(transactionsContext)
    const handlechange = (e)=> {

        let f = {...inputs,[e.target.name]:e.target.value}
        setInputs(f)
        handleFilters(f)

        // setInputs( d => {
            // return {...d,[e.target.name]:e.target.value}

        // })
    }
    console.log(inputs)
    return (
        <div className="trans_header">

            <h3 className="trans_header_title">
                Recent Transacitons
            </h3>

            <div className="trans_header_filters">

                <select className="filters-select" name="keys" value={inputs.keys} onChange={handlechange}>
                    <option value=""> Sort By </option>
                    <option value="date"> Date</option>
                    <option value="amount"> Amount </option>
                </select>

                <select className="filters-select" name="category" value={inputs.category} onChange={handlechange}>
                    <option value=""> Categories </option>
                    {catData && catData.map(cat => ( 
                        <option key={cat.id} value={cat.id}> {cat.name} </option>
                    ))}
                </select>

                <select className="filters-select" name="type" value={inputs.type} onChange={handlechange}>
                    <option value=""> All </option>
                    <option value="income"> Income </option>
                    <option value="expanse"> Expanse </option>
                </select>


            </div>
        </div>
    )
}

export default TransHeader