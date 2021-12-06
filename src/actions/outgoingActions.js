import { addData, getData, updateData, updateDataField } from '../helpers/firebaseData'
import { defaultOutgoings } from '../data/defaultData'
import { finishLoading, startLoading } from './loadingActions'
const collectionName = "usersOutgoings"

/*
const outgoingStructure = [{
    name: '',
    price: 0,
    qunatity: 0,
    period: 'Month',
    imgUrl: ''
}]
*/

export const getOutgoingsFromFirebase = (userId) => {
    return async (dispatch) => {
        dispatch(startLoading())

        try {

            const data = await getData(collectionName, userId)

            if (data) {
                dispatch(saveOutgoingsLocal({ ...data }))

            } else {
                dispatch(saveOutgoingsLocal({ ...defaultOutgoings }))

                addData(collectionName, userId, { ...defaultOutgoings })
            }
            dispatch(finishLoading())

        } catch (err) {
            console.warn(err)
        }
    }
}

export const saveOutgoings = (userId, outgoingsUpdated) => {
    return (dispatch) => {

        updateData(collectionName, userId, outgoingsUpdated)
        dispatch(saveOutgoingsLocal(outgoingsUpdated))
    }
}

export const cleanOutgoings = () => {
    return (dispatch) => {
        dispatch(saveOutgoingsLocal({ products: [], services: [] }))
    }
}

export const newOutgoing = (category, newOutInfo) => (dispatch, getState) => {
    let { googleId } = getState().user

    updateDataField(collectionName, googleId, category, [...getState().outgoings[category], newOutInfo])

    dispatch(newOutgoingLocal(category, newOutInfo))
}

export const deleteOutgoing = (category, outId) => (dispatch, getState) => {
    const { user, outgoings } = getState()
    let categoryOuts = outgoings[category]

    categoryOuts.splice(outId, 1)

    updateDataField(collectionName, user.googleId, category, [...categoryOuts])

    dispatch(deleteOutgoingLocal(category, categoryOuts))
}


export const saveOutgoingsLocal = (outsUpdated) => ({ type: "@outs/save", payload: outsUpdated })

export const saveOutgoingLocal = (category, prodId, prodUpdated) => ({ type: "@outs/update_one", payload: { category, prodId, prodUpdated } })

export const newOutgoingLocal = (category, newOutInfo) => ({ type: "@outs/new", payload: { category, newOutInfo } })

export const deleteOutgoingLocal = (category, categoryOuts) => ({ type: "@outs/delete", payload: { category, categoryOuts } })

// export const cleanOutgoings = () => ({ type: "@outs/clean", payload: { prodId, prodUpdated } })

// export const addOutgoing = (newOut) => ({ type: "SAVE_PRODS", payload: newOut })