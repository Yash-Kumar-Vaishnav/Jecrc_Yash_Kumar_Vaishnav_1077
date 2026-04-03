import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#007bff', color: 'white' }}>
        <h1>Employee Portal</h1>
        <div>
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} style={{ marginLeft: '1rem', padding: '0.5rem' }}>Logout</button>
        </div>
      </header>
      {user?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
    </div>
  );
};

export default Dashboard;