import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { cleanMoney, getMoneyFromFirebase } from "../../actions/moneyActions"
import { BankCreator } from "../../components/BankCreator/BankCreator"
import { BankList } from "../../components/BankList/BankList"
import { OperationCreator } from "../../components/OperationCreator/OperationCreator"
import { OperationList } from "../../components/OperationList/OperationList"

export const MyMoney = () => {
    // const { banks, operations, loadingMoney } = useContext(MoneyContext)
    const dispatch = useDispatch()
    const { user, money, loading } = useSelector(state => state)
    const { banks, operations } = money

    
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
            <h3>El Flujo de mi Dinero</h3>
            
            {loading? (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            ) : (
                <div>
                    <h4>Añadir Cuenta</h4>
                    <BankCreator />
                    <h4>Mis Cuentas</h4>
                    <div className="banks">
                        <BankList banks={banks}/>
                    </div>

                    <h4>Realizar Operación</h4>
                    <OperationCreator />
                    
                    <h4>Mis Operaciones</h4>
                    <div className="prods">
                        <OperationList operations={operations}/> 
                    </div>
                </div>
            )}
            
        </div>
    )
}
