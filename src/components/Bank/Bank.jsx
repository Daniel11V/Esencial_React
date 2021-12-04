import { Link } from 'react-router-dom'
import './Bank.scss'

export const Bank = ({ bankId, bankInfo, bankTotal }) => {
    const { name, counts } = bankInfo

    return (
        <Link to={`/bank/${bankId}`} className="bank">
            <span>{name}</span>
            {counts.map((count, i) => (
                <span key={i}>{bankTotal[count.coin]} {count.coin}</span>
            ))}
        </Link>
    )
}
