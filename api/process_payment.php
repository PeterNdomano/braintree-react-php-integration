<?php

require_once dirname(__FILE__).'/classes/BTProcessor.php';


if($_SERVER['REQUEST_METHOD'] == 'POST') {
  if(isset($_POST['amount']) && isset($_POST['nonce']) && isset($_POST['data'])) {

    $amount = htmlspecialchars($_POST['amount']);
    $nonce = htmlspecialchars($_POST['nonce']);
    $data = htmlspecialchars($_POST['data']);

    $bt = new BTProcessor(); //Our custom Braintree Processor class
    $output = $bt->createTransaction($nonce, $amount, $data);
    echo json_encode($output);
  }
  else {
    echo json_encode(array(
      'status' => 0,
      'msg' => 'Invalid request',
    ));
  }
}
else {
  echo json_encode(array(
    'status' => 0,
    'msg' => 'Invalid request',
  ));
}

?>
