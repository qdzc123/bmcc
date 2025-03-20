const Student = require('./student');
const Course = require('./course');

// Create students
const student1 = new Student("Alice", 22, ["Math", "English"]);
const student2 = new Student("Bob", 24);
student2.addSubject("Computer Science");
student2.addSubject("History");

// Create a course
const course = new Course("Web Programming II", "OOP and JSON in Node.js", "8 weeks");
course.addStudent(student1);
course.addStudent(student2);

// Average age
console.log("Average age of students:", course.getAverageAge());

// Serialize to JSON
const courseJSON = course.toJSON();
console.log("\nSerialized Course:\n", courseJSON);

// Deserialize from JSON
const loadedCourse = Course.fromJSON(courseJSON);
console.log("\nLoaded Course Object:", loadedCourse);

// Display each student
console.log("\nStudents in loaded course:");
loadedCourse.students.forEach((s, idx) => {
  console.log(`${idx + 1}. ${s.name}, Age: ${s.age}, Subjects: ${s.subjects.join(", ")}`);
});