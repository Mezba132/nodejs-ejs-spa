const fs = require("fs");
const path = require("path");
const rootDir = require("../helper/path");

const p = path.join(rootDir, 'Data', "cart.json");


module.exports = class cart {
    static addItem(id, itemPrice) {
        // fetch the previous cart
        fs.readFile(p, (err, data) =>{
            let cart = {item : [], totalPrice : 0};
            if(!err)
            {
                cart = JSON.parse(data);
            }

            // Analyze the cart => find the existing cart
            const existingCartIndex = cart.item.findIndex( ci => ci.id === id);
            console.log(existingCartIndex);
            const existingCart = cart.item[existingCartIndex];
            console.log(existingCartIndex);
            let updateCart;

            // Add New cart
            if(existingCart)
            {
                updateCart = {...existingCart};
                updateCart.quantity = updateCart.quantity + 1;
                cart.item = [...cart.item];
                cart.item[existingCartIndex] = updateCart;
            }
            else
            {
                updateCart = { id : id, quantity : 1 };
                cart.item = [...cart.item, updateCart];
            }
            cart.totalPrice = cart.totalPrice + + itemPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }
}