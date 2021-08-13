// TABLES: 

import { or } from "../../usefulTypes"
import Student from "../models/Student"
import Test from "../models/Test"
// FILTER (WHERE course_id=3)

ROUND()

SELECT * 
FROM (VALUES (1,2), (3,4)) as asdf

SELECT *
FROM "fmlfmlfml/asdf".students as students,
"fmlfmlfml/asdf".marks as marks,


// Marks
// belongs_to_one TEST (FK), belongs_to_one STUDENT (FK)
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
// join decomposition = many small querys

// Courses
// has_many TESTS (PK)
// id,name,teacher
// 1,Biology,Mr. D
// 2,History, Mrs. P
// 3,Math, Mrs. C
  STUFF((
    SELECT ', ' + [courses.name] + ':' + CAST([Value] AS VARCHAR(MAX)) 
    FROM courses
    WHERE (ID = courses.id) 
    FOR XML PATH(''),TYPE).value('(./text())[1]','VARCHAR(MAX)')
  ,1,2,'') AS NameValues
  SELECT STUFF('SQL Tutorial!', 13, 1, ' is fun!');
// Students 
// has_many MARKS (PK)
// id,name
// 1,A
// 2,B
// 3,C

// Tests 
// belongs_to_one COURSE (FK);  has_many MARKS (PK)
// id,course_id,weight
// 1,1,10
// 2,1,40
// 3,1,50
// 4,2,40
// 5,2,60
// 6,3,90
// 7,3,10


// VALIDATION THAT EVERY COURSE HAS TESTS THAT SUM(WEIGHT) = 100
--SELECT COUNT(c.*) = (SELECT COUNT(*) FROM "fmlfmlfml/asdf".courses AS cc)
SELECT COUNT(c.*)
FROM "fmlfmlfml/asdf".courses AS c
JOIN (
        SELECT t.course_id
        FROM "fmlfmlfml/asdf".tests AS t
        GROUP BY t.course_id
        HAVING SUM(t.weight) = 100
    ) as RESULT 
    ON c.id = RESULT.course_id 



SELECT *
FROM "fmlfmlfml/asdf".courses AS courses
JOIN "fmlfmlfml/asdf".tests AS tests ON courses.id = tests.course_id
JOIN "fmlfmlfml/asdf".marks AS marks ON tests.id = marks.test_id
JOIN "fmlfmlfml/asdf".students AS students ON marks.student_id = students.id

// JOINS TABLE
//   FROM "fmlfmlfml/asdf".courses AS courses
//   JOIN "fmlfmlfml/asdf".tests AS tests ON courses.id = tests.course_id
//   JOIN "fmlfmlfml/asdf".marks AS marks ON tests.id = marks.test_id
//   JOIN "fmlfmlfml/asdf".students AS students ON marks.student_id = students.id

Student.courses (S: Student)
  SELECT DISTINCT courses.*
  FROM "fmlfmlfml/asdf".courses AS courses
  JOIN "fmlfmlfml/asdf".tests AS tests ON courses.id = tests.course_id
  JOIN "fmlfmlfml/asdf".marks AS marks ON tests.id = marks.test_id
  WHERE marks.student_id = S.id
OR
  SELECT courses.*
  FROM "fmlfmlfml/asdf".courses AS courses
  WHERE courses.id IN (
      SELECT tests.course_id
      FROM "fmlfmlfml/asdf".tests AS tests
      WHERE tests.id IN (
          SELECT marks.test_id
          FROM "fmlfmlfml/asdf".marks AS marks 
          WHERE marks.student_id = S.id
      )
  )
OR




SELECT *
FROM all_calcs
UNION ALL (
    SELECT *
    FROM 
    (
        SELECT t.student_id, t.course_id, t.teacher, AVG(t.mark)
        FROM 
            (SELECT * 
                FROM "fmlfmlfml/asdf".marks as marks
                JOIN "fmlfmlfml/asdf".tests as tests ON marks.test_id = tests.id
                JOIN "fmlfmlfml/asdf".courses as courses ON tests.course_id = courses.id 
                JOIN "fmlfmlfml/asdf".students as students ON marks.student_id = students.id
            ) as t
        GROUP BY t.student_id , t.course_id, t.teacher
    ) AS calc
) as all_calcs
--WHERE everything.student_id =
--(
    --SELECT DISTINCT all_calcs.student_id
    --LIMIT 1
--)
--UNION

SELECT last_name, salary, department_id
 FROM employees outer
 WHERE salary >
                (SELECT AVG(salary)
                 FROM employees
                 WHERE department_id =
                        outer.department_id);
// QUERIES

// Marks(student)
SELECT *
FROM Marks
WHERE Marks.student_id = Student.id

// Marks(student, test)
SELECT *
FROM Marks
JOIN Tests ON Marks.test_id = Test.id 
WHERE Marks.student_id = Student.id

// Marks(student, test)
SELECT * as everything
FROM Marks
JOIN Tests ON Marks.test_id = Test.id
JOIN Courses ON Tests.course_id = Courses.id 
JOIN Students ON Marks.id = Students.id


SELECT DISTINCT(Courses.course_id)
FROM everything
GROUP BY Students.id




SELECT students.id, students.name, AVG() as totalAverage, as courses
FROM students
ORDER BY id DESC



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