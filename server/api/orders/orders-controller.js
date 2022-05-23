/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Controller function of orders api
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/
import { Orders } from "../../schema/orders-schema";
import { Users } from "../../schema/users-schema";
import { Constants, HttpStatus, isMongodbId } from "../../utils/constants";
import { CustomErrorCode } from "../../utils/custom-api-errors";
import { validateProductId, getEstimatedTime, calculateBill } from "./orders-service";


// CREATE NEW ORDER API 
export const createOrder = (req, res) => {
    let contactNumber = req.body.contactNumber;
    let firstName = req.body.firstName;
    let productIds = req.body.productIds;
    let paymentType = req.body.paymentType;
    let lastName, userDetails, products, estimatedTime;

    if (req.body.lastName) {
        lastName = req.body.lastName;
    }

    // Check if contactNumber is present
    if (contactNumber === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.MISSING_PARAM, fieldName: "contactNumber" });
    }

    // Check if productIds is present
    if (productIds === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.MISSING_PARAM, fieldName: "productIds" });
    }
    // Check if paymentType is present
    if (paymentType === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.MISSING_PARAM, fieldName: "paymentType" });
    }
    // Check if firstName is present
    if (firstName === undefined) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.MISSING_PARAM, fieldName: "firstName" });
    }

    // Check if contactNumber is present
    if (typeof (contactNumber) !== 'string' || contactNumber.length !== 10) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "contactNumber" });
    }

    // Check if productIds is present
    if (productIds.length < 1) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "productIds" });
    }
    // Check if paymentType is present
    if (typeof paymentType !== 'string' ||
        !([Constants.paymentTypes.CASH, Constants.paymentTypes.CARD, Constants.paymentTypes.UPI].includes(paymentType))) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "paymentType" });
    }
    // Check if firstName is present
    if (typeof firstName !== 'string' || firstName.length < 4 || firstName.length > 50) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "firstName" });
    }
    // Check if lastName is present
    if (lastName && (typeof lastName !== 'string' || lastName.length < 4 || lastName.length > 50)) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "lastName" });
    }

    return Users.findByContactNumber(contactNumber).then((userInfo) => {
        if (!userInfo) {
            let user = new Users();
            user.firstName = firstName;
            if (lastName) {
                user.contactNumber = contactNumber
                user.lastName = lastName
            }
            return Users.createUser(user);
        }
        return Promise.resolve(userInfo)
    }).then((userRecord) => {
        if (!userRecord) {
            return Promise.reject(CustomErrorCode.DATABASE_ERROR)
        }
        userDetails = userRecord;
        return validateProductId(productIds)
    }).then((validateProduct) => {
        if (!validateProduct) {
            return Promise.reject(CustomErrorCode.INVALID_PRODUCTS)
        }
        products = validateProduct;
        estimatedTime = getEstimatedTime(products)
        return calculateBill(products);
    }).then((bill) => {
        if (bill.freeItemsId) {
            productIds.push(...bill.freeItemsId)
        }
        let order = new Orders();
        order.userId = userDetails._id;
        order.productIds = productIds;
        order.paymentType = paymentType;
        order.estimatedTime = estimatedTime;
        order.billGenerated = bill.billGenerated
        return Orders.createOrder(order)
    }).then((order) => {
        return res.status(HttpStatus.OK).send(order);
    }).catch((error) => {
        return res.status(error.httpstatus).send(error);
    });

}

export const getOrder = (req, res) => {
    let orderId = req.params.id;
    if(!isMongodbId(orderId)) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: CustomErrorCode.INVALID_INPUT, fieldName: "orderId" });
    }
    return Orders.findByOrderId(orderId).then((order) => {
        return res.status(HttpStatus.OK).send(order);
    }).catch((error) => {
        return Promise.reject(error);
    })
}

/**
 * UPDATE ORDER STATUS AFTER EVERY 5 MIN USING CRON JOB
 */
export const updateOrderStatus = (req, res) => {
    return Orders.findAndUpdate().then((respo) => {
        return Orders.findReadyOrders();
    }).then((order) => {
        let userIds = order.map(value => value.userId);
        return Users.findByuserId(userIds)
    }).then((users) => {
        let contactNumbers = users.map(value => value.contactNumber)
        let message = `YOUR ORDER IS READY 
        THANKS FOR ORDERING FROM AGNOS COFFEE SHOP`;
        // TODO: send message to contact number
        return res.status(HttpStatus.OK).send({contactNumbers, message});
    }).catch((error) => {
        return res.status(error.httpstatus).send(error);
    });
}