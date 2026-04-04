import React, { useState, useEffect } from 'react';
import { reportAPI } from '../services/api';
import toast from 'react-hot-toast';
import { FaChartBar } from 'react-icons/fa';

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [summaryData, setSummaryData] = useState(null);
  const [rangeData, setRangeData] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchDailyReport = async () => {
    setLoading(true);
    try {
      const response = await reportAPI.getDailySummary(selectedDate);
      setSummaryData(response.data);
      toast.success('Daily report loaded');
    } catch (error) {
      toast.error('Failed to load daily report');
      setSummaryData(null);
    }
    setLoading(false);
  };

  const handleFetchRangeReport = async () => {
    setLoading(true);
    try {
      const response = await reportAPI.getRange(startDate, endDate);
      setRangeData(response.data);
      toast.success('Range report loaded');
    } catch (error) {
      toast.error('Failed to load range report');
      setRangeData([]);
    }
    setLoading(false);
  };

  const handleFetchMonthlyReport = async () => {
    setLoading(true);
    try {
      const response = await reportAPI.getMonthlyRevenue(month, year);
      setMonthlyRevenue(response.data);
      toast.success('Monthly report loaded');
    } catch (error) {
      toast.error('Failed to load monthly report');
      setMonthlyRevenue(null);
    }
    setLoading(false);
  };

  const calculateTotalRevenue = () => {
    return rangeData.reduce((sum, item) => sum + item.totalRevenue, 0);
  };

  const calculateTotalTax = () => {
    return rangeData.reduce((sum, item) => sum + item.totalTax, 0);
  };

  const calculateTotalDiscount = () => {
    return rangeData.reduce((sum, item) => sum + item.totalDiscount, 0);
  };

  const calculateTotalBills = () => {
    return rangeData.reduce((sum, item) => sum + item.totalBills, 0);
  };

  return (
    <div className="grid grid-1">
      <div className="card">
        <div className="card-header">
          <FaChartBar /> Reports & Analytics
        </div>

        {/* Report Type Selection */}
        <div className="form-group">
          <label>Report Type</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="daily">Daily Summary</option>
            <option value="range">Date Range</option>
            <option value="monthly">Monthly Revenue</option>
          </select>
        </div>

        {/* Daily Report */}
        {reportType === 'daily' && (
          <div>
            <div className="form-group">
              <label>Select Date</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleFetchDailyReport}>
                  Load Report
                </button>
              </div>
            </div>

            {summaryData && (
              <div className="grid grid-3">
                <div
                  style={{
                    padding: '1.5rem',
                    background: '#e3f2fd',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1976d2' }}>
                    {summaryData.totalBills}
                  </div>
                  <div style={{ color: '#555' }}>Total Bills</div>
                </div>

                <div
                  style={{
                    padding: '1.5rem',
                    background: '#f3e5f5',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7b1fa2' }}>
                    ₹{summaryData.totalRevenue.toFixed(2)}
                  </div>
                  <div style={{ color: '#555' }}>Total Revenue</div>
                </div>

                <div
                  style={{
                    padding: '1.5rem',
                    background: '#e8f5e9',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#388e3c' }}>
                    ₹{summaryData.totalTax.toFixed(2)}
                  </div>
                  <div style={{ color: '#555' }}>Total Tax</div>
                </div>

                <div
                  style={{
                    padding: '1.5rem',
                    background: '#fce4ec',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#c2185b' }}>
                    ₹{summaryData.totalDiscount.toFixed(2)}
                  </div>
                  <div style={{ color: '#555' }}>Total Discount</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Range Report */}
        {reportType === 'range' && (
          <div>
            <div className="form-group">
              <label>Date Range</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.9rem' }}>From</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.9rem' }}>To</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleFetchRangeReport}>
                  Load Report
                </button>
              </div>
            </div>

            {rangeData.length > 0 && (
              <div>
                <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
                  <div
                    style={{
                      padding: '1.5rem',
                      background: '#e3f2fd',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1976d2' }}>
                      {calculateTotalBills()}
                    </div>
                    <div style={{ color: '#555' }}>Total Bills</div>
                  </div>

                  <div
                    style={{
                      padding: '1.5rem',
                      background: '#f3e5f5',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7b1fa2' }}>
                      ₹{calculateTotalRevenue().toFixed(2)}
                    </div>
                    <div style={{ color: '#555' }}>Total Revenue</div>
                  </div>

                  <div
                    style={{
                      padding: '1.5rem',
                      background: '#e8f5e9',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#388e3c' }}>
                      ₹{calculateTotalTax().toFixed(2)}
                    </div>
                    <div style={{ color: '#555' }}>Total Tax</div>
                  </div>
                </div>

                <h3>Daily Breakdown</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Bills</th>
                      <th>Revenue</th>
                      <th>Tax</th>
                      <th>Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rangeData.map((item) => (
                      <tr key={item.id}>
                        <td>{new Date(item.summaryDate).toLocaleDateString()}</td>
                        <td>{item.totalBills}</td>
                        <td>₹{item.totalRevenue.toFixed(2)}</td>
                        <td>₹{item.totalTax.toFixed(2)}</td>
                        <td>₹{item.totalDiscount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Monthly Report */}
        {reportType === 'monthly' && (
          <div>
            <div className="form-group">
              <label>Select Month & Year</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(2024, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
                <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                  {Array.from({ length: 5 }, (_, i) => {
                    const y = new Date().getFullYear() - i;
                    return (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    );
                  })}
                </select>
                <button className="btn btn-primary" onClick={handleFetchMonthlyReport}>
                  Load Report
                </button>
              </div>
            </div>

            {monthlyRevenue && (
              <div
                style={{
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '8px',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  ₹{monthlyRevenue.revenue.toFixed(2)}
                </div>
                <div style={{ fontSize: '1.2rem' }}>
                  Total Revenue for {new Date(2024, month - 1).toLocaleString('default', { month: 'long' })} {year}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
