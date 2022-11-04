import React, { useState, useEffect } from 'react';
import dropin from "braintree-web-drop-in";

function App() {
  const [ error, setError ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ showDropIn, setShowDropIn ] = useState(false);
  const [ braintree, setBraintree ] = useState(null);
  const [ dropInReady, setDropInReady ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const triggerPayment = () => {
    //this triggers dropin to show
    setShowDropIn(true);
  }

  const processPayment = () => {
    //this handles and submits payment to the server
    if(dropInReady && !loading) {//limit execution only when dropin is shown and there's no loading

      setLoading(true);
      braintree.requestPaymentMethod(async (error, payload) => {
        if(error) {
          setError(error.message);
          setLoading(false);
        }
        else {
          //all is good so far, get the nonce
          let nonce = payload.nonce;
          console.log(nonce);

          //Call Server side here to finish payment
          let API_URL = "github_projects/braintree-react-php-integration/api/process_payment.php";
          fetch(API_URL, {
            method: "POST",
            body: {
              nonce,
              amount: "25.00",
              data: JSON.stringify({
                productName: "Test Product",
                productPrice: "25 USD",
              })
            }
          })
          .then(response => response.json())
          .then(response => {
            setLoading(false); //disable loading
            setShowDropIn(false); //hide dropin

            if(response.status === 1) {
              setMessage("Payment was successful")
            } else {
              setError(response.msg);
            }
          })

        }
      })
    } else {
      setError('Please wait....')
    }
  }

  const initializeBraintree = () => {
    setDropInReady(false);
    dropin.create({
      authorization: "sandbox_6mrf6nhg_fknw3nxdc3cqnqy6", //braintree tokeniization
      container: '#braintreeView', //id for the div where dropin will be loaded
    }, function( error, instance ) {
      if(error) {
        setError(error.message);
      }
      else {
        setDropInReady(true);
        setBraintree(instance);
      }
    });
  }

  useEffect(() => {
    if(showDropIn) {
      if(braintree) {
        //destroy the old braintree instance then create new
        braintree.teardown().then(() => {
          initializeBraintree();
        })
      }
      else {
        initializeBraintree();
      }
    }

  }, [ showDropIn ]);
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
          <div style={{ width: "100%" }} id="braintreeView">
          </div>

          {
            (!showDropIn) ?
            <button onClick={() => triggerPayment()} className="btn btn-primary btn-pay">
              Pay With By Credit Card
            </button>
            :
            <button onClick={() => processPayment()} className="btn btn-primary btn-pay">
              {(!dropInReady || loading) ? "Please wait...." : "Pay Now" }
            </button>
          }

          {
            (error) ?
            <div style={{ marginTop:"20px" }} className="text-danger text-left">
              {error}
            </div>: ""
          }

          {
            (message) ?
            <div style={{ marginTop:"20px" }} className="text-success text-left">
              {message}
            </div>: ""
          }

        </div>

      </div>
    </div>
  );
}

export default App;
