import React from 'react';
import { useEmployee } from '../contexts/EmployeeContext';
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import '../styles/AnalyticsSection.css';

const AnalyticsSection = () => {
  const { employees, getStatistics } = useEmployee();
  const stats = getStatistics();

  // Calculate department distribution
  const departmentDistribution = stats.departments.map(dept => {
    const count = employees.filter(emp => emp.department === dept).length;
    return {
      name: dept,
      count,
      percentage: (count / employees.length) * 100
    };
  });

  // Calculate salary distribution
  const salaryRanges = [
    { range: '$0 - $50K', min: 0, max: 50000, count: 0 },
    { range: '$50K - $100K', min: 50000, max: 100000, count: 0 },
    { range: '$100K - $150K', min: 100000, max: 150000, count: 0 },
    { range: '$150K+', min: 150000, max: Infinity, count: 0 }
  ];

  employees.forEach(emp => {
    salaryRanges.forEach(range => {
      if (emp.salary >= range.min && emp.salary < range.max) {
        range.count++;
      }
    });
  });

  // Get highest and lowest paid employees
  const sortedBySalary = [...employees].sort((a, b) => b.salary - a.salary);
  const highestPaid = sortedBySalary.slice(0, 3);
  const lowestPaid = sortedBySalary.slice(-3).reverse();

  return (
    <div className="analytics-section">
      <div className="analytics-grid">
        <div className="analytics-card large">
          <div className="card-header">
            <h3>
              <BarChart3 size={20} />
              Department Distribution
            </h3>
          </div>
          <div className="department-chart">
            {departmentDistribution.map((dept, idx) => (
              <div key={idx} className="dept-item">
                <div className="dept-info">
                  <span className="dept-name">{dept.name}</span>
                  <span className="dept-count">{dept.count} employees</span>
                </div>
                <div className="bar-container">
                  <div 
                    className="bar-fill"
                    style={{
                      width: `${dept.percentage}%`,
                      backgroundColor: `hsl(${idx * 60}, 70%, 60%)`
                    }}
                  ></div>
                </div>
                <span className="dept-percent">{dept.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card large">
          <div className="card-header">
            <h3>
              <TrendingUp size={20} />
              Salary Distribution by Range
            </h3>
          </div>
          <div className="salary-chart">
            {salaryRanges.map((range, idx) => (
              <div key={idx} className="salary-item">
                <div className="salary-info">
                  <span className="salary-range">{range.range}</span>
                  <span className="salary-count">{range.count} employees</span>
                </div>
                <div className="bar-container">
                  <div 
                    className="bar-fill salary-bar"
                    style={{
                      width: `${(range.count / employees.length) * 100}%`,
                      backgroundColor: `hsl(${200 + idx * 30}, 65%, 55%)`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="card-header">
            <h3>
              <PieChartIcon size={20} />
              Top Earners
            </h3>
          </div>
          <div className="list-container">
            {highestPaid.map((emp, idx) => (
              <div key={emp.id} className="list-item top-earner">
                <div className="rank-badge">{idx + 1}</div>
                <div className="emp-info">
                  <p className="emp-name">{emp.name}</p>
                  <p className="emp-role">{emp.position}</p>
                </div>
                <div className="emp-salary">${emp.salary.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-header">
            <h3>
              <PieChartIcon size={20} />
              Lowest Salary Range
            </h3>
          </div>
          <div className="list-container">
            {lowestPaid.map((emp, idx) => (
              <div key={emp.id} className="list-item">
                <div className="rank-badge lower">{employees.length - idx}</div>
                <div className="emp-info">
                  <p className="emp-name">{emp.name}</p>
                  <p className="emp-role">{emp.position}</p>
                </div>
                <div className="emp-salary">${emp.salary.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card full-width">
          <div className="card-header">
            <h3>Summary Statistics</h3>
          </div>
          <div className="summary-grid">
            <div className="summary-item">
              <p className="summary-label">Total Employees</p>
              <p className="summary-value">{stats.totalEmployees}</p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Active Departments</p>
              <p className="summary-value">{stats.totalDepartments}</p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Average Salary</p>
              <p className="summary-value">${stats.averageSalary.toLocaleString()}</p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Highest Salary</p>
              <p className="summary-value">${stats.highestSalary.toLocaleString()}</p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Salary Range</p>
              <p className="summary-value">${(stats.highestSalary - Math.min(...employees.map(e => e.salary))).toLocaleString()}</p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Total Salary Cost</p>
              <p className="summary-value">${employees.reduce((sum, e) => sum + e.salary, 0).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
