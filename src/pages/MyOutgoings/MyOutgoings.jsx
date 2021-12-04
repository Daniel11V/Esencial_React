import { useEffect } from "react"
import { useParams } from "react-router"
import { OutgoingCreator } from "../../components/OutgoingCreator/OutgoingCreator"
import { OutgoingList } from "../../components/OutgoingList/OutgoingList"
import { useSelector, useDispatch } from "react-redux"
import './MyOutgoings.scss'
import { cleanOutgoings, getOutgoingsFromFirebase, saveOutgoings } from "../../actions/outgoingActions"
import { SummaryModalButton } from "../../components/ModalButtons/SummaryModalButton"
import { SaveModalButton } from "../../components/ModalButtons/SaveModalButton"

export const MyOutgoings = () => {  
    const { outgoings, loading, user } = useSelector(state => state)
    const { products, services } = outgoings
    const dispatch = useDispatch()

    const {categoryId = ""} = useParams()
    
    useEffect(() => {
                
        if (user.googleId && !products.length && !loading) {
                        
            dispatch(getOutgoingsFromFirebase(user.googleId))
        } else if (!user.googleId && products.length) {
            // Cuando se cierra sesion
            dispatch(cleanOutgoings())
        }

    }, [user, products, loading, dispatch])

    return (
        <div>
            <div className="header">
                <h4>Mis Compras Esenciales</h4>
                <SummaryModalButton category={categoryId} />
                <SaveModalButton onClick={()=>dispatch(saveOutgoings(user.googleId, outgoings))}/>
            </div>
            <OutgoingCreator />

            {loading? (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            ) : (
                <div className="outs">
                    {(categoryId === 'products' || !categoryId)&&(
                        <div>
                            <h5>Productos</h5>
                            <OutgoingList outgoing={products} category="products"/>
                        </div>
                    )}
                    {(categoryId === 'services' || !categoryId)&&(
                        <div>
                            <h5>Servicios</h5>
                            <OutgoingList outgoing={services} category="services" />
                        </div>
                    )}
                </div>
            )}
            
        </div>
    )
}
