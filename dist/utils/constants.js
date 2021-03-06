"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMongodbId = exports.HttpStatus = exports.Constants = undefined;

var _validator = require("validator");

var Constants = exports.Constants = {

  productIds: {
    BEVERAGE: "BEV",
    SANDWICH: "SAND",
    BURGER: "BUR"
  },

  type: {
    VEGETARIAN: "VEG",
    NONVEGETARIAN: "NONVEG"
  },

  category: {
    BEVERAGE: "BEVERAGE",
    SANDWICH: "SANDWICH",
    BURGER: "BURGER"
  },

  paymentTypes: {
    CASH: "CASH",
    CARD: "CARD",
    UPI: "UPI"
  },

  orderStatus: {
    RECIEVED: "ORDER RECEIVED",
    READY: "ORDER READY"
  },

  discountType: {
    FIXED: "FIXED",
    PERCENT: "PERCENT",
    FREE: "FREE"
  }
}; /*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains constants for project
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/

var HttpStatus = exports.HttpStatus = {
  "OK": 200,
  "BAD_REQUEST": 400,
  "UNAUTHORIZED": 401,
  "FORBIDDEN": 403,
  "NOT_FOUND": 404,
  "INTERNAL_SERVER_ERROR": 500,
  "SERVICE_UNAVAILABLE": 503,
  "GATEWAY_TIMEOUT": 504
};

var isMongodbId = exports.isMongodbId = function isMongodbId(id) {
  return typeof id === 'string' && (0, _validator.isHexadecimal)(id) && id.length === 24;
};