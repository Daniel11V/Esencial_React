
/*
const moneyStructure = {
    name: "",
    googleId: "",

}
*/

export const saveUser = (userUpdated) => ({ type: "@user/update", payload: userUpdated })

export const exitUser = () => ({ type: "@user/update", payload: {} })
