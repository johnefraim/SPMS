import React from 'react';

interface Student {
  name: string;
  skills: string[];
}

interface StudentListProps {
  students: Student[];
}

const StudentList: React.FC<StudentListProps> = ({ students }) => {
  return (
    <ul>
      {students.map(student => (
        <li key={student.name}>
          <h2>{student.name}</h2>
          <p>Skills: {student.skills.join(', ')}</p>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;