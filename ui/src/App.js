import React, { useState } from 'react';
import dropin from "braintree-web-drop-in";

function App() {
  const [ showDropIn, setShowDropIn ] = useState(false);
  return (
    <div className="container">
      <div className="row">

        <div className="col-md-12 p-4">
          <h1 className="heading">React + PHP</h1>
          <h3 className="text-muted">Complete Example on Braintree Payment Gateway Integration</h3>
          <hr/>
        </div>

        <div className="col-md-6 p-4">
          <h6 className="text-muted">Price</h6>
          <h1>25.00 <span style={{ fontSize: "15px" }}>USD</span></h1>
        </div>

        <div className="col-md-6 p-4">
          <button className="btn btn-primary btn-pay">
            Pay With By Credit Card
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
