const initial = {
    fields: {
        catalogues: [],
        paymentFrom: null,
        paymentTo: null,
        currentCatalog: null,
    },
    status: 'idle'
}

export const filterReducer = (state: FilterStateType = initial, action: ActionType) => {
    switch (action.type) {
        case "ADD-CATALOGUES":
            return {...state, fields: {...state.fields, catalogues: action.payload.catalogues}}
        case "ADD-STATUS":
            return {...state, status: action.payload.status}
        case "ADD-CURRENT-CATALOG":
            return {...state, fields: {...state.fields, currentCatalog: action.payload.id}}
        case "ADD-PAYMENT-FROM":
            return {...state, fields: {...state.fields, paymentFrom: action.payload.value}}
        case "ADD-PAYMENT-TO":
            return {...state, fields: {...state.fields, paymentTo: action.payload.value}}
        case "RESET-FILTER":
            return {...state, fields: {}}
        default:
            return state
    }
}
const addCatalogues = (catalogues: any[]) => ({type: 'ADD-CATALOGUES', payload: {catalogues}} as const)
const addStatus = (status: string) => ({type: 'ADD-STATUS', payload: {status}} as const)
export const addCurrentCatalog = (id: string | null) => ({type: 'ADD-CURRENT-CATALOG', payload: {id}} as const)
export const addPaymentFromValue = (value: string | null) => ({type: 'ADD-PAYMENT-FROM', payload: {value}} as const)
const addPaymentToValue = (value: string | null) => ({type: 'ADD-PAYMENT-TO', payload: {value}} as const)
export const resetFilter = () => ({type: 'RESET-FILTER'} as const)


type ActionType =
    AddCatalogType
    | AddStatusType
    | AddCurrentCatalogType
    | AddPaymentFromValueType
    | AddPaymentToValueType
    | ResetFilterType

type AddCatalogType = ReturnType<typeof addCatalogues>
type AddStatusType = ReturnType<typeof addStatus>
type AddCurrentCatalogType = ReturnType<typeof addCurrentCatalog>
type AddPaymentFromValueType = ReturnType<typeof addPaymentFromValue>
type AddPaymentToValueType = ReturnType<typeof addPaymentToValue>
type ResetFilterType = ReturnType<typeof resetFilter>
type FilterStateType = {
    fields: {
        catalogues: any[]
        paymentFrom: number | null
        paymentTo: number | null
        currentCatalog: string | null
    }
    status: string
}