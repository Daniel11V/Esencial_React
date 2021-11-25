import { useEffect, useState } from "react"
import { ProductCreator } from "../../components/ProductCreator/ProductCreator"
import { ProductList } from "../../components/ProductList/ProductList"
import { getProducts } from "../../helpers/getProducts"

export const MyProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    
    const style = {
        padding: "0 2em",
        marginBottom: "3em" 
    }


    useEffect(() => {
        setLoading(true)

        getProducts()
            .then(prods => setProducts(prods))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))

    }, [])
    
    return (
        <div id="header-wrapper" style={style}>
            <h3>Lista de tus Compras Esenciales</h3>
            <h4>Agregar Producto</h4>
            <ProductCreator setProducts={setProducts}/>

            <h4>Mis Productos</h4>
            
            {loading? (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            ) : (
                <div className="prods">
                    <h5>Vestimenta</h5>
                    <ProductList products={products}/>
                </div>
            )}
            
        </div>
    )
}
