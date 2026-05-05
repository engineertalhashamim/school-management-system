import Student from './student.model.js';
import Class from './class.model.js';
import Subject from './subject.model.js';
import Teacher from './teacher.model.js';

// Student - Class (One-to-Many)
Student.belongsTo(Class, { foreignKey: 'class_id' });
Class.hasMany(Student, { foreignKey: 'class_id' });

// Class - Subject (Many-to-Many)
Class.belongsToMany(Subject, { 
  through: 'class_subjects', 
  foreignKey: 'class_id', 
  otherKey: 'subject_id' 
});

Subject.belongsToMany(Class, { 
  through: 'class_subjects', 
  foreignKey: 'subject_id', 
  otherKey: 'class_id' 
});

// Teacher - Class (Many-to-Many)
Teacher.belongsToMany(Class, { 
  through: 'teacher_classes', 
  foreignKey: 'teacher_id', 
  otherKey: 'class_id' 
});

Class.belongsToMany(Teacher, { 
  through: 'teacher_classes', 
  foreignKey: 'class_id', 
  otherKey: 'teacher_id' 
});

// Teacher - Subject (Many-to-Many)
Teacher.belongsToMany(Subject, { 
  through: 'teacher_subjects', 
  foreignKey: 'teacher_id', 
  otherKey: 'subject_id' 
});

Subject.belongsToMany(Teacher, { 
  through: 'teacher_subjects', 
  foreignKey: 'subject_id', 
  otherKey: 'teacher_id' 
});