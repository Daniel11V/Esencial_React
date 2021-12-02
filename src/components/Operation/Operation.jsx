import './Operation.scss'

export const Operation = ({ operInfo }) => {
    const { myBank, coin, otherName, isPasive, mount, description, date } = operInfo

    return (
        <div className="oper">
            <span>{myBank}</span>
            <span>{isPasive?'-':'+'}{mount}{' ' + coin}</span>
            <span>{isPasive?'para ':'desde '}{otherName}{description&&', ' + description}, {new Date(date).toLocaleString()}</span>
        </div>
    )
}
