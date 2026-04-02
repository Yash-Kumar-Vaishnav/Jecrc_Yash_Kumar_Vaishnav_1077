// import React, { useState } from 'react';

// function App() {

//   const [count, setCount] = useState(0);  

//   return (
//     <div className="App" style={style.container}>
//       <h1>Counter App</h1>
//       <h2>Count: {count}</h2>
//       <button style={style.btn} onClick={() => setCount(count + 1)}>Increment</button>
//       {/* managed by useState hook good pracice to manage state in functional components and lambda function to update state */}
//       <button style={style.btn} onClick={() => setCount(count - 1)}>Decrement</button>
//     </div>
//   );
// }

// const style = {
//   container:{
//     textalign: 'center',
//     marginTop: '50px'   
//   },
//   btn:{
//     margin:"10px",
//     padding:"10px 20px",
//     fontSize:"16px"
//   }
// }


// this is using multiples updates in quick succession, which can lead to incorrect state updates if we rely on the current state value directly. To handle this, we can use functional updates, which allow us to access the previous state value when updating the state.
// const [count, setCount] = useState(0);  

// //Functional Updates
// const increment = () => {
//   setCount(prevCount => prevCount + 1);
// }

// const decrement = () => {
//   setCount(prevCount => prevCount - 1);
// }

// const incrementByTwo = () => {
//   setCount(prevCount => prevCount + 2);
// }

// const reset = () => {
//   setCount(0);
// }

//   return (
//     <div className="App" style={style.container}>
//       <h1>Functional Updates Demo</h1>
//       <h2>Count: {count}</h2>
//     <div>
//       <button style={style.btn} onClick={increment}>+1</button>
//       <button style={style.btn} onClick={decrement}>-1</button>
//       <button style={style.btn} onClick={incrementByTwo}>+2</button>
//       <button style={style.resetBtn} onClick={reset}>Reset</button>
//     </div>

//     <p style={style.info}>
//       using <b> prev state</b> ensures correct updates even when multiple updates happens quickly.
//     </p>
//     </div>
//   );
// }

// const style = {
//   container:{
//     textalign: 'center',
//     marginTop: '50px'   
//   },
//   btn:{
//     margin:"10px",
//     padding:"10px 20px",
//     fontSize:"16px"
//   },
// resetBtn:{
//   margin:"10px",
//   padding:"10px 20px",
//   fontSize:"16px",
//   backgroundColor:"red",
//   color:"white",
//   border:"none",
//   borderRadius:"5px"
// }
// }

//lazy Initialization of state (runs only once)
// import React, { useState } from 'react';
// function App() {
  //Lazy Initialization (runs only once)
//   const [data, setData] = useState(() => {
//     console.log('Expensive computation running...');
//     let result = 0;
//     for (let i = 0; i < 1000000; i++) {
//       result += i;
//     }
//     return result % 1000; // Just to keep the number manageable
//   });

//   //Update without re-running expensive logic
//   const recalculateData = () => {
//     setData(prev => {
//       console.log('Recalculating data without expensive logic...');
//       return prev + 100; // Simulate a simple update
//     });
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Lazy Initialization Demo</h1>
//       <h2>Data: {data}</h2>
//       <button style={styles.btn} onClick={recalculateData}>Recalculate Data (+100)</button>
//       <p style={styles.info}>
//         The expensive computation runs only once during initial render.
//       </p>
//       <p style={styles.note}>
//         Open the console to see when the expensive computation runs.
//       </p>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: 'center',
//     marginTop: '50px',
//   },
//   btn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
//   resetBtn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
//   info: {
//     marginTop: '20px',
//     fontSize: '14px',
//     color: 'white',
//     backgroundColor: '#3d8bff',
//     padding: '10px',
//     borderRadius: '5px',
//   },
//   note: {
//     marginTop: '10px',
//     fontSize: '12px',
//     color: 'darkgray',
//   },
// };

// export default App;

