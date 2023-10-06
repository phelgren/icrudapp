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

$sql = "select * from QIWS.QCUSTCDT";

/* Prepare and execute the DB2 SQL statement */
$stmt= db2_prepare($conn_resource, $sql);

$result = db2_execute($stmt) 
or die("Failed SQL Stmt:".$stmt.":".db2_stmt_error().":".db2_stmt_errormsg());

$array = array();

       if (!$result) {
           echo 'The db2 execute failed. ';
           echo 'SQLSTATE value: ' . db2_stmt_error();
           echo ' Message: ' .   db2_stmt_errormsg();
        }
        else
        {
          	while ($row = db2_fetch_assoc($stmt))
          {
          	
		$array[] = $row;		
	  }
		echo json_encode($array);
	}

?>