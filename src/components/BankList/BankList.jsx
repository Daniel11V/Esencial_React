import { useSelector } from 'react-redux'
import { Bank } from "../Bank/Bank"
import "./BankList.scss"

export const BankList = () => {
    const { banks, banksTotal } = useSelector(state => state.money)

    return (
        <div className="bank_list">
            {banks.map((bankInfo, i) => (
                <Bank key={i} bankId={i} bankInfo={bankInfo} bankTotal={banksTotal[bankInfo.name]} />
            ))}
        </div>
    )
}
