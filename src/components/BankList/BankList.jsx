import { Bank } from "../Bank/Bank"
import "./BankList.scss"

export const BankList = ({ banks }) => {
     
    return (
        <div className="bank_list">
            {banks.map((bankInfo, i) => (
                <Bank key={i} bankId={i} bankInfo={bankInfo} />
            ))}
        </div>
    )
}
