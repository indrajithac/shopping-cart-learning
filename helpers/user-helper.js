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
        return new Promise(async (resolve, reject) => {
            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: objectId(userId) })
            if (userCart) {
                db.get().collection(collection.CART_COLLECTION).updateOne({ user: objectId(userId) },
                    {

                        $push: { product: objectId(proId) }

                    }
                ).then((response) => {
                    resolve()
                })
            } else {
                let cartObj = {
                    user: objectId(userId),
                    product: [objectId(proId)]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response) => {
                    resolve()
                })
            }
        })
    },
    getCartProduct: (userId) => {
        return new Promise(async(resolve, reject) => {
            let cartItems=await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match:{user:objectId(userId)}
                } ,
                {
                    $lookup:{
                        from:collection.PRODUCT_COLLECTION,
                        let:{productList:'$product'},
                        pipeline:[
                            {
                                $match:{
                                    $expr:{
                                        $in:['$_id',"$$productList"]
                                    }
                                }
                            }
                        ],
                        as: 'cartItems'
                    }
                }
            ]).toArray()
            resolve(cartItems[0].cartItems)
        })
    }
}