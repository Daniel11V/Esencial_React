import { createContext, useState } from "react";
import { defaultProducts } from "../data/defaultProducts";
import { getProductsData, saveProductsData } from "../helpers/productsData";


export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [allUsersProducts, setAllUsersProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    const loadProducts = async (userId, reloadFromStorage = false) => {
            
        setLoading(true)
        
        try {

            let productsData = [ ...allUsersProducts ]
            
            if (!allUsersProducts.length || reloadFromStorage) {
                productsData = await getProductsData()
            }            
            
            const userPosition = productsData.findIndex(savedUser => (savedUser.id.localeCompare(userId) === 0))
                
            if (userPosition !== -1) {
                
                setProducts(productsData[userPosition].products)
                setAllUsersProducts( productsData )
                
            } else {
                
                setProducts(defaultProducts)
                setAllUsersProducts([
                    ...productsData,
                    { id: userId, products: defaultProducts }
                ])
                saveProductsData([
                    ...productsData,
                    { id: userId, products: defaultProducts }
                ])                
            }
                        
        } catch (err) {
            console.warn(err)
        }
        
        setLoading(false)
    }

    const saveProducts = (userId) => {

        if(allUsersProducts.length) {
            
            // Crear lista de productos de usuarios actualizada
            let newUsersProducts = [ ...allUsersProducts ]
            const userPosition = newUsersProducts.findIndex(savedUser => (savedUser.id.localeCompare(userId) === 0))
            newUsersProducts[userPosition].products = [ ...products ]
            
            // Guardar
            setAllUsersProducts(newUsersProducts)
            saveProductsData(newUsersProducts)
        }
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