// const style = {
//   container:{
//     textalign: 'center',
//     marginTop: '50px'   
//   },
//   btn:{
//     margin:"10px",
//     padding:"10px 20px",
//     fontSize:"16px"
//   },
// resetBtn:{
//   margin:"10px",
//   padding:"10px 20px",
//   fontSize:"16px",
//   backgroundColor:"red",
//   color:"white",
//   border:"none",
//   borderRadius:"5px"
// },
// info:{
//   marginTop:"20px",
//   fontSize:"14px",
//   color:"gray",
//   backgroundColor:"#2b5fac",
//   padding:"10px",
//   borderRadius:"5px"
// }


//object state
// const [user, setUser] = useState({
//    name: "",
//     age:"",
//     email:""  
//   });

//   //update Function 
//   const updateUserName = (name) => {
//     setUser(prevUser => ({
//        ...prevUser, 
//        name: name
//       }));
//   };

//   const updateUserAge = (age) => {
//     setUser(prevUser => ({
//        ...prevUser, 
//        age: age
//       }));
//   };

//   const updateUserEmail = (email) => {
//     setUser(prevUser => ({
//        ...prevUser, 
//        email: email
//       }));
//   }

//   const resetUser = () => {
//     setUser({
//       name: "",
//       age: "",
//       email: ""
//     });
//   }

//   return (
//     <div style={style.container}>
//       <h1>Object State Demo</h1>

//       {/* Input Fields */}
//       <input type="text" placeholder="Enter Name" onChange={(e) => updateUserName(e.target.value)} style={style.input} />
//       <input type="number" placeholder="Enter Age" onChange={(e) => updateUserAge(e.target.value)} style={style.input} />
//       <input type="email" placeholder="Enter Email" onChange={(e) => updateUserEmail(e.target.value)} style={style.input} />
      
//       <button style={style.btn} onClick={() => updateUserName("jane doe")}>Update Name</button>
//       <button style={style.btn} onClick={() => updateUserAge(30)}>Update Age</button>
//       <button style={style.btn} onClick={() => updateUserEmail("jane.doe@example.com")}>Update Email</button>
//       <button style={style.resetBtn} onClick={resetUser}>Reset User</button>
      
      
//       {/* Display Card */}
//       <div style={style.card}> 
//             <h2>User Information</h2>
//             <p><b>Name:</b> {user.name}</p>
//             <p><b>Age:</b> {user.age}</p>
//             <p><b>Email:</b> {user.email}</p>
//     </div>
//     <p style={style.info}>
//       object state requires <b>Spread Operator (...prev)</b> to preserve existing properties or data.
//     </p>
//     </div>
//   );
// }

// const style = {
//   container: {
//     textAlign: 'center',
//     marginTop: '50px',
//   },
//   btn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
//   resetBtn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: 'red',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//   },
//   input: {
//     margin: '10px',
//     padding: '10px',
//     fontSize: '16px',
//     width: '200px',
//   },
//   card: {
//     margin: '20px auto',
//     padding: '20px',
//   },
//   info: {
//     border: '1px solid #3d8bff',
//     backgroundColor: '#3d8bff',
//     marginTop: '20px',
//     fontSize: '14px',
//     color: 'white',
//     backgroundColor: '#3d8bff',
//     padding: '10px',
//     borderRadius: '5px',
//   },
// };


//List Cart
// import React, { useState } from 'react';

// function App() {

