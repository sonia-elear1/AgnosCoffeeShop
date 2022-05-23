"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateOrderStatus = exports.getOrder = exports.createOrder = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _ordersSchema = require("../../schema/orders-schema");

var _usersSchema = require("../../schema/users-schema");

var _constants = require("../../utils/constants");

var _customApiErrors = require("../../utils/custom-api-errors");

var _ordersService = require("./orders-service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// CREATE NEW ORDER API 
var createOrder = exports.createOrder = function createOrder(req, res) {
    var contactNumber = req.body.contactNumber;
    var firstName = req.body.firstName;
    var productIds = req.body.productIds;
    var paymentType = req.body.paymentType;
    var lastName = void 0,
        userDetails = void 0,
        products = void 0,
        estimatedTime = void 0;

    if (req.body.lastName) {
        lastName = req.body.lastName;
    }

    // Check if contactNumber is present
    if (contactNumber === undefined) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.MISSING_PARAM, fieldName: "contactNumber" });
    }

    // Check if productIds is present
    if (productIds === undefined) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.MISSING_PARAM, fieldName: "productIds" });
    }
    // Check if paymentType is present
    if (paymentType === undefined) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.MISSING_PARAM, fieldName: "paymentType" });
    }
    // Check if firstName is present
    if (firstName === undefined) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.MISSING_PARAM, fieldName: "firstName" });
    }

    // Check if contactNumber is present
    if (typeof contactNumber !== 'string' || contactNumber.length !== 10) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "contactNumber" });
    }

    // Check if productIds is present
    if (productIds.length < 1) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "productIds" });
    }
    // Check if paymentType is present
    if (typeof paymentType !== 'string' || ![_constants.Constants.paymentTypes.CASH, _constants.Constants.paymentTypes.CARD, _constants.Constants.paymentTypes.UPI].includes(paymentType)) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "paymentType" });
    }
    // Check if firstName is present
    if (typeof firstName !== 'string' || firstName.length < 4 || firstName.length > 50) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "firstName" });
    }
    // Check if lastName is present
    if (lastName && (typeof lastName !== 'string' || lastName.length < 4 || lastName.length > 50)) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "lastName" });
    }

    return _usersSchema.Users.findByContactNumber(contactNumber).then(function (userInfo) {
        if (!userInfo) {
            var user = new _usersSchema.Users();
            user.firstName = firstName;
            if (lastName) {
                user.contactNumber = contactNumber;
                user.lastName = lastName;
            }
            return _usersSchema.Users.createUser(user);
        }
        return _promise2.default.resolve(userInfo);
    }).then(function (userRecord) {
        if (!userRecord) {
            return _promise2.default.reject(_customApiErrors.CustomErrorCode.DATABASE_ERROR);
        }
        userDetails = userRecord;
        return (0, _ordersService.validateProductId)(productIds);
    }).then(function (validateProduct) {
        if (!validateProduct) {
            return _promise2.default.reject(_customApiErrors.CustomErrorCode.INVALID_PRODUCTS);
        }
        products = validateProduct;
        estimatedTime = (0, _ordersService.getEstimatedTime)(products);
        return (0, _ordersService.calculateBill)(products);
    }).then(function (bill) {
        if (bill.freeItemsId) {
            productIds.push.apply(productIds, (0, _toConsumableArray3.default)(bill.freeItemsId));
        }
        var order = new _ordersSchema.Orders();
        order.userId = userDetails._id;
        order.productIds = productIds;
        order.paymentType = paymentType;
        order.estimatedTime = estimatedTime;
        order.billGenerated = bill.billGenerated;
        return _ordersSchema.Orders.createOrder(order);
    }).then(function (order) {
        return res.status(_constants.HttpStatus.OK).send(order);
    }).catch(function (error) {
        return res.status(error.httpstatus).send(error);
    });
}; /*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Controller function of orders api
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/
var getOrder = exports.getOrder = function getOrder(req, res) {
    var orderId = req.params.id;
    if (!(0, _constants.isMongodbId)(orderId)) {
        return res.status(_constants.HttpStatus.BAD_REQUEST).send({ error: _customApiErrors.CustomErrorCode.INVALID_INPUT, fieldName: "orderId" });
    }
    return _ordersSchema.Orders.findByOrderId(orderId).then(function (order) {
        return res.status(_constants.HttpStatus.OK).send(order);
    }).catch(function (error) {
        return _promise2.default.reject(error);
    });
};

/**
 * UPDATE ORDER STATUS AFTER EVERY 5 MIN USING CRON JOB
 */
var updateOrderStatus = exports.updateOrderStatus = function updateOrderStatus(req, res) {
    return _ordersSchema.Orders.findAndUpdate().then(function (respo) {
        return _ordersSchema.Orders.findReadyOrders();
    }).then(function (order) {
        var userIds = order.map(function (value) {
            return value.userId;
        });
        return _usersSchema.Users.findByuserId(userIds);
    }).then(function (users) {
        var contactNumbers = users.map(function (value) {
            return value.contactNumber;
        });
        var message = "YOUR ORDER IS READY \n        THANKS FOR ORDERING FROM AGNOS COFFEE SHOP";
        // TODO: send message to contact number
        return res.status(_constants.HttpStatus.OK).send({ contactNumbers: contactNumbers, message: message });
    }).catch(function (error) {
        return res.status(error.httpstatus).send(error);
    });
};