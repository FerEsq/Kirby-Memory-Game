import React from "react";
import Card from "./components/Card";
import Kirby from './media/Kirby.png';

function App() {
  return (
    <div>
      <h1>Hola mundo</h1>
      <Card frontImage={Kirby} />
    </div>
  )
};

export default App;