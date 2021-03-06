//引入父类
let SqlBase = require('./SqlBase');

class ShoppingCarModel extends SqlBase {
    constructor() {
        super();
    }

    addToShoppingCar(data, callback) {
        console.log("addToShoppingCar");
        let sql = `insert into shopping(username,productId,productName,productPrice,productCount,productType,productImg) values('${data.username}',${data.productID},'${data.productName}',${data.productPrice},1,'${data.productType}','${data.productImg}')`;
        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
            callback(result);
        });
    }

    deleteFromShopping(data, callback) {
        let sql = ` delete from shopping where username='${data.username}' and productId=${data.productID}`;
        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
            callback(result);
        });
    }

    //根据用户名获取购物车信息的商品ID
    selectByUsername(username, callback) {
        let sql = ` select productId from shopping where username='${username}'`;
        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
            // console.log(result);
            callback(result);
        });
    }

    //根据用户名和商品ID搜索商品数量
    selectProductCount(data, callback) {
        // console.log("selectProductCount");
        let sql = ` select productCount from shopping where username='${data.username}' and productId=${data.productID}`;
        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
            // console.log(result);
            callback(result);
        });
    }



    //修改指定购物车信息的商品数量
    updateToShoppingCar(data, callback) {
        var sql = "";
        // console.log("updateToShoppingCar");
        // console.log(data.productID);
        if (data.tag == 1) {
            data.oldCount++;
            sql = `update shopping set productCount=${data.oldCount} where productId=${data.productID}`;
        } else if (data.oldCount <= 1) {
            callback("数量为1，不能再减少了，选择删除操作才能减为1");
            return
        }
        else if (data.tag == -1 && data.oldCount > 1) {
            data.oldCount--;
            sql = `update shopping set productCount=${data.oldCount} where productId=${data.productID}`;
        }
        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log("将数量修改为了" + data.oldCount);
            callback(result);
        });
    }


}

module.exports = ShoppingCarModel;