import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee } from '../redux/slices/employeeSlice';
import './EmployeeList.css';

const EmployeeList = ({ onEdit }) => {
  const employees = useSelector((state) => state.employees?.employees || []);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <div className="employee-list-container">
      <h2>👥 Employee List ({employees.length})</h2>
      {employees.length === 0 ? (
        <div className="empty-state">No employees found. Click "Add Employee" to get started!</div>
      ) : (
        <div className="table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department || '-'}</td>
                  <td className="actions">
                    <button className="btn-edit" onClick={() => onEdit(emp)}>✏️ Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(emp.id)}>🗑️ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;