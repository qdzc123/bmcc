// course.js
const Student = require('./student');

class Course {
  constructor(title, description, duration) {
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.students = [];
  }

  addStudent(student) {
    if (student instanceof Student) {
      this.students.push(student);
    } else {
      throw new Error("Only instances of Student can be added");
    }
  }

  getAverageAge() {
    if (this.students.length === 0) return 0;
    const totalAge = this.students.reduce((sum, student) => sum + student.age, 0);
    return totalAge / this.students.length;
  }

  toJSON() {
    return JSON.stringify({
      title: this.title,
      description: this.description,
      duration: this.duration,
      students: this.students
    }, null, 2);
  }

  static fromJSON(jsonStr) {
    const data = JSON.parse(jsonStr);
    const course = new Course(data.title, data.description, data.duration);
    data.students.forEach(s => {
      const student = new Student(s.name, s.age, s.subjects);
      course.addStudent(student);
    });
    return course;
  }
}

module.exports = Course;

