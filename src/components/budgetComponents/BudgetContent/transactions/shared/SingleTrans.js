import { Button } from "components/UI"
import { CurrencyDollar , PencilLine , Trash } from "phosphor-react"
import { transactionsContext } from "services/context/budgetContext/TransactionContext"
import {CategoriesContext} from "services/context/budgetContext/CategoriesContext"
import {useContext, useMemo} from "react"
import { useState } from "react"
import {Modal} from "components/UI"
import BudgetForm from "components/budgetComponents/BudgetForm/BudgetForm"
const SingleTrans = ({ transaction }) => {
    const { handleDelete } =  useContext(transactionsContext)
    const { data:categories} = useContext(CategoriesContext)
    const [showModal , setShowModal] = useState(false)

    const currentCategory = useMemo(() => { // (use memo) means (currentCategory) is a returned value not a function 
        // eslint-disable-next-line eqeqeq
        const eleCategory = categories.find(cat => cat.id == transaction.category)
        if(eleCategory && eleCategory.name){
            return eleCategory.name
        }else{
            return ''
        }
    },[transaction,categories])

    return (
        <div className="trans_item">
            
            <div className={`trans_item-icon ${transaction.type === 'expanse'?'error':''} `}>
                <CurrencyDollar />
            </div>
            <div className="trans_item-data">
                <h4> {transaction.title} </h4>
                <div>
                    <small> ${transaction.amount} </small>,
                    <small> {transaction.date} </small>,
                    <small> {currentCategory} </small>
                </div>
            </div>
            <div className="trans_item-action">
                <Button icon onClick={()=>setShowModal(true)}>
                    <PencilLine />
                </Button>

                <Button icon={true} type="error" onClick={()=>handleDelete(transaction.id)} >
                    <Trash />
                </Button>
            </div>

            <Modal visible={showModal} closeModal={()=>setShowModal(false)}>
                <BudgetForm  closeModal={()=>setShowModal(false)} defaultData={transaction} />
            </Modal>

        </div>
    )
}

export default SingleTrans