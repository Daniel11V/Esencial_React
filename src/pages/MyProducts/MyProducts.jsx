import { Fragment, useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { UserContext } from "../../context/UserContext"
import { ProductCreator } from "../../components/ProductCreator/ProductCreator"
import { ProductList } from "../../components/ProductList/ProductList"
import { ProductContext } from "../../context/ProductContext"
import M from "materialize-css";

export const MyProducts = () => {    

    const {categoryId = "Vestimenta"} = useParams()

    const { user } = useContext(UserContext)
    const { loadProducts, loading, products, setProducts, saveProducts } = useContext(ProductContext)
    const [prodsSummary, setProdsSummary] = useState([])
    const [totalSummary, setTotalSummary] = useState(0)

    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, [])

    useEffect(() => {
        if (user.googleId && !products.length && !loading) {
            
            loadProducts(user.googleId)

        } else if (!user.googleId && products.length) {
            // Cuando se cierra sesion
            setProducts([])
        }

    }, [user, products, loading, loadProducts, setProducts])

    const summaryCalculations = () => {
        let totalTotal = 0
        
        let summaryProds = products.filter(prod => prod.quantity)

        summaryProds = summaryProds.map((prodInfo, i) => {
            const { name, price, quantity, period, imgUrl } = prodInfo
            
            let monthQuantity
            if (period.localeCompare('Month')) {

                monthQuantity = parseInt(quantity / 12)
                if (!monthQuantity) monthQuantity = 1

            } else {
                monthQuantity = quantity
            }

            let totalProdPrice = monthQuantity*price

            totalTotal += totalProdPrice

            return {
                name, price, quantity, period, imgUrl,
                quantityMonth: monthQuantity,
                totalPrice: totalProdPrice
            }

        })

        setTotalSummary(totalTotal)
        setProdsSummary(summaryProds)
    }

    return (
        <div className="page-wrapper">
             <div className="header">
              <h3>Lista de tus Compras Esenciales</h3>
                {/* Modal Trigger */}
                <a href="#modal_summary" className="btn waves-effect waves-light blue darken-2 right modal-trigger" onClick={summaryCalculations}>
                    <i className="material-icons right">library_books</i>Resumen
                </a>
                <a href="#modal_saved" className="btn waves-effect waves-light blue darken-2 save-btn right modal-trigger" onClick={()=>saveProducts(user.googleId)}>
                    <i className="material-icons right">save</i>Guardar
                </a>
                {/* Modal Summary */}
                <div id="modal_summary" className="modal">
                    <div className="modal-content">
                        <h4>Lista de Compras del Mes</h4>
                        <div className="summary-table">
                            <span>Productos</span>
                            <span>Precio Unitario</span>
                            <span>Cantidad:</span>
                            <span>Total</span>
                            {prodsSummary.map((prod, i) => (
                                <Fragment key={i} >
                                    <span>- {prod.name}</span>
                                    <span>$ {prod.price}</span>
                                    <span>x{prod.quantityMonth}:</span>
                                    <span>$ {prod.totalPrice}</span>
                                </Fragment>
                            ))}
                            <span>TOTAL: </span>
                            <span>$ {totalSummary}</span>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Listo!</a>
                    </div>
                </div>
                {/* Modal Saved */}
                <div id="modal_saved" className="modal">
                    <div className="modal-content">
                        <h5>Guardado con exito </h5>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Genial!</a>
                    </div>
                </div>
            </div>
            <h4>Agregar Producto</h4>
            <ProductCreator createProduct={(newProdInfo) => setProducts((prods) => [ ...prods, newProdInfo ])}/>

            <h4>Mis Productos</h4>
            
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
