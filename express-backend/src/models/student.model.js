import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Class from './class.model.js';

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  roll_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  class_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Class,
      key: 'id'
    }
  }
}, {
  tableName: 'students',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Student.belongsTo(Class, { foreignKey: 'class_id' });
Class.hasMany(Student, { foreignKey: 'class_id' });

export default Student;