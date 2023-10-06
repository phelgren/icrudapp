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

/* Construct the SQL statement */

$sql = "select * from QIWS.QCUSTCDT where CUSNUM = ? ";

/* Prepare and execute the DB2 SQL statement */
$stmt= db2_prepare($conn_resource, $sql);

$cusnum = $_REQUEST["cusnum"];

$result = db2_execute($stmt, array($cusnum)) 
or die("Failed SQL Stmt:".$stmt.":".db2_stmt_error().":".db2_stmt_errormsg());

$record = "{}";

       if (!$result) {
           echo 'The db2 execute failed. ';
           echo 'SQLSTATE value: ' . db2_stmt_error();
           echo ' Message: ' .   db2_stmt_errormsg();
        }
        else
        {
          $record = db2_fetch_assoc($stmt);
		      echo json_encode($record);
	      }
      
?>