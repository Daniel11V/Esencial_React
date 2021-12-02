import { db } from '../firebase/config'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite'

export const getData = async (collectionName, userId) => {

    try {
        // Traer Documento del usuario

        const docRef = await getDoc(doc(db, collectionName, userId))
        // console.log('firebase:', docRef.data())
        return docRef.data()

    } catch (err) {
        console.warn(err)
    }


    // Con LocalStorage

    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         const productsFromStorage = JSON.parse(localStorage.getItem("usersProducts"));
    //         resolve(productsFromStorage ? productsFromStorage : []);
    //     }, 3000)
    // })
}

export const updateData = async (collectionName, userId, updatedData) => {

    try {
        if (updatedData) {
            await updateDoc(doc(db, collectionName, userId), updatedData)
        }
    } catch (err) {
        console.warn(err)
    }
}

export const updateDataField = async (collectionName, userId, field, updatedData) => {

    // Con LocalStorage
    // localStorage.setItem("usersProducts", JSON.stringify(data));

    try {
        if (updatedData) {
            await updateDoc(doc(db, collectionName, userId), {
                [field]: updatedData
            })
        }
    } catch (err) {
        console.warn(err)
    }
}

export const addData = async (collectionName, userId, updatedData) => {

    // Con LocalStorage
    // localStorage.setItem("usersProducts", JSON.stringify(data));

    try {
        if (updatedData) {
            await setDoc(doc(db, collectionName, userId), updatedData)
        }
    } catch (err) {
        console.warn(err)
    }
}