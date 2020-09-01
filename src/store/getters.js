export default {
    getCarAllCount(state) {
        return state.car.reduce((count, item) => count + item.count, 0)
    },
    getCarSelectCount(state) {
        const obj = {}
        state.car.forEach(item => {
            obj[item.id] = {
                count: item.count,
                selected: item.selected
            }
        })
        return obj
    },
    getCarAccount(state) {
        let count = 0
        let totalPrice = 0
        state.car.forEach(item => {
            if (item.selected) {
                count += item.count
                totalPrice += item.price * item.count
            }
        })
        return {
            count,
            totalPrice
        }
    }
}