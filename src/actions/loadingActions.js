/*
const loadingStructure = true / false
*/

export const startLoading = () => ({ type: "@load/change", payload: true })

export const finishLoading = () => ({ type: "@load/change", payload: false })