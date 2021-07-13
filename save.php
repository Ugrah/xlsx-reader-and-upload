<?php

$status = 200;

$results = (object) $_POST;

// Trigger waiting
sleep(3);

http_response_code($status);
header('Content-Type: application/json');
echo json_encode($results);