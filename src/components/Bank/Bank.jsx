import './Bank.scss'

export const Bank = ({ bankId, bankInfo }) => {
    const { name, counts } = bankInfo

    return (
        <div className="bank">
            <span>{name}</span>
            {counts.map((count, i) => (
                <span key={i}>{count.startMount} {count.coin} ultimo Mes</span>
            ))}
        </div>
    )
}
