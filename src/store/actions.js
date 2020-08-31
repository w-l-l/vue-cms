import { ADD_TO_CAR,UPDATE_SHOP_CAR_COUNT } from './mations-types'
export default {
    addToCar({commit},data){
        commit(ADD_TO_CAR,data)
    },
    updateShopCarCount({commit},data){
        commit(UPDATE_SHOP_CAR_COUNT,data)
    }
}