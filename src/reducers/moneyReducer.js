const defaultState = {
    banks: [],
    otherBanks: [],
    operations: []
}

export const moneyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "@money/save":
            return action.payload
        case "@banks/save":
            return {
                banks: [...action.payload],
                ...state
            }
        case "@banks/new":
            return {
                banks: [...state.banks, action.payload],
                ...state
            }
        case "@otherB/save":
            return {
                ...state,
                otherBanks: [...action.payload]
            }
        case "@oper/save":
            return {
                ...state,
                operations: [...action.payload]
            }
        case "@oper/new":
            return {
                ...state,
                operations: [...state.operations, action.payload]
            }
        default:
            return state
    }
}