import React from "react";

function Counter(){
    const [count, setCount] = React.useState(0);
    const [step,setStep] = React.useState(1);
    const[lastAction, setLastAction] = React.useState("None");
    
    function increment(){
        setCount(count + step);
        setLastAction("Incremented by " + step);
    }
    function decrement(){
        setCount(count - step);
        setLastAction("Decremented by " + step);
    }
    const reset = () => {
        setCount(0);
        setStep(1);
        setLastAction("Reset to 0");
    }
    return(
      <div style={{ padding: '20px', textAlign: 'center'}}>
        {/* Display Current state */}
        <div style={{fontSize: '48px', margin: '20px'}}>
          <h1>Counter: {count}</h1>
        </div>
        {/* Step Input */}
        <div style={{marginBottom: '20px'}}>
          <label>
            Step:
            <input
              type="number"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              style={{marginLeft: '10px'}}
            />
          </label>
        </div>

        {/* Action Buttons */}
        <div style={{margin: '20px'}}>
          <button style={buttonStyle} onClick={increment}>Increment</button>
          <button  style={buttonStyle} onClick={decrement}>Decrement</button>
          <button onClick={reset} style={{...buttonStyle, marginLeft: '10px'}}>Reset</button>
        </div>
        <div style={{margin: '20px', fontStyle: 'italic'}}>
        Last Action: {lastAction}
        </div>

      </div>
    )
}

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '0 10px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
}

export default Counter;