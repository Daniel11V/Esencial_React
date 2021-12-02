import './Operation.scss'

export const Operation = ({ operId, operInfo }) => {
    const { myBank, coin, otherName, type, mount, description, date } = operInfo
    const isPasive = (type.localeCompare("Pasivo")===0)

    return (
        <div className="oper">
            <span>{myBank}</span>
            <span>{isPasive?'-':'+'}{mount}{' ' + coin}</span>
            <span>{isPasive?'para ':'desde '}{otherName}{description&&', ' + description}, {new Date(date).toLocaleString()}</span>
        </div>
    )
}
