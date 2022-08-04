<?php
// Подключаем PHP Mailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'vendor/autoload.php';
require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';



$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

$mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->isSMTP();                                            //Send using SMTP
$mail->Host       = 'smtp.ukr.net';                     //Set the SMTP server to send through
$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
$mail->Username   = 'form-test@ukr.net';                     //SMTP username
$mail->Password   = 'iEWoaH5yTJjFrp3H';                               //SMTP password
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
$mail->Port       = 2525;



// От кого письмо
$mail->setFrom('form-test@ukr.net');

//Кому отправить
$mail->addAddress('igor1230.ik@gmail.com');

// Тема письма
$mail->Subject = 'Обратная связь';

//Выбор формы RADIO
$hand = "Правая";
if ($_POST['hand'] == "left") {
    echo ($_POST['head']);
    $hand = "Левая";
}


//Тело письма
$body = '<h1> Встречайте письмо </h1>';

if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>ИМЯ:</strong> ' . $_POST['name'] . ' </p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . ' </p>';
}
if (trim(!empty($_POST['hand']))) {
    $body .= '<p><strong>Рука:</strong> ' . $hand . ' </p>';
}
if (trim(!empty($_POST['age']))) {
    $body .= '<p><strong>Возраст:</strong> ' . $_POST['age'] . ' </p>';
}
if (trim(!empty($_POST['message']))) {
    $body .= '<p><strong>Сообщение:</strong> ' . $_POST['message'] . ' </p>';
}

//Прикрепить файл (Изображение)
if (!empty($_FILES['image']['tmp_name'])) {
    // путь загрузки файла
    $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
    //Грузим файл
    if (copy($_FILES['image']['tmp_name'], $filePath)) {
        $fileAttach = $filePath;
        $body .= '<p><strong>Фото в приложении</strong></p>';
        $mail->addAttachment($fileAttach);
    }
}

$mail->Body = $body;


//Отправляем
if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
}


$response = ['message' => $message];
header('Content-type: application/json; charset=utf-8');
echo json_encode($response);
