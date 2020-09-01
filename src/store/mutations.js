import {
    ADD_TO_CAR,
    UPDATE_SHOP_CAR_COUNT,
    UPDATE_SHOP_CAR_SELECTED,
    DEL_SHOP_CAR
} from './mations-types'
import saveLocal from '../utils/saveLocal'
export default {
    [ADD_TO_CAR](state, data) {
        let flag = false
        state.car.some(item => {
            if (item.id === data.id) {
                item.count += data.count >> 0
                return flag = true
            }
        })
        flag || state.car.push(data)
        saveLocal.saveCarData(state.car)
    },
    [UPDATE_SHOP_CAR_COUNT](state, data) {
        state.car.some(item => {
            if (item.id === data.id) {
                item.count = data.count >> 0
                return true
            }
        })
        saveLocal.saveCarData(state.car)
    },
    [UPDATE_SHOP_CAR_SELECTED](state, data) {
        state.car.some(item => {
            if (item.id === data.id) {
                item.selected = data.selected
                return true
            }
        })
        saveLocal.saveCarData(state.car)
    },
    [DEL_SHOP_CAR](state, data) {
        state.car.some((item, i) => {
            if (item.id === data) {
                state.car.splice(i, 1)
                return true
            }
        })
        saveLocal.saveCarData(state.car)
    }
}