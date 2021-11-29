import { createContext, useState } from "react";
import { defaultProducts } from "../data/defaultProducts";
import { getProductsData, updateProductsData, addUserData } from "../helpers/productsData";


export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    const loadProducts = async (userId) => {
            
        setLoading(true)
        
        try {

            const productsData = await getProductsData(userId)

            console.log(productsData)

            if (productsData) {
                setProducts(productsData)
            } else {
                setProducts(defaultProducts)
                addUserData(userId, defaultProducts)  
            }
                        
        } catch (err) {
            console.warn(err)
        }
        
        setLoading(false)
    }

    const saveProducts = (userId) => {

        updateProductsData(userId, products)
    }

    const lessQuantity = (prodId) => {
        let productsUpdated = [ ...products ]
        
        if (productsUpdated[prodId].quantity > 0) {
            productsUpdated[prodId].quantity--
            setProducts(productsUpdated)
        }
    }

    const addQuantity = (prodId) => {
        let productsUpdated = [ ...products ]
        productsUpdated[prodId].quantity++
        setProducts(productsUpdated)
    }

    const tooglePeriod = (prodId, newPeriod) => {
        let productsUpdated = [ ...products ]
        productsUpdated[prodId].period = newPeriod
        setProducts(productsUpdated)
    }

    return (
        <ProductContext.Provider value={{ 
            loading, 
            loadProducts, 
            products, 
            setProducts, 
            saveProducts, 
            lessQuantity, 
            addQuantity,
            tooglePeriod 
            }} >
            {children}
        </ProductContext.Provider>
    )
}