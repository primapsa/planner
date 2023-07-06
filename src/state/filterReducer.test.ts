import {addPaymentFromValue, filterReducer} from "./filterReducer";
//import {describe, expect, test} from '@jest/globals';
test('correct value should be added payFrom field', () => {
    const startState = {
        fields: {
            catalogues: [],
            paymentFrom: null,
            paymentTo: null,
            currentCatalog: null,
        },
        status: 'idle'
    }
    const startValue = '33'
    const action = addPaymentFromValue(startValue)
    const endState = filterReducer(startState, action)

    expect(startState.fields.paymentFrom).toBe(null)
    expect(endState.fields.paymentFrom).toBe('33')

})