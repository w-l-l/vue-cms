const SHOP_CAR = 'car'
export default {
    saveCarData(data){
        localStorage.setItem(SHOP_CAR,JSON.stringify(data))
    },
    readCarData(){
        return JSON.parse(localStorage.getItem(SHOP_CAR)) || []
    }
}
