const fs = require('fs/promises');
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

  async saveToFile(filename) {
    try {
      const jsonData = JSON.stringify({
        title: this.title,
        description: this.description,
        duration: this.duration,
        students: this.students
      }, null, 2);
      await fs.writeFile(filename, jsonData);
      console.log(`Course saved to ${filename}`);
    } catch (error) {
      console.error(`Error saving course: ${error}`);
    }
  }
  
  static async loadFromFile(filename) {
    const fs = require('fs/promises');
    try {
      const content = await fs.readFile(filename, 'utf-8');
      const { title, description, duration, students } = JSON.parse(content);
      const course = new Course(title, description, duration);
      course.students = students.map(s => new Student(s.name, s.age, s.subjects));
      return course;
    } catch (error) {
      console.error(`Error loading course from file: ${error}`);
    }
  }
}
module.exports = Course;

