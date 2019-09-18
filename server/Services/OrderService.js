//引入Usermodel
let OrderModel = require('../Models/OrderModel');
class OrderService extends OrderModel {
    constructor() {
        super();
    }
    addOrders(data, callback) {
        let that = this;
        // console.log("service1");
        data.money = parseInt(data.money);

        that.addOrder(data, (ob1) => {
            // console.log("service2");
            that.deleteShoppingCar(data, (ob2) => {

                that.selectUser(data, (ob3) => {
                    // console.log(ob3);
                    var info = {
                        oldMoney: ob3[0].user_order_money,
                        count: ob3[0].user_order_count,
                        money: data.money,
                        username: data.username
                    }

                    that.updateUserInfo(info, (ob4) => {
                        callback(data);
                    });
                
                });

            });

        });

    }

}

module.exports = OrderService;