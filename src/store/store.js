
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { outgoingReducer } from '../reducers/outgoingReducer'
import { moneyReducer } from '../reducers/moneyReducer'
import { loadingReducer } from '../reducers/loadingReducer'
import { userReducer } from '../reducers/userReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
    outgoings: outgoingReducer,
    money: moneyReducer,
    loading: loadingReducer,
    user: userReducer
})

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
)
