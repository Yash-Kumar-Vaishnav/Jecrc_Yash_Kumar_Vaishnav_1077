import { useEmployees } from '../contexts/EmployeeContext';
import './EmployeeList.css';

const EmployeeList = ({ onEdit }) => {
  const { employees, deleteEmployee } = useEmployees();

  return (
    <div className="employee-list">
      <h3>Employee List</h3>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>
                  <button onClick={() => onEdit(emp.id)}>Edit</button>
                  <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;