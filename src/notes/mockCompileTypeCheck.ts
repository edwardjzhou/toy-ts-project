as T is type ASSERTIon not casting (treat x like T even if its NOT)

//  SQL NOTES
// FILTER (WHERE course_id=3)
// ROUND()
// join decomposition = many small querys

// STUFF()
// SELECT STUFF('abcdefg',2, 3, 'NEW');
// --starting with the 2nd character, delete 3 chars and stick NEW there


SELECT * 
FROM (VALUES (1,2), (3,4)) as asdf

SELECT *
FROM "fmlfmlfml/asdf".students as students,
"fmlfmlfml/asdf".marks as marks,


WITH t AS (
    SELECT 1 n, 1 g, 1 v
) SELECT * FROM t

n	g	v
1	1	1

// Marks (19 ct.)
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
SELECT COUNT(c.*) = (SELECT COUNT(*) FROM "fmlfmlfml/asdf".courses)
FROM "fmlfmlfml/asdf".courses AS c
JOIN (
        SELECT t.course_id
        FROM "fmlfmlfml/asdf".tests AS t
        GROUP BY t.course_id
        HAVING SUM(t.weight) = 100
    ) as RESULT 
    ON c.id = RESULT.course_id 
//OR
SELECT COUNT(c.*) = (SELECT COUNT(*) FROM "fmlfmlfml/asdf".courses)
FROM "fmlfmlfml/asdf".courses AS c
WHERE (
        SELECT SUM(t.weight)
        FROM "fmlfmlfml/asdf".tests AS t
        WHERE t.course_id = c.id
    ) = 100


// JOINS TABLE
  FROM "fmlfmlfml/asdf".courses AS courses
  JOIN "fmlfmlfml/asdf".tests AS tests ON courses.id = tests.course_id
  JOIN "fmlfmlfml/asdf".marks AS marks ON tests.id = marks.test_id
  JOIN "fmlfmlfml/asdf".students AS students ON marks.student_id = students.id

  // FIND UNIQUE COURSES A STUDENT IS ENROLLED IN
Student.courses = (S: Student): Course[]
  SELECT DISTINCT courses.*
  FROM "fmlfmlfml/asdf".courses AS courses
  JOIN "fmlfmlfml/asdf".tests AS tests ON courses.id = tests.course_id
  JOIN "fmlfmlfml/asdf".marks AS marks ON tests.id = marks.test_id
  WHERE marks.student_id = S.id
// OR
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
// OR

(
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


// EXAMPLE CORRELATED: subquery in where's WHERE depends on an unrelated outside 
SELECT last_name, salary, department_id
 FROM employees outer
 WHERE salary >
                (SELECT AVG(salary)
                 FROM employees
                 WHERE department_id =
                        outer.department_id);


//ALL IN
SELECT s.id, s.name, AVG() as totalAverage, as courses
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