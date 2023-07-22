import { Tabs , Tab } from "components/UI"
import DougnutChart from "components/UI/DougnutChart/DougnutChart"
import { useContext, useMemo } from "react"
import { CategoriesContext } from "services/context/budgetContext/CategoriesContext"
import { transactionsContext } from "services/context/budgetContext/TransactionContext"
import "./BudgetContent.css"
import Transactions from "./transactions/Transactions"


const incomeColors = [
    "#557B83",
    "#82954B",
    "#A2D5AB",
    "#E5EFC1",
    "#85C88A",
    "#0d5235",
    "#82A284",
    "#BABD42",
]

const expanseColors = [
    "#4C0033",
    "#790252",
    "#AF0171",
    "#E80F88",
    "#513252",
    "#7A4069",
    "#CA4E79",
    "#FFC18E",
]

const BudgetContent = () => {

    const { data:transactions } = useContext(transactionsContext)
    const { data:categories } = useContext(CategoriesContext)

    const chartData = useMemo( () => {
        const theChartData = { income:null , expanse:null }
        if(transactions && transactions.length && categories && categories.length){
            theChartData.income = {}
            theChartData.expanse = {}
            transactions.forEach(d => {
                let catgName = categories.find(c => c.id == d.category).name
                if(d.type === 'income'){
                    if(theChartData.income[catgName]){
                        theChartData.income[catgName]+= +d.amount
                    }else{
                        theChartData.income[catgName]= +d.amount
                    }
                }else{
                    if(theChartData.expanse[catgName]){
                        theChartData.expanse[catgName]+= +d.amount
                    }else{
                        theChartData.expanse[catgName]= +d.amount
                    }
                }
            });
        }

        return theChartData

    },[transactions,categories])

    console.log(chartData)
    
    return (
        <div className="budget_content">
            <div className="container">

                <Tabs defaultTab={1}>

                    <Tab title="data">
                        <Transactions />
                    </Tab>

                    <Tab title="income">
                        <DougnutChart usedData={chartData.income} colors={incomeColors} />
                    </Tab>

                    <Tab title="expanses">
                        <DougnutChart usedData={chartData.expanse} colors={expanseColors} />
                    </Tab>

                </Tabs>

            </div>
        </div>
    )
}

export default BudgetContent