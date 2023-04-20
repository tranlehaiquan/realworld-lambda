"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.whoAmI = exports.signUp = exports.signIn = void 0;
// POST signIn
var signIn = function () {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "SignIn",
        }, null, 2),
    };
};
exports.signIn = signIn;
// POST signUp
var signUp = function () {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "SignUp",
        }, null, 2),
    };
};
exports.signUp = signUp;
// GET whoAmI
var whoAmI = function () {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "WhoAmI",
        }, null, 2),
    };
};
exports.whoAmI = whoAmI;
// PUT user
var updateUser = function () {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "UpdateCurrentUser",
        }, null, 2),
    };
};
exports.updateUser = updateUser;
//# sourceMappingURL=users.js.map