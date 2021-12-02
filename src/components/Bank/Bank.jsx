import './Bank.scss'

export const Bank = ({ bankInfo, bankTotal }) => {
    const { name, counts } = bankInfo

    return (
        <div className="bank">
            <span>{name}</span>
            {counts.map((count, i) => (
                <span key={i}>{bankTotal[count.coin]} {count.coin}</span>
            ))}
        </div>
    )
}
