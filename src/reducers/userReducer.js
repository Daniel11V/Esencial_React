
export const userReducer = (state = {}, action) => {

    switch (action.type) {
        case "@user/update":
            return action.payload

        default:
            return state
    }

}