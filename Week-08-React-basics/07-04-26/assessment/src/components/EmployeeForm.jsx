import React, { useState, useEffect } from 'react';
import { useEmployee } from '../contexts/EmployeeContext';
import { X, Save } from 'lucide-react';
import '../styles/EmployeeForm.css';

const EmployeeForm = ({ employee, onClose }) => {
  const { addEmployee, updateEmployee, loading } = useEmployee();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    salary: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        department: employee.department,
        position: employee.position,
        salary: employee.salary
      });
    }
  }, [employee]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.salary || formData.salary <= 0) newErrors.salary = 'Valid salary is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'salary') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (employee) {
      updateEmployee(employee.id, formData);
    } else {
      addEmployee(formData);
    }

    setFormData({
      name: '',
      email: '',
      department: '',
      position: '',
      salary: ''
    });
    onClose();
  };

  const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'];

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button onClick={onClose} className="close-btn" disabled={loading}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                disabled={loading}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                disabled={loading}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                disabled={loading}
                className={errors.department ? 'error' : ''}
              >
                <option value="">Select a department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <span className="error-msg">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="position">Position *</label>
              <input
                id="position"
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Senior Developer"
                disabled={loading}
                className={errors.position ? 'error' : ''}
              />
              {errors.position && <span className="error-msg">{errors.position}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="salary">Annual Salary ($) *</label>
            <input
              id="salary"
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="100000"
              disabled={loading}
              className={errors.salary ? 'error' : ''}
            />
            {errors.salary && <span className="error-msg">{errors.salary}</span>}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {employee ? 'Update' : 'Add'} Employee
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
