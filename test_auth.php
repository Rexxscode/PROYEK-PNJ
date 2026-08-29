<?php
$baseUrl = 'http://localhost';

function testEndpoint($url, $method = 'GET', $data = null, $token = null) {
    $context = stream_context_create([
        'http' => [
            'method' => $method,
            'header' => [
                'Content-Type: application/json',
                'Accept: application/json',
            ],
        ],
    ]);
    
    $headers = [
        'Content-Type: application/json',
        'Accept: application/json',
    ];
    
    if ($token) {
        $headers[] = 'Authorization: Bearer ' . $token;
    }
    
    $context = stream_context_create([
        'http' => [
            'method' => $method,
            'header' => implode("\r\n", $headers),
            'content' => $data ? json_encode($data) : null,
            'ignore_errors' => true,
        ],
    ]);
    
    $response = file_get_contents($url, false, $context);
    $httpCode = 0;
    if (isset($http_response_header)) {
        foreach ($http_response_header as $header) {
            if (stripos($header, 'HTTP/') === 0) {
                $parts = explode(' ', $header);
                $httpCode = (int)($parts[1] ?? 0);
                break;
            }
        }
    }
    
    return [
        'code' => $httpCode,
        'body' => $response ? json_decode($response, true) : null,
    ];
}

echo "=== Testing Login ===\n";
$login = testEndpoint($baseUrl . '/api/v1/auth/login', 'POST', [
    'email' => 'budi@student.smk.id',
    'password' => 'Budi@2026!',
]);
echo "Code: {$login['code']}\n";
print_r($login['body']);

$token = $login['body']['data']['token'] ?? null;

if ($token) {
    echo "\n=== Testing Me ===\n";
    $me = testEndpoint($baseUrl . '/api/v1/auth/me', 'GET', null, $token);
    echo "Code: {$me['code']}\n";
    print_r($me['body']);
    
    echo "\n=== Testing Logout ===\n";
    $logout = testEndpoint($baseUrl . '/api/v1/auth/logout', 'POST', null, $token);
    echo "Code: {$logout['code']}\n";
    print_r($logout['body']);
    
    echo "\n=== Testing Me after Logout ===\n";
    $meAfter = testEndpoint($baseUrl . '/api/v1/auth/me', 'GET', null, $token);
    echo "Code: {$meAfter['code']}\n";
    print_r($meAfter['body']);
}

echo "\n=== Testing Register Student ===\n";
$regStudent = testEndpoint($baseUrl . '/api/v1/auth/register', 'POST', [
    'name' => 'Test Student',
    'email' => 'teststudent@test.com',
    'password' => 'password123',
    'password_confirmation' => 'password123',
    'role' => 'student',
    'major' => 'RPL',
    'grade' => 'XII',
]);
echo "Code: {$regStudent['code']}\n";
print_r($regStudent['body']);

echo "\n=== Testing Register Industry ===\n";
$regIndustry = testEndpoint($baseUrl . '/api/v1/auth/register', 'POST', [
    'name' => 'Test Industry',
    'email' => 'testindustry@test.com',
    'password' => 'password123',
    'password_confirmation' => 'password123',
    'role' => 'industry',
    'company' => 'Test Company',
]);
echo "Code: {$regIndustry['code']}\n";
print_r($regIndustry['body']);

echo "\n=== Testing Login with Wrong Password ===\n";
$wrongLogin = testEndpoint($baseUrl . '/api/v1/auth/login', 'POST', [
    'email' => 'budi@student.smk.id',
    'password' => 'wrongpassword',
]);
echo "Code: {$wrongLogin['code']}\n";
print_r($wrongLogin['body']);