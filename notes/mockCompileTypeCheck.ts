

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