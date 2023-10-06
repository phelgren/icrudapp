<?php

header('Content-Type: application/json; charset=utf-8');

$conn_resource = db2_connect("*LOCAL", "", "");

if (!$conn_resource) {
    echo "Connection failed. SQL Err:";
    echo db2_conn_error();
    echo "<br>";
    echo db2_conn_errormsg();

exit();
}

// Handle the POST
// Access the JSON data from $_POST
$inputJSON = file_get_contents('php://input');
$data= json_decode( $inputJSON,true); 

error_log(print_r($data,true));

/* Parse the values */
if (!empty($data)) {
    $cusnum= $data["cusnum"];
    $lastname= $data["lastname"];
    $initials= $data["initials"];
    $street=$data["street"];
    $city= $data["city"];
    $stateid = $data["state"];
    $zipcode= $data["zipcode"];
    $crdlmt = $data["creditlimit"];
    $charge= $data["chargecode"];
    $balance=$data["balancedue"];
    $credit=$data["creditdue"]; 

    /* Construct the SQL statements */

    $sqlselect = "Select * from QIWS.QCUSTCDT where cusnum = ?";
    $sqlupdate = "Update QIWS.QCUSTCDT set LSTNAM =?, INIT = ?,STREET = ?,CITY = ?,STATE=?,ZIPCOD=?,CDTLMT = ? ,CHGCOD = ?,BALDUE = ?,CDTDUE = ? where CUSNUM = ? ";
    $sqlinsert = "Insert INTO QIWS.QCUSTCDT Values( ?,?,?,?,?,?,?,?,?,?,?)";


    /* Prepare and execute the DB2 SQL statement */
    $stmt= db2_prepare($conn_resource, $sqlselect);

    $result = db2_execute($stmt, array($cusnum)) or die("Failed SQL Stmt:".$stmt.":".db2_stmt_error().":".db2_stmt_errormsg());

    /* evaluate the success of the select and branch accordingly */

    if(db2_fetch_array($stmt)){
        error_log(print_r("Executing an update",true));
        $stmt= db2_prepare($conn_resource, $sqlupdate);
        $result = db2_execute($stmt, array($lastname,$initials,$street,$city,$stateid,$zipcode,$crdlmt,$charge,$balance,$credit,$cusnum,)) 
            or die("Failed SQL Stmt:".$stmt.":".db2_stmt_error().":".db2_stmt_errormsg());
    }
    else {
        error_log(print_r("Executing an insert",true));
        $stmt= db2_prepare($conn_resource, $sqlinsert);
        $result = db2_execute($stmt, array($cusnum,$lastname,$initials,$street,$city,$stateid,$zipcode,$crdlmt,$charge,$balance,$credit)) 
            or die("Failed SQL Stmt:".$stmt.":".db2_stmt_error().":".db2_stmt_errormsg());
    }
}
else {
    // No data received
    http_response_code(400); // Bad Request
    echo "No JSON data received";
 }
?>