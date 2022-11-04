<?php

require_once dirname(__FILE__).'/../braintree/lib/Braintree.php';

class Licence {

  function __construct() {
    $this->gateway = new Braintree\Gateway([
      'environment' => 'sandbox',
      'merchantId' => 'fknw3nxdc3cqnqy6',
      'publicKey' => 'hv3k82tz3dr3fpdp',
      'privateKey' => 'bd23758d399186a496b47e8822abe212'
    ]);
  }

  public function createTransaction($nonce, $amount, $data) {
    $output = array(
      'status' => 0,
      'msg' => 'Payment process terminated prematurely',
    );

    $result = $this->gateway->transaction()->sale([
      'amount' => $amount,
      'paymentMethodNonce' => $nonce,
      'deviceData' => $data,
      'options' => [ 'submitForSettlement' => True ]
    ]);

    if($result->success) {
      // TODO: Store transaction data in the database table
      $output = array(
        'status' => 1,
        'msg' => 'Payment successful',
      );
    } else if($result->transaction) {
      $output = array(
        'status' => 0,
        'msg' => $result->transaction->processorResponseText,
      );
    } else {
      $output = array(
        'status' => 0,
        'msg' => 'Sorry, we could not process your payment',
      );
    }

    return $output;
  }
}

?>
