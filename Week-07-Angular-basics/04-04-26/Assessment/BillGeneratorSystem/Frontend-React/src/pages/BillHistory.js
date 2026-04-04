import React, { useState, useEffect } from 'react';
import { useBillStore } from '../store/billStore';
import { invoiceAPI } from '../services/api';
import toast from 'react-hot-toast';
import { FaEye, FaDownload, FaSearch } from 'react-icons/fa';

const BillHistory = () => {
  const { bills, getAllBills } = useBillStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBills, setFilteredBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    getAllBills();
  }, []);

  useEffect(() => {
    let filtered = bills;
    if (searchTerm) {
      filtered = bills.filter(
        (bill) =>
          bill.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bill.id.toString().includes(searchTerm)
      );
    }
    setFilteredBills(filtered);
  }, [bills, searchTerm]);

  const handleDownloadPdf = async (billId) => {
    try {
      const blob = await invoiceAPI.generatePdf(billId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_${billId}.pdf`;
      link.click();
      toast.success('PDF downloaded');
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  const handleDownloadCsv = async (billId) => {
    try {
      const blob = await invoiceAPI.generateCsv(billId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_${billId}.csv`;
      link.click();
      toast.success('CSV downloaded');
    } catch (error) {
      toast.error('Failed to download CSV');
    }
  };

  return (
    <div className="grid grid-2">
      <div className="card">
        <div className="card-header">📋 Bill History</div>

        <div className="form-group">
          <label>Search Bills</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Search by invoice number or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-secondary">
              <FaSearch /> Search
            </button>
          </div>
        </div>

        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#999' }}>
                    No bills found
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr key={bill.id}>
                    <td>{bill.invoiceNumber}</td>
                    <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
                    <td>₹{bill.total.toFixed(2)}</td>
                    <td>
                      <span
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          backgroundColor:
                            bill.status === 'Completed' ? '#c8e6c9' : '#ffe0b2',
                          color: bill.status === 'Completed' ? '#2e7d32' : '#f57f17',
                        }}
                      >
                        {bill.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedBill(bill)}
                        title="View details"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">📄 Bill Details</div>

        {selectedBill ? (
          <div>
            <div
              style={{
                padding: '1rem',
                background: '#f5f5f5',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}
            >
              <div className="invoice-header">
                <div className="invoice-number">{selectedBill.invoiceNumber}</div>
                <div className="invoice-date">
                  {new Date(selectedBill.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Items</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBill.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.itemName}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.unitPrice.toFixed(2)}</td>
                      <td>₹{item.lineTotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="invoice-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{selectedBill.subTotal.toFixed(2)}</span>
              </div>
              {selectedBill.discountAmount > 0 && (
                <div className="total-row">
                  <span>Discount:</span>
                  <span>-₹{selectedBill.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="total-row">
                <span>Tax:</span>
                <span>₹{selectedBill.taxAmount.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>₹{selectedBill.total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                className="btn btn-primary"
                onClick={() => handleDownloadPdf(selectedBill.id)}
              >
                <FaDownload /> PDF
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleDownloadCsv(selectedBill.id)}
              >
                <FaDownload /> CSV
              </button>
            </div>
          </div>
        ) : (
          <p style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>
            Select a bill to view details
          </p>
        )}
      </div>
    </div>
  );
};

export default BillHistory;
