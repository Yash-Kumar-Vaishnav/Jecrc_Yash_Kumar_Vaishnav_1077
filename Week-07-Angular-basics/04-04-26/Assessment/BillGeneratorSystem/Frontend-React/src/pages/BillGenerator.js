import React, { useState, useEffect } from 'react';
import { useBillStore } from '../store/billStore';
import { invoiceAPI } from '../services/api';
import toast from 'react-hot-toast';
import { FaTrash, FaPlus, FaDownload, FaCheck } from 'react-icons/fa';

const BillGenerator = () => {
  const {
    currentBill,
    catalogs,
    createBill,
    addItem,
    updateItem,
    removeItem,
    completeBill,
  } = useBillStore();

  const [selectedCatalog, setSelectedCatalog] = useState('entrance');
  const [quantity, setQuantity] = useState(1);
  const [customPrice, setCustomPrice] = useState(null);

  useEffect(() => {
    if (!currentBill) createBill();
  }, []);

  // ➕ Add item
  const handleAddItem = async (item) => {
    if (!currentBill) return;

    const price = customPrice ?? item.price;
    await addItem(currentBill.id, item.id, quantity, price);

    setCustomPrice(null);
    setQuantity(1);
    toast.success('Item added');
  };

  // ✅ Complete bill
  const handleCompleteBill = async () => {
    if (!currentBill || currentBill.items.length === 0) {
      toast.error('Add items first');
      return;
    }
    await completeBill(currentBill.id);
    toast.success('Bill completed');
  };

  // 📄 PDF
  const handleDownloadPdf = async () => {
    try {
      const blob = await invoiceAPI.generatePdf(currentBill.id);
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_${currentBill.invoiceNumber}.pdf`;
      link.click();

      toast.success('PDF downloaded');
    } catch {
      toast.error('PDF failed');
    }
  };

  // 📄 CSV
  const handleDownloadCsv = async () => {
    try {
      const blob = await invoiceAPI.generateCsv(currentBill.id);
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_${currentBill.invoiceNumber}.csv`;
      link.click();

      toast.success('CSV downloaded');
    } catch {
      toast.error('CSV failed');
    }
  };

  // 🖨️ PRINT
  const handlePrint = () => {
    window.print();
  };

  if (!currentBill) return <div className="loader"></div>;

  const items = catalogs[selectedCatalog] || [];

  return (
    <div className="grid grid-2">

      {/* LEFT SIDE */}
      <div className="card">
        <div className="card-header">📦 Select Items</div>

        <select value={selectedCatalog} onChange={(e) => setSelectedCatalog(e.target.value)}>
          <option value="entrance">Entrance</option>
          <option value="donation">Donation</option>
          <option value="product">Products</option>
        </select>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
          placeholder="Quantity"
        />

        <input
          type="number"
          placeholder="Custom Price"
          value={customPrice || ''}
          onChange={(e) => setCustomPrice(e.target.value)}
        />

        <div className="items-list">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-title">{item.name}</div>
              <div className="item-desc">{item.description}</div>

              <div className="item-footer">
                <span>₹{item.price}</span>

                <button className="btn btn-primary" onClick={() => handleAddItem(item)}>
                  <FaPlus /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="card invoice">
        <div className="card-header">🧾 Invoice</div>

        {currentBill.items.length === 0 ? (
          <p>No items added</p>
        ) : (
          <table className="table">
            <tbody>
              {currentBill.items.map((i) => (
                <tr key={i.id}>
                  <td>{i.itemName}</td>
                  <td>{i.quantity}</td>
                  <td>₹{i.unitPrice}</td>
                  <td>₹{i.lineTotal}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => removeItem(currentBill.id, i.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="invoice-totals">
          <div className="total-row grand-total">
            Total: ₹{currentBill.total}
          </div>
        </div>

        {/* 🔥 ACTION BUTTONS */}
        <div className="action-buttons">
          <button className="btn btn-success" onClick={handleCompleteBill}>
            <FaCheck /> Complete
          </button>

          <button className="btn btn-primary" onClick={handleDownloadPdf}>
            <FaDownload /> PDF
          </button>

          <button className="btn btn-secondary" onClick={handleDownloadCsv}>
            📄 CSV
          </button>

          <button className="btn btn-primary" onClick={handlePrint}>
            🖨️ Print
          </button>
        </div>
      </div>

    </div>
  );
};

export default BillGenerator;