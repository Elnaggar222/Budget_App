
const BudgetNumbers = (props) => {
    return (
        <div className="Box">
            <div className="Icon">
                {props.children}
            </div>
            <div className="moneyAndTitle">
                <div>{props.money}</div>
                <small>{props.title}</small>
            </div>
        </div>
    )
}

export default BudgetNumbers