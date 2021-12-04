import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { OperationList } from '../OperationList/OperationList'
import './BankDetails.scss'

export const BankDetails = () => {
    const { bankId = 0 } = useParams()

    const bankInfo = useSelector(state => state.money.banks[bankId])
    const { name, counts = [{coin: 'ARS'}] } = bankInfo
    
    const bankTotal = useSelector(state => state.money.banksTotal[name])
    
    const bankOperations = useSelector(state => state.money.operations.filter(oper => (oper.myBank === name || oper.otherName === name)))
    
    const [currentCoin, setCurrentCoin] = useState(counts[0].coin)

    const navigate = useNavigate();

    return (
        <div className="bankDet">
            <div className="bankDet__header" onClick={()=>navigate(-1)}>
                <i className="material-icons" >chevron_left</i>
                <h4>{name}</h4>
            </div>
            {counts.map((count, i) => (
                <span key={i} 
                    className={(currentCoin === count.coin)?'current-coin':undefined}
                    onClick={()=>setCurrentCoin(count.coin)}>
                    {bankTotal[count.coin]} {count.coin}
                </span>
            ))}
            <h5>Operaciones de {currentCoin}</h5>
            <OperationList operations={bankOperations.filter(oper => oper.coin === currentCoin)} />
        </div>
    )
}
