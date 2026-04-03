import { useState } from 'react';
import { useEmployees } from '../contexts/EmployeeContext';
import { useAuth } from '../contexts/AuthContext';
import EmployeeForm from './EmployeeForm';
import './Dashboard.css';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { employees, loading } = useEmployees();
  const [editing, setEditing] = useState(false);

  const employee = employees.find(e => e.userId === user?.id);

  if (!employee) return <div>No profile found.</div>;

  return (
    <div className="dashboard">
      <h2>My Profile</h2>
      {loading && <div className="loading">Loading...</div>}
      <div className="employee-card">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <button onClick={() => setEditing(true)}>Edit Profile</button>
      </div>
      {editing && (
        <EmployeeForm
          employeeId={employee.id}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;