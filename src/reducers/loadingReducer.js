
export const loadingReducer = (state = false, action) => {

    switch (action.type) {
        case "@load/change":
            return action.payload
        default:
            return state
    }

}