import { db } from '../firebase/config'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite'

export const getProductsData = async (userId) => {

    try {
        // Traer Documento del usuario

        const docRef = await getDoc(doc(db, 'usersProducts', userId))

        return [...docRef.data().products]

    } catch (err) {
        console.warn(err)
    }


    // Con LocalStorage
    // setTimeout(() => {
    //     const productsFromStorage = JSON.parse(localStorage.getItem("usersProducts"));
    //     resolve(productsFromStorage ? productsFromStorage : []);

    // }, 500)
}

export const updateProductsData = async (userId, productsData) => {

    // Con LocalStorage
    // localStorage.setItem("usersProducts", JSON.stringify(productsData));

    await updateDoc(doc(db, 'usersProducts', userId), {
        products: productsData
    })

}

export const addUserData = async (userId, productsData) => {

    try {
        await setDoc(doc(db, 'usersProducts', userId), {
            products: productsData
        })

    } catch (err) {
        console.warn(err)
    }

    // Con LocalStorage
    // localStorage.setItem("usersProducts", JSON.stringify(productsData));

}