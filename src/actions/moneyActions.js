import { addData, getData, updateData, updateDataField } from '../helpers/firebaseData'
import { defaultMoney } from '../data/defaultData'
import { finishLoading, startLoading } from './loadingActions'
const collectionName = "usersMoney"

/*
const moneyStructure = {
    (local) banksTotal: {
        ['bankName']: {
            ['coinName']: 2000,
            ['coinName']: 2000
        }
    },
    lastMonthUpdated: 9,
    banks: [
        {
            name: '',
            imgUrl: '',
            counts: [
                {
                    coin: "ARS",
                    lastMonthMount: 0
                }
            ]
        }
    ],
    otherBanks: [
        {
            name: '',
            imgUrl: '',
            coin: ["ARS"]
        }
    ],
    operations: [
        {
            myBank: "",
            coin: "ARS",
            otherName: '',
            otherIsMe: false,
            isPasive: false,
            mount: 0,
            description: '',
            date: 'timestamp'
        }
    ]
}
*/

export const getMoneyFromFirebase = (userId) => async (dispatch) => {

    dispatch(startLoading())

    try {

        const data = await getData(collectionName, userId)

        if (data) {
            data.banksTotal = getBanksTotal(data)
            dispatch(saveMoneyLocal(data))
        } else {
            defaultMoney.banksTotal = getBanksTotal(defaultMoney)
            dispatch(saveMoneyLocal(defaultMoney))

            addData(collectionName, userId, defaultMoney)
        }

        dispatch(finishLoading())

    } catch (err) {
        console.warn(err)
    }
}

export const saveMoney = (userId, moneyUpdated) => (dispatch) => {

    updateData(collectionName, userId, moneyUpdated)
    dispatch(saveMoneyLocal(moneyUpdated))
}

export const cleanMoney = () => (dispatch) => {

    dispatch(saveMoneyLocal({ banks: [], operations: [] }))
}

export const getBanksTotal = (moneyInfo) => {
    const { banks, operations } = moneyInfo
    let newBankTotal = {}

    // Init Banks
    for (let bank of banks) {
        newBankTotal[bank.name] = {}
        for (let count of bank.counts) {
            newBankTotal[bank.name][count.coin] = count.lastMonthMount
        }
    }

    // Calculate Operations
    for (let operation of operations) {
        // Verificar dentro del mes

        const { myBank, otherName, coin, mount, isPasive, otherIsMe } = operation

        if (isPasive) {
            newBankTotal[myBank][coin] -= mount

            if (otherIsMe) {
                newBankTotal[otherName][coin] += mount
            }
        } else {
            newBankTotal[myBank][coin] += mount

            if (otherIsMe) {
                newBankTotal[otherName][coin] -= mount
            }
        }
    }

    return newBankTotal
}


export const newBank = (newBankInfo) => (dispatch, getState) => {
    let { googleId } = getState().user
    let banksUpdated = getState().money.banks
    console.log(banksUpdated)

    const bankPosition = banksUpdated.findIndex(bank =>
        (bank.name.localeCompare(newBankInfo.name) === 0)
    )
    if (bankPosition !== -1) {
        const countAlreadyExists = banksUpdated[bankPosition].counts.some(count =>
            (count.coin.localeCompare(newBankInfo.counts[0].coin) === 0)
        )

        if (countAlreadyExists) {
            // alert()

        } else {
            banksUpdated[bankPosition].counts.push(newBankInfo.counts[0])
            updateDataField(collectionName, googleId, 'banks', banksUpdated)
            dispatch(saveBanksLocal(banksUpdated))
        }
    } else {
        banksUpdated.push(newBankInfo)
        updateDataField(collectionName, googleId, 'banks', banksUpdated)
        dispatch(newBankLocal(newBankInfo))
    }
}


export const newOperation = (newOperInfo) => (dispatch, getState) => {
    let { googleId } = getState().user

    updateDataField(collectionName, googleId, 'operations', [...getState().money.operations, newOperInfo])

    dispatch(newOperLocal(newOperInfo))
}

export const saveMoneyLocal = (moneyUpdated) => ({ type: "@money/save", payload: moneyUpdated })

// export const saveBanksTotal = (banksTotalUpdated) => ({ type: "@banksT/save", payload: banksTotalUpdated })

export const saveBanksLocal = (banksUpdated) => ({ type: "@banks/save", payload: banksUpdated })
export const newBankLocal = (newBankInfo) => ({ type: "@banks/new", payload: newBankInfo })

export const saveOtherBanksLocal = (otherBanksUpdated) => ({ type: "@otherB/save", payload: otherBanksUpdated })

export const saveOperLocal = (operUpdated) => ({ type: "@oper/save", payload: operUpdated })
export const newOperLocal = (newOperInfo) => ({ type: "@oper/new", payload: newOperInfo })
