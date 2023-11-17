<!-- 
  <?php
// Database connection parameters
$host = 'localhost';
$dbname = 'example_db';
$username = 'your_username';
$password = 'your_password';

try {
    // Create a PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Perform a simple query (select all users)
    $sql = "SELECT * FROM users";
    $stmt = $pdo->query($sql);

    // Fetch and display the results
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "ID: {$row['id']}, Username: {$row['username']}, Email: {$row['email']}<br>";
    }
} catch (PDOException $e) {
    // Handle database connection or query errors
    echo "Error: " . $e->getMessage();
}
?> -->


<?php
  //Dealing with Error reporting
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  try {
      // Conncect to database
      $dsn = 'mysql:host=localhost;dbname=lab6';
      $username = 'phpmyadmin';
      $password = 'M4k3t14!';

      $pdo = new PDO($dsn, $username, $password); //Establishing connection

      // Set the PDO error mode to exception
      $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      // Retrieve content data from the Web Sys course
      $sql = "SELECT JSON_OBJECT('Websys_course',course_json) FROM courses WHERE title = 'Web-Systems Development';";
      $stmt = $pdo->query($sql);

      $data = $stmt->fetch(PDO::FETCH_ASSOC);

      
      echo ($data['JSON_OBJECT(\'Websys_course\',course_json)'] );
      // echo json_encode($data[0]['course_json']);

      // Send JSON response
      // header('Content-Type: application/json');

      
      // if (!empty($data)) {
      //     echo json_encode($data[0]['course_json']);
      // } else {
      //     echo json_encode(['error' => 'No data found']);
      // }
  } catch (PDOException $e) {
      // Handle database connection or query errors
      echo json_encode(['error' => 'Failed to retrieve content. ' . $e->getMessage()]);
  } 
?>