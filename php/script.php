<?php
// Debug: Show all submitted form data (for testing only; remove in production)
var_dump($_POST);

// Get form data
$fullName = $_POST['cname'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$prefs = $_POST['prefs'];
$mode_of_payment = $_POST['mode'];
$town = $_POST['town'];
$foodItemArray = $_POST['food']; // fixed typo from $food_Item_Array

//  1. Validate name (only letters and spaces)
if (!preg_match("/^[a-zA-Z\s]*$/", $fullName)) {
    die("Error: Name must contain only letters and spaces.");
}
//  2. Food prices
$prices = [
    "Chapo" => 20,
    "Ugali" => 15,
    "Rice" => 25,
    "Beans" => 30,
    "Ndengu" => 35,
    "Beef" => 150
];

// 3. Loop through selected items
$foodItemsString = '';
$foodItemsQuantity = '';
$total_cost = 0;

foreach ($foodItemArray as $item) {
    $qty = intval($_POST[$item . '-qty']);
    $foodItemsString .= $item . ', ';
    $foodItemsQuantity .= $qty . ', ';
    if (isset($prices[$item])) {
        $total_cost += $prices[$item] * $qty;
    }
}

//  4. Prepare date and status
$order_date = date('Y-m-d H:i:s');
$order_status = 'Pending';

//  5. Connect to MariaDB (port 3307)
$conn = new mysqli('localhost', 'root', '', 'food_ordering', 3307);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//  6. Insert query (using correct backticks or no quotes at all)
$sql = "INSERT INTO orders 
(name, phone, email, preferences, mode_of_payment, town, food_items, food_items_quantity, total_cost, order_date, order_status) 
VALUES 
('$fullName', '$phone', '$email', '$prefs', '$mode_of_payment', '$town', '$foodItemsString', '$foodItemsQuantity', $total_cost, '$order_date', '$order_status')";

//  7. Execute query and give feedback
if ($conn->query($sql) === TRUE) {
    echo " Order placed successfully!";
} else {
    echo " Error: " . $conn->error;
}

$conn->close();
?>