//   const style = {
//     container: {
//       textAlign: 'center',
//       marginTop: '50px',
//     },
//     btn: {
//       margin: '10px',
//       padding: '10px 20px',
//       fontSize: '16px',
//     },
//     resetBtn: {
//       margin: '10px',
//       padding: '10px 20px',
//       fontSize: '16px',
//       backgroundColor: 'red',
//       color: 'white',
//       border: 'none',
//       borderRadius: '5px',
//     },
//     input: {
//       margin: '10px',
//       padding: '10px',
//       fontSize: '16px',
//       width: '200px',
//     },
//     card: {
//       margin: '20px auto',
//       padding: '20px',
//       border: '1px solid #ccc',
//       borderRadius: '5px',
//       width: '300px',
//       textAlign: 'left',
//       color: '#053861',
//       backgroundColor: '#e3f2fd',
//     },
//     info: {
//       border: '1px solid #3d8bff',
//       backgroundColor: '#3d8bff',
//       marginTop: '20px',
//       fontSize: '14px',
//       color: 'white',
//       padding: '10px',
//       borderRadius: '5px',
//     },
//     updateBtn: {
//       margin: '5px',
//       padding: '5px 10px',
//       fontSize: '14px',
//       backgroundColor: 'blue',
//       color: 'white',
//       border: 'none',
//       borderRadius: '3px',
//     },
//     deleteBtn: {
//       margin: '5px',
//       padding: '5px 10px',
//       fontSize: '14px',
//       backgroundColor: 'red',
//       color: 'white',
//       border: 'none',
//       borderRadius: '3px',
//     },
//     deleteAllBtn: {
//       margin: '10px',
//       padding: '10px 20px',
//       fontSize: '16px',
//       backgroundColor: 'darkred',
//       color: 'white',
//       border: 'none',
//       borderRadius: '5px',
//     },
//     list: {
//       listStyle: 'none',
//       padding: '0',
//     },
//   };

//   //Array state
//   const [items, setItems] = useState([]);
//   const addItem = () => {
//     const newItem = {
//       id: Date.now(),
//       name: "Item" + (items.length + 1),
//       created : new Date().toLocaleTimeString()
//     }
//     const newItems = [
//       {id: Date.now(), name: "Batch Item 1", created : new Date().toLocaleTimeString()},
//       {id: Date.now() + 1, name: "Batch Item 2", created : new Date().toLocaleTimeString()},
//       {id: Date.now() + 2, name: "Batch Item 3", created : new Date().toLocaleTimeString()},
//     ];
//     setItems(prevItems => [...prevItems, newItem]);
//   };

//   //update Item
//   const updateItem = (id) => {
//     setItems(prevItems =>
//       prevItems.map(item => 
//         item.id === id 
//         ? {...item, name: item.name + " (Updated Item)" , updated: new Date().toLocaleTimeString()} 
//         : item
//       )
//     );
//   };

//   //Delete Item
//   const deleteItem = (id) => {
//     setItems(prev => prev.filter(item => item.id !== id));
//   };

//   //Delete All
//   const deleteAllItems = () => {
//     setItems([]);
//   };

//   //Add Multiple Items
//   const addMultipleItems = () => {
//     const newItems = [
//       {id: Date.now(), name: "Batch Item 1", created : new Date().toLocaleTimeString()},
//       {id: Date.now() + 1, name: "Batch Item 2", created : new Date().toLocaleTimeString()},
//       {id: Date.now() + 2, name: "Batch Item 3", created : new Date().toLocaleTimeString()},
//     ];
//     setItems(prevItems => [...prevItems, ...newItems]);
//   };

//   return (
//     <div className="App" style={style.container}>
//       <h1>Array State Demo (Todo App)</h1>

//       <div>
//         <button style={style.btn} onClick={addItem}>Add Item</button>
//         <button style={style.btn} onClick={addMultipleItems}>Add Multiple Items</button>
//         <button style={style.deleteAllBtn} onClick={deleteAllItems}>Delete All</button>
//       </div>

//       <h3>Total Items: {items.length}</h3>

//       {/* List Rendering */}
//       <ul style={style.list}>
//         {items.map(item => (
//           <li key={item.id} style={style.card}>
//             <p><b>{item.name}</b></p>
//             <p>Created: {item.created}</p>
//             <span>{item.name} - Created at: {item.created} 
//               {item.updated && <p>`(Updated at: ${item.updated})`</p>}</span>
//             <div>
//               <button style={style.updateBtn} onClick={() => updateItem(item.id)}>Update</button>
//               <button style={style.deleteBtn} onClick={() => deleteItem(item.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//         </ul>
//       </div>
//     );
//   }

