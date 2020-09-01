import { ADD_TO_CAR,UPDATE_SHOP_CAR_COUNT,UPDATE_SHOP_CAR_SELECTED,DEL_SHOP_CAR } from './mations-types'
export default {
    addToCar({commit},data){
        commit(ADD_TO_CAR,data)
    },
    updateShopCarCount({commit},data){
        commit(UPDATE_SHOP_CAR_COUNT,data)
    },
    updateShopCarSelected({commit},data){
        commit(UPDATE_SHOP_CAR_SELECTED,data)
    },
    delShopCar({commit},data){
        commit(DEL_SHOP_CAR,data)
    }
}