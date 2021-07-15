<?php

$status = 200;

$results = (object) [
    'name' => 'Grah',
    'firstname' => 'Ulrich',
];

http_response_code($status);
header('Content-Type: application/json');
echo json_encode($results);