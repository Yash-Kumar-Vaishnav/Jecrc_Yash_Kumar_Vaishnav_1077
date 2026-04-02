import './App.css';
import Counter from './components/Counter';
import StateVsPropsDemo from './components/StateVsPropsDemo';
import TemperatureConverter from './components/TemperatureConverter';

function App() {
  // return (
  //       <Counter />
  // );

  return(
    
    <div style={{
      backgroundColor: "#f0f0f0",
      padding: "20px"
    }}>
          <h1 style={{textAlign: "center"}}>COUNTER DEMO</h1>
          <Counter />
        <h1 style={{textAlign: "center"}}>State vs Props Demo</h1>
        <StateVsPropsDemo />

        <TemperatureConverter />
    </div>
  )
}

export default App;