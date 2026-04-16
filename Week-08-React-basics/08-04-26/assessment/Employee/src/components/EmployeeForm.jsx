import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee, editEmployee } from '../redux/slices/employeeSlice';
import { setLoading } from '../redux/slices/uiSlice';
import './EmployeeForm.css';

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPosition(employee.position);
      setDepartment(employee.department || '');
    } else {
      setName('');
      setPosition('');
      setDepartment('');
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !position.trim()) {
      alert('Please fill all fields');
      return;
    }

    dispatch(setLoading(true));
    
    setTimeout(() => {
      const employeeData = { name, position, department };
      
      if (employee) {
        dispatch(editEmployee({ id: employee.id, updatedEmployee: employeeData }));
      } else {
        dispatch(addEmployee({ id: Date.now(), ...employeeData }));
      }
      
      dispatch(setLoading(false));
      onSave();
    }, 500);
  };

  return (
    <div className="form-overlay">
      <form className="employee-form" onSubmit={handleSubmit}>
        <h2>{employee ? '✏️ Edit Employee' : '➕ Add New Employee'}</h2>
        
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            placeholder="Job Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-save">Save</button>
          <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;