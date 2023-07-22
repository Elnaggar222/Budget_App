import TransContent from "./shared/TransContent"
import TransHeader from "./shared/TransHeader"
import "./Transactions.css"
const Transactions = () => {
    return (
        <section className="trans">
            <TransHeader />
            <TransContent />
        </section>
    )
}

export default Transactions