var db = require('../config/connection')
var collection = require('../config/collections')
const { resolve, reject } = require('promise')
var objectId = require('mongodb').ObjectID
const { response } = require('express')
const bcrypt = require('bcrypt')


module.exports = {
    doAdminSignup: (adminData) => {
        return new Promise(async (resolve, reject) => {
            adminData.password = await bcrypt.hash(adminData.password, 10)
            db.get().collection(collection.ADMIN_COLLECTION).insertOne(adminData).then((data) => {
                //console.log(data);
                resolve(data.insertedId)
            })


        })
    },
    doAdminLogin:(adminData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let admin = await db.get().collection(collection.ADMIN_COLLECTION).findOne({ email: adminData.email })
            if (admin) {
                bcrypt.compare(adminData.password, admin.password).then((status) => {
                    if (status) {
                        console.log('login success');
                        response.admin = admin
                        response.status = true
                        resolve(response)

                    } else {
                        console.log('wrong password');
                        resolve({ status: false })

                    }

                })
            } else {
                console.log('email doesnt exist');
                resolve({ status: false })

            }
        })
    },

    addProduct: (product, callback) => {
        //console.log(product)
        db.get().collection('product').insertOne(product).then((data) => {
            //console.log(data);
            callback(data.insertedId)
        })

    },
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: objectId(prodId) }).then((response) => {
                resolve(response)
            })
        })
    },
    getProductDetails: (proId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id: objectId(proId) }).then((product) => {
                resolve(product)
            })
        })
    },
    updateProduct: (proId, proDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne(
                { _id: objectId(proId) },
                {
                    $set: {
                        "name": proDetails.name,
                        "description": proDetails.description,
                        "category": proDetails.category,
                        "price": proDetails.price
                    }
                }
            ).then(() => {
                resolve()
            })
        })
    },
    getOrderDetails: () => {
        return new Promise(async (resolve, reject) => {
            let orders = await db.get().collection(collection.ORDER_COLLECTION).find().toArray()
            //console.log(orders);
            resolve(orders)
        })
    },
}