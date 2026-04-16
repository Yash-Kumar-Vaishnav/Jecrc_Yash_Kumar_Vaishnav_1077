import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEmployee } from '../contexts/EmployeeContext';
import { Users, TrendingUp, Calendar, Award } from 'lucide-react';
import '../styles/HomeSection.css';

const HomeSection = () => {
  const { user } = useAuth();
  const { getEmployees, getStatistics } = useEmployee();
  
  const employees = getEmployees();
  const stats = getStatistics();
  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="home-section">
      <div className="welcome-card">
        <div className="welcome-content">
          <h2>{getGreeting()}, {user?.name}! 👋</h2>
          <p>Welcome to the Internal Employee Portal. Manage and track employee information efficiently.</p>
        </div>
        <div className="welcome-time">
          <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon employees">
            <Users size={32} />
          </div>
          <div className="stat-content">
            <h3>Total Employees</h3>
            <p className="stat-value">{stats.totalEmployees}</p>
            <p className="stat-change">Active in system</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon departments">
            <Award size={32} />
          </div>
          <div className="stat-content">
            <h3>Departments</h3>
            <p className="stat-value">{stats.totalDepartments}</p>
            <p className="stat-change">Different divisions</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon salary">
            <TrendingUp size={32} />
          </div>
          <div className="stat-content">
            <h3>Average Salary</h3>
            <p className="stat-value">${stats.averageSalary?.toLocaleString()}</p>
            <p className="stat-change">Annual compensation</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon highest">
            <Calendar size={32} />
          </div>
          <div className="stat-content">
            <h3>Highest Salary</h3>
            <p className="stat-value">${stats.highestSalary?.toLocaleString()}</p>
            <p className="stat-change">Maximum salary</p>
          </div>
        </div>
      </div>

      <div className="recent-employees">
        <h3>Recent Employees</h3>
        <div className="employee-list-small">
          {employees.slice(0, 5).map(emp => (
            <div key={emp.id} className="employee-item-small">
              <div className="emp-avatar">{emp.name.charAt(0)}</div>
              <div className="emp-info-small">
                <p className="emp-name">{emp.name}</p>
                <p className="emp-dept">{emp.department}</p>
              </div>
              <div className="emp-position">{emp.position}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Quick Tips</h3>
          <ul>
            <li>Use the Employees section to manage records</li>
            <li>View analytics for departmental insights</li>
            <li>Update your preferences in Settings</li>
            <li>Switch between Light and Dark themes</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>Your Role</h3>
          <div className="role-info">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>ID:</strong> {user?.id}</p>
            <p><strong>Login Time:</strong> {user?.loginTime?.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
