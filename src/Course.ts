class Course {
  id;
  name;
  teacher;
  
  static indexToRowMap;

  constructor(id, name, teacher){
    this.id = Number(id);
    this.name = name;
    this.teacher = teacher;
  }
}

module.exports = Course;