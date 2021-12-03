import { useEffect } from "react"
import { useParams } from "react-router"
import { ProductCreator } from "../../components/ProductCreator/ProductCreator"
import { ProductList } from "../../components/ProductList/ProductList"
import { useSelector, useDispatch } from "react-redux"
import './MyProducts.scss'
import { cleanProducts, getProductsFromFirebase, saveProducts } from "../../actions/productActions"
import { SummaryModalButton } from "../../components/ModalButtons/SummaryModalButton"
import { SaveModalButton } from "../../components/ModalButtons/SaveModalButton"

export const MyProducts = () => {  
    const { products, loading, user } = useSelector(state => state)
    const dispatch = useDispatch()

    const {categoryId = "Vestimenta"} = useParams()
    
    useEffect(() => {
                
        if (user.googleId && !products.length && !loading) {
                        
            dispatch(getProductsFromFirebase(user.googleId))
        } else if (!user.googleId && products.length) {
            // Cuando se cierra sesion
            dispatch(cleanProducts())
        }

    }, [user, products, loading, dispatch])

    return (
        <div>
            <div className="header">
                <h4>Mis Productos Esenciales</h4>
                <SummaryModalButton />
                <SaveModalButton onClick={()=>dispatch(saveProducts(user.googleId, products))}/>
            </div>
            <ProductCreator />

            {loading? (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            ) : (
                <div className="prods">
                    <h5>{categoryId}</h5>
                    <ProductList products={products}/>
                </div>
            )}
            
        </div>
    )
}
