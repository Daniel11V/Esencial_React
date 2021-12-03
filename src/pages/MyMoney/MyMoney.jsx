import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { cleanMoney, getMoneyFromFirebase } from "../../actions/moneyActions"
import { ActionButton } from "../../components/ActionButton/ActionButton"
import { BankList } from "../../components/BankList/BankList"
import { OperationList } from "../../components/OperationList/OperationList"
import './MyMoney.scss'

export const MyMoney = () => {
    // const { banks, operations, loadingMoney } = useContext(MoneyContext)
    const dispatch = useDispatch()
    const { user, money, loading } = useSelector(state => state)
    const { banks, operations, moneyTotal } = money

    
    useEffect(() => {
                
        if (user.googleId && !banks.length && !loading) {
                        
            dispatch(getMoneyFromFirebase(user.googleId))
        } else if (!user.googleId && banks.length) {

            // Cuando se cierra sesion
            dispatch(cleanMoney())
        }

    }, [user, banks, loading, dispatch])

    return (
        <div>
            <div className="header">
            </div>
            <h4>Total:  $ {moneyTotal}  ARS</h4>
            
            {loading? (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            ) : (
                <div>                    
                    <div className="money-headers">
                        <h4>Mis Cuentas</h4>
                        <Link to="/banks/new">
                            <ActionButton word="Añadir" icon="add"/>
                        </Link>
                    </div>
                    <BankList />

                    <div className="money-headers">
                        <h4>Operaciones</h4>
                        <Link to="/operations/new">
                            <ActionButton word="Añadir" icon="add"/>
                        </Link>
                    </div>
                    <OperationList operations={operations}/> 
                </div>
            )}
            
        </div>
    )
}
