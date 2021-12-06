
const defaultState = {
    products: [],
    services: []
}

export const outgoingReducer = (state = defaultState, { type, payload }) => {

    switch (type) {
        case "@outs/save":
            return { ...payload }
        case "@outs/update_one":
            let updatedOutgoing = [...state[payload.category]]
            updatedOutgoing[payload.outId] = payload.outUpdated
            return { ...state, [payload.category]: [...updatedOutgoing] }
        case "@outs/new":
            return { ...state, [payload.category]: [...state[payload.category], { ...payload.newOutInfo }] }
        case "@outs/delete":
            return { ...state, [payload.category]: [...payload.categoryOuts] }

        default:
            return state
    }

}