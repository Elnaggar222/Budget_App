import "./BudgetForm.css"
import {Button} from "components/UI"
import { useContext, useState ,useEffect } from "react"
import { CategoriesContext } from "services/context/budgetContext/CategoriesContext"
import { EditTransaction, PostTransaction } from "services/apis/transactions.api"
import { transactionsContext } from "services/context/budgetContext/TransactionContext"

let initialState = {
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: ""
}

const BudgetForm = ( { closeModal , defaultData} ) => {

    if(defaultData){
        initialState = {...defaultData};
        delete initialState.id
    }

    useEffect(() => {

        if(!defaultData){
            setFormData({
                title: "",
                amount: "",
                type: "income",
                category: "",
                date: ""
            })
        }
    },[])

    const [loading,setLoading] = useState(false)
    const { fetchData } = useContext(transactionsContext)

    const [formData,setFormData] = useState(initialState)

    const { data:categories , loading:catLoading }  = useContext(CategoriesContext)

    const [validation,setValidation] = useState({
        allValid : false,
        allTouched : false,
        data:{
            title:{isvalid:false,error:null,touched:false},
            amount:{isvalid:false,error:null,touched:false},
            type:{isvalid:true,error:null,touched:false},
            category:{isvalid:false,error:null,touched:false},
            date:{isvalid:false,error:null,touched:false},
        }
    })

    const handleChange = (e) => {
        setValidation(d => {
            d.data[e.target.name].error = null
            return d
        })
        setFormData(data => {
            return {...data,[e.target.name]:e.target.value}
        })
    }

    const handleValidation = (touchedKey) => {
        let Vdata = {...validation}
        Vdata.allValid = true
        Vdata.allTouched = true
        Object.keys(formData).forEach(key => {
            let isvalid = true
            let error = null
            // console.log(Vdata.data[key].touched)
            let touched = Vdata.data[key].touched
            // Start Validation
            if(touchedKey === key){
                touched = true 
            }
            if(!formData[key].trim){
                isvalid = false
                error = 'Field is required!'
            }
            if(key === 'amount' && formData[key] && formData[key] <= 0){
                isvalid = false
                error = 'Please add a number bigger than zero'
            }
            if(!touched){
                error = null
                Vdata.allTouched = false
            }
            if(!isvalid){
                Vdata.allValid = false
            }
            Vdata.data[key] = {isvalid,error,touched}
        })

        setValidation(Vdata)
    }


    const handleBlur = (e) => {
        handleValidation(e.target.name)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            if(defaultData){
                await EditTransaction(defaultData.id,formData)
            }else{
                await PostTransaction(formData)
            }
            fetchData()
            closeModal()
            setLoading(false)
            
        } catch (error) {
            console.log(error.message)
            setLoading(false)
        }

    }

    console.log(defaultData)
    return (
        <div className="new-budget">

            <h2> {defaultData ? 'Edit':'Add new'} Budget</h2>

            <form className="form" onSubmit={handleSubmit}>


                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className={`${validation.data.title.error && "error"}`}
                        placeholder="title..."
                        value={formData.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    {validation.data.title.error &&(  
                        <p className="error">{validation.data.title.error}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        className={`${validation.data.amount.error && "error"}`}
                        placeholder="amount..."
                        value={formData.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    {validation.data.amount.error &&(  
                        <p className="error">{validation.data.amount.error}</p>
                    )}
                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select id="type" name="type" value={formData.type} 
                        className={`${validation.data.type.error && "error"}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        >
                            <option value="income">Income</option>
                            <option value="expanse">Expanse</option>
                        </select>
                        {validation.data.type.error &&(  
                            <p className="error">{validation.data.type.error}</p>
                        )}
                    </div>

                    {catLoading ? <p>Loading</p> :(

                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" value={formData.category}
                            className={`${validation.data.category.error && "error"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {validation.data.category.error &&(  
                                <p className="error">{validation.data.category.error}</p>
                            )}
                        </div>

                        )}
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${validation.data.date.error && "error"}`}
                        />
                    {validation.data.date.error &&(  
                        <p className="error">{validation.data.date.error}</p>
                    )}
                </div>

                <Button size="large" block disabled={(!validation.allValid) || loading}>
                    {defaultData ? 'Edit':'save'}
                </Button>
            </form>
        </div>
    )
}

export default BudgetForm