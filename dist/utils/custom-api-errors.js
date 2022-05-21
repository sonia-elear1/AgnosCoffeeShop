"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomErrorCode = undefined;

var _constants = require("./constants");

var CustomErrorCode = exports.CustomErrorCode = {

  "BAD_REQUEST": {
    "httpstatus": _constants.HttpStatus['BAD_REQUEST'],
    "code": 40000,
    "message": "Bad request"
  },

  "MISSING_PARAM": {
    "httpstatus": _constants.HttpStatus['BAD_REQUEST'],
    "code": 40001,
    "message": "Parameter is missing"
  },

  "INVALID_INPUT": {
    "httpstatus": _constants.HttpStatus['BAD_REQUEST'],
    "code": 40002,
    "message": "Input is invalid"
  },

  "INVALID_TAX_ID": {
    "httpstatus": _constants.HttpStatus['BAD_REQUEST'],
    "code": 40002,
    "message": "Tax Id is invalid"
  },

  "INVALID_OFFERS": {
    "httpstatus": _constants.HttpStatus['BAD_REQUEST'],
    "code": 40002,
    "message": "Offer array is invalid"
  },

  "DUPLICATE_DATA": {
    "httpstatus": _constants.HttpStatus['BAD_REQUEST'],
    "code": 40004,
    "message": "Data is already taken"
  },

  // HTTP Status 403 - FORBIDDEN
  "ACCESS_RESTRICTED": {
    "httpstatus": _constants.HttpStatus['FORBIDDEN'],
    "code": 40301,
    "message": "Operation not permitted"
  },

  // HTTP Status 404 - NOT_FOUND
  "NOT_FOUND": {
    "httpstatus": _constants.HttpStatus['NOT_FOUND'],
    "code": 40401,
    "message": "API not found"
  },

  // HTTP Status 500 - INTERNAL_SERVER_ERROR
  "INTERNAL_SERVER_ERROR": {
    "httpstatus": _constants.HttpStatus['INTERNAL_SERVER_ERROR'],
    "code": 50001,
    "message": "Internal server error"
  },

  // HTTP Status 503 - ['SERVICE_UNAVAILABLE']
  "DATABASE_ERROR": {
    "httpstatus": _constants.HttpStatus['SERVICE_UNAVAILABLE'],
    "code": 50301,
    "message": "Database temporarily unavailable"
  },
  "SERVER_ERROR": {
    "httpstatus": _constants.HttpStatus['SERVICE_UNAVAILABLE'],
    "code": 50302,
    "message": "Server is temporarily unavailable"
  },

  // HTTP status 504 - request timed out
  "REQUEST_TIMEOUT": {
    "httpstatus": _constants.HttpStatus['GATEWAY_TIMEOUT'],
    "code": 50401,
    "message": "Your command was successfully sent, but it timed out waiting" + " for a response."
  }
}; /*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains error codes of HTTP Status and customized
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/