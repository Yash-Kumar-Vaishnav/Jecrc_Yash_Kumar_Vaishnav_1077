import React, { useState } from 'react';

function App() {

  const style = {
    container: {
      textAlign: 'center',
      marginTop: '50px',
    },
    btn: {
      margin: '10px',
      padding: '10px 20px',
      fontSize: '16px',
    },
    resetBtn: {
      margin: '10px',
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
    },
    input: {
      margin: '10px',
      padding: '10px',
      fontSize: '16px',
      width: '200px',
    },
    card: {
      margin: '20px auto',
      padding: '20px',
    },
    info: {
      border: '1px solid #3d8bff',
      backgroundColor: '#3d8bff',
      marginTop: '20px',
      fontSize: '14px',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
    },
    updateBtn: {
      margin: '5px',
      padding: '5px 10px',
      fontSize: '14px',
      backgroundColor: 'blue',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
    },
    deleteBtn: {
      margin: '5px',
      padding: '5px 10px',
      fontSize: '14px',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
    },
    deleteAllBtn: {
      margin: '10px',
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: 'darkred',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
    },
    list: {
      listStyle: 'none',
      padding: '0',
    },
  };

  //Array state
  const [items, setItems] = useState([]);
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "Item" + (items.length + 1),
      created : new Date().toLocaleTimeString()
    }
    const newItems = [
      {id: Date.now(), name: "Batch Item 1", created : new Date().toLocaleTimeString()},
      {id: Date.now() + 1, name: "Batch Item 2", created : new Date().toLocaleTimeString()},
      {id: Date.now() + 2, name: "Batch Item 3", created : new Date().toLocaleTimeString()},
    ];
    setItems(prevItems => [...prevItems, newItem]);
  };

  //update Item
  const updateItem = (id) => {
    setItems(prevItems =>
      prevItems.map(item => 
        item.id === id 
        ? {...item, name: item.name + " (Updated Item)" , updated: new Date().toLocaleTimeString()} 
        : item
      )
    );
  };

  //Delete Item
  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  //Delete All
  const deleteAllItems = () => {
    setItems([]);
  };

  //Add Multiple Items
  const addMultipleItems = () => {
    const newItems = [
      {id: Date.now(), name: "Batch Item 1", created : new Date().toLocaleTimeString()},
      {id: Date.now() + 1, name: "Batch Item 2", created : new Date().toLocaleTimeString()},
      {id: Date.now() + 2, name: "Batch Item 3", created : new Date().toLocaleTimeString()},
    ];
    setItems(prevItems => [...prevItems, ...newItems]);
  };

  return (
    <div className="App" style={style.container}>
      <h1>Array State Demo (Todo App)</h1>

      <div>
        <button style={style.btn} onClick={addItem}>Add Item</button>
        <button style={style.btn} onClick={addMultipleItems}>Add Multiple Items</button>
        <button style={style.deleteAllBtn} onClick={deleteAllItems}>Delete All</button>
      </div>

      <h3>Total Items: {items.length}</h3>

      {/* List Rendering */}
      <ul style={style.list}>
        {items.map(item => (
          <li key={item.id} style={style.card}>
            <p><b>{item.name}</b></p>
            <p>Created: {item.created}</p>
            <span>{item.name} - Created at: {item.created} 
              {item.updated && <p>`(Updated at: ${item.updated})`</p>}</span>
            <div>
              <button style={style.updateBtn} onClick={() => updateItem(item.id)}>Update</button>
              <button style={style.deleteBtn} onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          </li>
        ))}
        </ul>
      </div>
    );
  }

  const style = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  btn: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
  },
  deleteAllBtn: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'darkred',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  updateBtn: {
    margin: '5px',
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
  },
  deleteBtn: {
    margin: '5px',
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  resetBtn: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  input: {
    margin: '10px',
    padding: '10px',
    fontSize: '16px',
    width: '200px',
  },
  card: {
    margin: '20px auto',
    padding: '20px',
  },
  info: {
    border: '1px solid #3d8bff',
    backgroundColor: '#3d8bff',
    marginTop: '20px',
    fontSize: '14px',
    color: 'white',
    backgroundColor: '#3d8bff',
    padding: '10px',
    borderRadius: '5px',
  },
}
  
  export default App;
