var Mark = require("./Mark");
var Student = /** @class */ (function () {
    function Student(id, name) {
        this.id = Number(id);
        this.name = name;
        this.totalAverage = NaN;
        this.courses = [];
    }
    return Student;
}());
module.exports = Student;
