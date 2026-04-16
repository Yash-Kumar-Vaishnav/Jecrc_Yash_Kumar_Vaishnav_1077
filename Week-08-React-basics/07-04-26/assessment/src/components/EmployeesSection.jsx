import React, { useState } from 'react';
import { useEmployee } from '../contexts/EmployeeContext';
import { Edit2, Trash2, Plus, Search, X } from 'lucide-react';
import EmployeeForm from './EmployeeForm';
import '../styles/EmployeesSection.css';

const EmployeesSection = () => {
  const { employees, loading, deleteEmployee, searchEmployees } = useEmployee();
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const displayedEmployees = searchQuery 
    ? searchEmployees(searchQuery) 
    : employees;

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="employees-section">
      <div className="section-header">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name, email, department, or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="clear-btn"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="add-btn"
          disabled={loading}
        >
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      {showForm && (
        <EmployeeForm 
          employee={editingEmployee}
          onClose={closeForm}
        />
      )}

      <div className="employees-table-container">
        {displayedEmployees.length === 0 ? (
          <div className="no-employees">
            <p>No employees found</p>
          </div>
        ) : (
          <table className="employees-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedEmployees.map(employee => (
                <tr key={employee.id} className="employee-row">
                  <td className="emp-name">
                    <div className="emp-avatar-small">{employee.name.charAt(0)}</div>
                    {employee.name}
                  </td>
                  <td>{employee.email}</td>
                  <td>
                    <span className="badge">{employee.department}</span>
                  </td>
                  <td>{employee.position}</td>
                  <td className="salary">${employee.salary.toLocaleString()}</td>
                  <td>{new Date(employee.joinDate).toLocaleDateString()}</td>
                  <td className="actions">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="edit-btn"
                      disabled={loading}
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="delete-btn"
                      disabled={loading}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="employees-footer">
        <p>Total: <strong>{displayedEmployees.length}</strong> employee(s)</p>
      </div>
    </div>
  );
};

export default EmployeesSection;
