import { useState, useEffect } from 'react';
import { useEmployees } from '../contexts/EmployeeContext';
import { useAuth } from '../contexts/AuthContext';
import './EmployeeForm.css';

const EmployeeForm = ({ employeeId, onClose }) => {
  const { addEmployee, updateEmployee, getEmployee, loading } = useEmployees();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    userId: user?.id || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employeeId) {
      const emp = getEmployee(employeeId);
      if (emp) {
        setFormData({
          name: emp.name,
          email: emp.email,
          department: emp.department,
          position: emp.position,
          userId: emp.userId,
        });
      }
    }
  }, [employeeId, getEmployee]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (employeeId) {
      updateEmployee(employeeId, formData);
    } else {
      addEmployee(formData);
    }
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h3>{employeeId ? 'Edit Employee' : 'Add Employee'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            {errors.department && <span className="error">{errors.department}</span>}
          </div>
          <div className="form-group">
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
            {errors.position && <span className="error">{errors.position}</span>}
          </div>
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;