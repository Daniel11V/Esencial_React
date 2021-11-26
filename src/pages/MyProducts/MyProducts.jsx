import { useParams } from "react-router"
import { ProductCreator } from "../../components/ProductCreator/ProductCreator"
import { ProductList } from "../../components/ProductList/ProductList"

export const MyProducts = ({ products, newProduct, loading }) => {    
    const style = {
        padding: "0 2em",
        marginBottom: "3em" 
    }
    
    const {categoryId = "Vestimenta"} = useParams()

    return (
        <div id="header-wrapper" style={style}>
            <h3>Lista de tus Compras Esenciales</h3>
            <h4>Agregar Producto</h4>
            <ProductCreator newProduct={newProduct}/>

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
