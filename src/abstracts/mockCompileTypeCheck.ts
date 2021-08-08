
// type Split<S extends string, D extends string> =
//     string extends S ? string[] :
//         S extends '' ? [] :
//             S extends `${infer T}${D}${infer U}` ?  [T, ...Split<U, D>] :  [S];

// tables: 
// Marks
// test_id,student_id,mark
// 1,1,78
// 2,1,87
// 3,1,95
// 4,1,32
// 5,1,65
// 6,1,78
// 7,1,40
// 1,2,78
// 2,2,87
// 3,2,15
// 6,2,78
// 7,2,40
// 1,3,78
// 2,3,87
// 3,3,95
// 4,3,32
// 5,3,65
// 6,3,78
// 7,3,40

// Courses
// id,name,teacher
// 1,Biology,Mr. D
// 2,History, Mrs. P
// 3,Math, Mrs. C

// Students
// id,name
// 1,A
// 2,B
// 3,C

// Tests
// id,course_id,weight
// 1,1,10
// 2,1,40
// 3,1,50
// 4,2,40
// 5,2,60
// 6,3,90
// 7,3,10





SELECT students.id, students.name, AVG() as totalAverage, as courses
FROM students
ORDER BY id DESC

SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;

{
  "students": [
    {
      "id": 1,
      "name": "A",
      "totalAverage": 72.03,
      "courses": [
        {
          "id": 1,
          "name": "Biology",
          "teacher": "Mr. D",
          "courseAverage": 90.1
        },
        {
          "id": 3,
          "name": "Math",
          "teacher": "Mrs. C",
          "courseAverage": 74.2
        },
        {
          "id": 2,
          "name": "History",
          "teacher": "Mrs. P",
          "courseAverage": 51.8
        }
      ]
    },
    {
      "id": 2,