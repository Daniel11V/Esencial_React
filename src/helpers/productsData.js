export const getProductsData = () => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const productsFromStorage = JSON.parse(localStorage.getItem("usersProducts"));
            resolve(productsFromStorage ? productsFromStorage : []);

        }, 500)

    })
}

export const saveProductsData = (porductsData) => {

    localStorage.setItem("usersProducts", JSON.stringify(porductsData));

}