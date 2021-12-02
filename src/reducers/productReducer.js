

export const productReducer = (state = [], action) => {

    switch (action.type) {
        case "@prods/save":
            return [...action.payload]
        case "@prods/update_one":
            let updatedProducts = [...state]
            updatedProducts[action.payload.prodId] = action.payload.prodUpdated
            return [...updatedProducts]
        case "@prods/new":
            return [...state, action.payload]

        default:
            return state
    }

}