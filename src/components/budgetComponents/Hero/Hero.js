import BudgetNumbers from "components/budgetComponents/Hero/BudgetNumbers"
import "./hero.css"
import { Coins , Wallet , CreditCard } from "phosphor-react"
import { transactionsContext } from "services/context/budgetContext/TransactionContext"
import { useContext } from "react"
const Hero = () => {
    const {computedValues} = useContext(transactionsContext)

    // console.log(computedValues)
    return (
        <div className="hero_budget">
            <div className="hero_imgs">
                <img src="https://unsplash.it/1200/400" alt="random img 1200*400" />
            </div>
            <div className="container">
                <div className="AllBoxes">
                    <BudgetNumbers money={computedValues.total} title="total money"> 
                        <Coins weight="duotone" />
                    </BudgetNumbers>
                    <BudgetNumbers money={computedValues.income} title="total income"> 
                        <Wallet weight="duotone" />
                    </BudgetNumbers>
                    <BudgetNumbers money={computedValues.expanse} title="total expanse"> 
                        <CreditCard weight="duotone" />
                    </BudgetNumbers>
                </div>
            </div>
        </div>
    )
}

export default Hero