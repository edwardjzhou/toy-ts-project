var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var Course = require("./Course");
var Test = /** @class */ (function () {
    function Test(id, course_id, weight) {
        this.id = Number(id);
        this.course_id = Number(course_id);
        this.weight = Number(weight);
    }
    Object.defineProperty(Test.prototype, "course", {
        // a test belongs to one course
        get: function () {
            this._course || (this._course = Course.indexToRowMap.get(this.course_id));
            return this._course;
        },
        enumerable: false,
        configurable: true
    });
    // validates that the weights of all tests of a course add to exactly 100
    Test.validateTestWeights = function () {
        var _a;
        var map = new Map(); // maps a course to all of its tests' cumulative weight
        for (var _i = 0, _b = __spreadArray([], Test.indexToRowMap.values()); _i < _b.length; _i++) {
            var test = _b[_i];
            var thisTestsCourseId = test.course_id;
            var thisTestsWeight = test.weight;
            var oldAccumWeightForThisCourseId = (_a = map.get(thisTestsCourseId)) !== null && _a !== void 0 ? _a : 0;
            var newAccumWeightForThisCourseId = oldAccumWeightForThisCourseId + thisTestsWeight;
            map.set(thisTestsCourseId, newAccumWeightForThisCourseId);
        }
        for (var _c = 0, map_1 = map; _c < map_1.length; _c++) {
            var _d = map_1[_c], course_id = _d[0], accumWeight = _d[1];
            if (accumWeight !== 100)
                return false;
        }
        return true;
    };
    return Test;
}());
module.exports = Test;