//   const style = {
//   container: {
//     textAlign: 'center',
//     marginTop: '50px',
//   },
//   btn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//   },
//   deleteAllBtn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: 'darkred',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//   },
//   updateBtn: {
//     margin: '5px',
//     padding: '5px 10px',
//     fontSize: '14px',
//     backgroundColor: 'blue',
//     color: 'white',
//     border: 'none',
//     borderRadius: '3px',
//   },
//   deleteBtn: {
//     margin: '5px',
//     padding: '5px 10px',
//     fontSize: '14px',
//     backgroundColor: 'red',
//     color: 'white',
//     border: 'none',
//     borderRadius: '3px',
//   },
//   list: {
//     listStyle: 'none',
//     padding: '0',
//   },
//   resetBtn: {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: 'red',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//   },
//   input: {
//     margin: '10px',
//     padding: '10px',
//     fontSize: '16px',
//     width: '200px',
//   },
//   card: {
//     margin: '20px auto',
//     padding: '20px',
//   },
//   info: {
//     border: '1px solid #3d8bff',
//     backgroundColor: '#3d8bff',
//     marginTop: '20px',
//     fontSize: '14px',
//     color: 'white',
//     backgroundColor: '#3d8bff',
//     padding: '10px',
//     borderRadius: '5px',
//   },
// };

// export default App;

import React, { useReducer, useState } from 'react';
function App() {

  // 🔹 Initial State
  const initialCounterState = {
    count: 0,
    history: []
  };

  // 🔹 Reducer Function
  function counterReducer(state, action) {
    switch (action.type) {
      case "increment":
        return {
          count: state.count + 1,
          history: [
            ...state.history,
            { type: "increment", value: state.count + 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "decrement":
        return {
          count: state.count - 1,
          history: [
            ...state.history,
            { type: "decrement", value: state.count - 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "reset":
        return {
          count: 0,
          history: [
            ...state.history,
            { type: "reset", value: 0, time: new Date().toLocaleTimeString() }
          ]
        };

      case "set":
        return {
          count: action.payload,
          history: [
            ...state.history,
            { type: "set", value: action.payload, time: new Date().toLocaleTimeString() }
          ]
        };

      default:
        return state;
    }
  }

  // 🔹 useReducer Hook
  const [counterState, dispatch] = useReducer(counterReducer, initialCounterState);

  // 🔹 Input State for SET
  const [inputValue, setInputValue] = useState("");

  return (
    <div style={styles.container}>
      <h1>useReducer Counter (Advanced)</h1>

      <h2>Count: {counterState.count}</h2>

      {/* 🔹 Actions */}
      <div>
        <button style={styles.btn} onClick={() => dispatch({ type: "increment" })}>
          +1
        </button>

        <button style={styles.btn} onClick={() => dispatch({ type: "decrement" })}>
          -1
        </button>

        <button style={styles.resetBtn} onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </div>

      {/* 🔹 Set Value */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.btn}
          onClick={() =>
            dispatch({ type: "set", payload: Number(inputValue) })
          }
        >
          Set Value
        </button>
      </div>

      {/* 🔹 History */}
      <h3 style={{ marginTop: "30px" }}>History</h3>

      <ul style={styles.list}>
        {counterState.history.map((item, index) => (
          <li key={index} style={styles.card}>
            <b>{item.type.toUpperCase()}</b> → {item.value}
            <br />
            <small>{item.time}</small>
          </li>
        ))}
      </ul>

      <p style={styles.info}>
        👉 useReducer is best for <b>complex state logic & history tracking</b>
      </p>
    </div>
  );
}

// 🎨 Styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "Arial"
  },
  btn: {
    margin: "10px",
    padding: "10px 15px",
    cursor: "pointer"
  },
  resetBtn: {
    margin: "10px",
    padding: "10px 15px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  input: {
    padding: "10px",
    marginRight: "10px"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  card: {
    border: "1px solid #ccc",
    margin: "10px auto",
    padding: "10px",
    width: "250px"
  },
  info: {
    marginTop: "20px",
    color: "green"
  }
};

export default App;