import MainLayout from "Layout/MainLayout"
import Hero from 'components/budgetComponents/Hero/Hero'
import BudgetContent from "components/budgetComponents/BudgetContent/BudgetContent"
const BudgetPage = () => {
    return (
        <MainLayout>
            <Hero />
            <BudgetContent />
        </MainLayout>
    )
}

export default BudgetPage