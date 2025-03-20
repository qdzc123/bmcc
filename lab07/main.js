const Student = require('./student');
const Course = require('./course');

async function run() {
  // Create course and students
  const course = new Course("Math 101", "Algebra Basics", 3);
  course.addStudent(new Student("John Doe", 20, ["Algebra", "Calculus"]));
  course.addStudent(new Student("Jane Smith", 22, ["Geometry", "Statistics"]));

  // Save course to file
  await course.saveToFile('course.json');

  // Load course from file
  const loadedCourse = await Course.loadFromFile('course.json');
  console.log("\nLoaded Course Details:", loadedCourse);

  // Display each student
  console.log("\nStudents in loaded course:");
  loadedCourse.students.forEach((s, idx) => {
    console.log(`${idx + 1}. ${s.name}, Age: ${s.age}, Subjects: ${s.subjects.join(", ")}`);
  });
}

run();