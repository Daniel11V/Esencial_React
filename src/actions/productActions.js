import { addData, getData, updateDataField } from '../helpers/firebaseData'
import { defaultProducts } from '../data/defaultData'
import { finishLoading, startLoading } from './loadingActions'
const collectionName = "usersProducts"

/*
const productStructure = [{
    name: '',
    price: 0,
    qunatity: 0,
    period: 'Month',
    imgUrl: ''
}]
*/

export const getProductsFromFirebase = (userId) => {
    return async (dispatch) => {
        dispatch(startLoading())

        try {

            const data = await getData(collectionName, userId)

            if (data) {
                dispatch(saveProductsLocal([...data.products]))

            } else {
                dispatch(saveProductsLocal(defaultProducts))

                addData(collectionName, userId, { products: defaultProducts })
            }
            dispatch(finishLoading())

        } catch (err) {
            console.warn(err)
        }
    }
}

export const saveProducts = (userId, productsUpdated) => {
    return (dispatch) => {

        updateDataField(collectionName, userId, "products", productsUpdated)
        dispatch(saveProductsLocal(productsUpdated))
    }
}

export const cleanProducts = () => {
    return (dispatch) => {
        dispatch(saveProductsLocal([]))
    }
}

export const newProduct = (newProdInfo) => (dispatch, getState) => {
    let { googleId } = getState().user

    updateDataField(collectionName, googleId, "products", [...getState().products, newProdInfo])

    dispatch(newProductLocal(newProdInfo))
}


export const saveProductsLocal = (prodsUpdated) => ({ type: "@prods/save", payload: prodsUpdated })

export const saveProductLocal = (prodId, prodUpdated) => ({ type: "@prods/update_one", payload: { prodId, prodUpdated } })

export const newProductLocal = (newProdInfo) => ({ type: "@prods/new", payload: newProdInfo })

// export const cleanProducts = () => ({ type: "@prods/clean", payload: { prodId, prodUpdated } })


// export const addProduct = (newProd) => ({ type: "SAVE_PRODS", payload: newProd })