/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Contains error codes of HTTP Status and customized
 * @author SONIA DUA, soniadua7913@gmail.com
*/
/*********************************************************************************/
/*===============================================================================*/


const CustomErrorCode = {
}

const HttpStatus = {
    "OK": 200,
    "BAD_REQUEST":400,
    "UNAUTHORIZED": 401,
    "FORBIDDEN": 403,
    "NOT_FOUND": 404,
    "INTERNAL_SERVER_ERROR": 500,
}

module.exports = {
    CustomErrorCode,
    HttpStatus
}