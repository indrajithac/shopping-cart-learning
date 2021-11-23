var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const { resolve, reject } = require('promise')
const { use } = require('../routes/user')
var objectId = require('mongodb').ObjectID
const { response } = require('express')

module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                //console.log(data);
                resolve(data.insertedId)
            })


        })
    },
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log('login success');
                        response.user = user
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
    addToCart: (proId, userId) => {
        let proObj = {
            item: objectId(proId),
            quantity: 1
        }

        return new Promise(async (resolve, reject) => {
            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: objectId(userId) })
            if (userCart) {
                let proExists = userCart.product.findIndex(product => product.item == proId)
                if (proExists != -1) {
                    db.get().collection(collection.CART_COLLECTION).updateOne({ user: objectId(userId), 'product.item': objectId(proId) },
                        {
                            $inc: { 'product.$.quantity': 1 }
                        }
                    ).then(() => {
                        resolve()
                    })

                } else {
                    db.get().collection(collection.CART_COLLECTION).updateOne({ user: objectId(userId) },
                        {

                            $push: { product: proObj }

                        }
                    ).then((response) => {
                        resolve()
                    })

                }
            } else {
                let cartObj = {
                    user: objectId(userId),
                    product: [proObj]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response) => {
                    resolve()
                })
            }
        })
    },
    getCartProduct: (userId) => {
        return new Promise(async (resolve, reject) => {
            let cartItems = await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match: { user: objectId(userId) }
                },
                {
                    $unwind: '$product'
                },
                {
                    $project: {
                        item: '$product.item',
                        quantity: '$product.quantity'
                    }
                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'oneProduct'
                    }
                },
                {
                    $project: {
                        item: 1, quantity: 1, oneProduct: { $arrayElemAt: ['$oneProduct', 0] }

                    }
                }
                /*{
                    $lookup: {
                        from: collection.PRODUCT_COLLECTION,
                        let: { productList: '$product' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$_id', "$$productList"]
                                    }
                                }
                            }
                        ],
                        as: 'cartItems'
                    }
                }*/

            ]).toArray()
            //console.log(cartItems);
            resolve(cartItems)
        })
    },
    getCartCount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let count = 0
            let cart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: objectId(userId) })
            if (cart) {
                count = cart.product.length
            }
            resolve(count)
        })
    },
    changeProductQuantity: (details) => {
        //console.log(details);
        details.count = parseInt(details.count)
        details.quantity = parseInt(details.quantity)

        return new Promise((resolve, reject) => {
            if (details.count == -1 && details.quantity == 1) {
                db.get().collection(collection.CART_COLLECTION).updateOne({ _id: objectId(details.cart) },
                    {
                        $pull: { product: { item: objectId(details.oneProduct) } }
                    }
                ).then((response) => {

                    resolve({ removeProduct: true })
                })

            } else {
                db.get().collection(collection.CART_COLLECTION).updateOne({ _id: objectId(details.cart), 'product.item': objectId(details.oneProduct) },
                    {
                        $inc: { 'product.$.quantity': details.count }
                    }
                ).then((response) => {
                    resolve(true)
                })
            }
        })
    }
}