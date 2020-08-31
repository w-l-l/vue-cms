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
    }
}