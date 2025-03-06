"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum_to_n_c = exports.sum_to_n_b = exports.sum_to_n_a = void 0;
var sum_to_n_a = function (n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};
exports.sum_to_n_a = sum_to_n_a;
var sum_to_n_b = function (n) {
    return (n * (n + 1)) / 2;
};
exports.sum_to_n_b = sum_to_n_b;
var sum_to_n_c = function (n) {
    if (n <= 0)
        return 0; // Handle the base case
    return n + (0, exports.sum_to_n_c)(n - 1); // Recursive call
};
exports.sum_to_n_c = sum_to_n_c;
console.log((0, exports.sum_to_n_a)(5)); // Outputs: 15
console.log((0, exports.sum_to_n_b)(5)); // Outputs: 15
console.log((0, exports.sum_to_n_c)(5)); // Outputs: 15
