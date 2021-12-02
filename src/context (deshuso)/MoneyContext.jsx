import { createContext, useState } from "react";
import { defaultBanks } from "../data/defaultData";
import { getData, updateData, addData } from "../helpers/firebaseData";

/*
const moneyStructure = {
    banks: [{
        name: '',
        startMount: 0,
        lastMonthMount: 0
    }],
    operations: [
        {
            fromUser: '',
            toUser: '',
            fromBank: '',
            toBank: '',
            description: '',
            date: 'timestamp'
        }
    ]
}
*/

export const MoneyContext = createContext()

export const MoneyProvider = ({ children }) => {
    const [banks, setBanks] = useState([]);
    const [operations, setOperations] = useState([]);
    const [loadingMoney, setLoadingMoney] = useState(false)
    const collectionName = 'usersMoney'

    const loadMoney = async (userId) => {
            
        setLoadingMoney(true)
        
        try {

            const data = await getData(collectionName, userId)
            console.log(data)

            if (data.banks) {
                setBanks([ ...data.banks ])
                setOperations([ ...data.operations ])
            } else {
                setBanks(defaultBanks)
                addData(collectionName, userId, { banks: defaultBanks, operations: []})  
            }
                        
        } catch (err) {
            console.warn(err)
        }
        
        setLoadingMoney(false)
    }

    const saveMoney = (userId) => {

        updateData(collectionName, userId, { banks: banks, operations: operations })
    }

    return (
        <MoneyContext.Provider value={{ 
            loadingMoney, 
            loadMoney, 
            banks, 
            setBanks, 
            operations, 
            setOperations, 
            saveMoney
            }} >
            {children}
        </MoneyContext.Provider>
    )
}