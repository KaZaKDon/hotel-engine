<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(["success" => true]);
    exit;
}

// ===== ЗАГРУЗКА .env =====
function loadEnv(string $path): void {
    if (!file_exists($path)) return;

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;

        [$key, $value] = explode('=', $line, 2);

        $_ENV[trim($key)] = trim($value);
    }
}

loadEnv(__DIR__ . '/.env');

// ===== ЧТЕНИЕ JSON =====
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "error" => "Invalid JSON"
    ]);
    exit;
}

// ===== ПОДГОТОВКА ДАННЫХ =====
$name = $data['name'] ?? '';
$phone = $data['phone'] ?? '';
$hotel = $data['hotel'] ?? '';
$room = $data['room'] ?? '';
$bed = $data['bed'] ?? '';
$checkIn = $data['checkIn'] ?? '';
$checkOut = $data['checkOut'] ?? '';
$meals = $data['meals'] ?? '';

// ===== ФОРМИРУЕМ ТЕКСТ =====
$message = "Новая заявка на бронирование\n\n";
$message .= "Гостиница: $hotel\n";
$message .= "Номер: $room\n";
$message .= "Кровать: $bed\n\n";
$message .= "Имя: $name\n";
$message .= "Телефон: $phone\n\n";
$message .= "Заезд: $checkIn\n";
$message .= "Выезд: $checkOut\n";
$message .= "Питание: $meals\n";

// ===== EMAIL SMTP MAIL.RU =====
function smtpSendMail(string $to, string $subject, string $body): bool
{
    $host = $_ENV['SMTP_HOST'] ?? 'smtp.mail.ru';
    $port = (int)($_ENV['SMTP_PORT'] ?? 465);
    $user = $_ENV['SMTP_USER'] ?? '';
    $pass = $_ENV['SMTP_PASS'] ?? '';

    if (!$to || !$user || !$pass) {
        return false;
    }

    $socket = stream_socket_client(
        "ssl://{$host}:{$port}",
        $errno,
        $errstr,
        20,
        STREAM_CLIENT_CONNECT
    );

    if (!$socket) {
        return false;
    }

    $read = function () use ($socket) {
        return fgets($socket, 512);
    };

    $write = function (string $command) use ($socket) {
        fwrite($socket, $command . "\r\n");
    };

    $read();

    $write("EHLO localhost");
    $read();

    $write("AUTH LOGIN");
    $read();

    $write(base64_encode($user));
    $read();

    $write(base64_encode($pass));
    $read();

    $write("MAIL FROM:<{$user}>");
    $read();

    $write("RCPT TO:<{$to}>");
    $read();

    $write("DATA");
    $read();

    $encodedSubject = "=?UTF-8?B?" . base64_encode($subject) . "?=";

    $headers = [];
    $headers[] = "From: {$user}";
    $headers[] = "To: {$to}";
    $headers[] = "Subject: {$encodedSubject}";
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/plain; charset=UTF-8";
    $headers[] = "Content-Transfer-Encoding: 8bit";

    $email = implode("\r\n", $headers)
        . "\r\n\r\n"
        . $body
        . "\r\n.";

    $write($email);
    $read();

    $write("QUIT");
    fclose($socket);

    return true;
}

$emailSent = smtpSendMail(
    $_ENV['BOOKING_EMAIL_TO'] ?? '',
    "Новая бронь",
    $message
);

// ===== TELEGRAM =====
$telegramSent = false;

$botToken = $_ENV['TELEGRAM_BOT_TOKEN'] ?? '';
$chatId = $_ENV['TELEGRAM_CHAT_ID'] ?? '';

if ($botToken && $chatId) {
    $tgUrl = "https://api.telegram.org/bot$botToken/sendMessage";

    $tgData = [
        "chat_id" => $chatId,
        "text" => "🏨 Новая бронь\n\n" . $message
    ];

    $options = [
        "http" => [
            "header"  => "Content-Type: application/x-www-form-urlencoded\r\n",
            "method"  => "POST",
            "content" => http_build_query($tgData),
        ],
    ];

    $context  = stream_context_create($options);
    $result = file_get_contents($tgUrl, false, $context);

    if ($result !== false) {
        $telegramSent = true;
    }
}

// ===== ОТВЕТ =====
echo json_encode([
    "success" => ($emailSent || $telegramSent),
    "email" => $emailSent,
    "telegram" => $telegramSent
]);