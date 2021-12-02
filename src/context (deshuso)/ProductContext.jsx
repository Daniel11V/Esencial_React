import { createContext, useState } from "react";
import { defaultProducts } from "../data/defaultData";
import { getData, updateData, addData } from "../helpers/firebaseData";

/*
const productStructure = [{
    name: '',
    price: 0,
    qunatity: 0,
    period: 'Month',
    imgUrl: ''
}]
*/

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const collectionName = 'usersProducts'

    const loadProducts = async (userId) => {
            
        setLoading(true)
        
        try {

            const data = await getData(collectionName, userId)

            console.log(data)

            if (data) {
                setProducts([ ...data.products ])
            } else {
                setProducts(defaultProducts)
                addData(collectionName, userId, { products: defaultProducts })  
            }
                        
        } catch (err) {
            console.warn(err)
        }
        
        setLoading(false)
    }

    const saveProducts = (userId) => {

        updateData(collectionName, userId, { products: products })
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