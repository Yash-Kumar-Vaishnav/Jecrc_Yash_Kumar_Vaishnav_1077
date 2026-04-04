import React, { useState, useEffect } from 'react';
import { useBillStore } from '../store/billStore';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaSave } from 'react-icons/fa';

const CatalogManager = () => {
  const { catalogs, addCatalogItem, updateCatalogItem, loadCatalogs } = useBillStore();
  const [selectedType, setSelectedType] = useState('entrance');
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    catalogType: 'entrance',
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadCatalogs();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) {
      toast.error('Please fill in all fields');
      return;
    }

    await addCatalogItem({ ...newItem, catalogType: selectedType });
    setNewItem({ name: '', description: '', price: 0, catalogType: 'entrance' });
    toast.success('Item added successfully');
  };

  const handleUpdateItem = async (id) => {
    await updateCatalogItem(id, editData);
    setEditingId(null);
    toast.success('Item updated successfully');
  };

  const catalogItems = catalogs[selectedType] || [];

  return (
    <div className="grid grid-2">
      {/* Add New Item */}
      <div className="card">
        <div className="card-header">
          <FaPlus /> Add New Item
        </div>

        <form onSubmit={handleAddItem}>
          <div className="form-group">
            <label>Catalog Type</label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setNewItem({ ...newItem, catalogType: e.target.value });
              }}
            >
              <option value="entrance">Entrance Fees</option>
              <option value="donation">Donations</option>
              <option value="product">Products</option>
            </select>
          </div>

          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="e.g., Adult Ticket"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              placeholder="Item description"
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            <FaPlus /> Add Item
          </button>
        </form>
      </div>

      {/* Manage Existing Items */}
      <div className="card">
        <div className="card-header">📦 Manage {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</div>

        <div className="form-group">
          <label>Filter by Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="entrance">Entrance Fees</option>
            <option value="donation">Donations</option>
            <option value="product">Products</option>
          </select>
        </div>

        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {catalogItems.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>
              No items in this catalog
            </p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {catalogItems.map((item) => (
                  <tr key={item.id}>
                    {editingId === item.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={editData.name || ''}
                            onChange={(e) =>
                              setEditData({ ...editData, name: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editData.description || ''}
                            onChange={(e) =>
                              setEditData({ ...editData, description: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.01"
                            value={editData.price || ''}
                            onChange={(e) =>
                              setEditData({ ...editData, price: parseFloat(e.target.value) })
                            }
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleUpdateItem(item.id)}
                          >
                            <FaSave /> Save
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>₹{item.price.toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              setEditingId(item.id);
                              setEditData(item);
                            }}
                          >
                            <FaEdit /> Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogManager;
