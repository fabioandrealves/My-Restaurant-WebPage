<?php
header('Content-Type: application/json');
$nome = $_POST['nome'];
$cpf = $_POST['cpf'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$login = $_POST['login'];
$senha = $_POST['senha'];

if (empty($nome) || empty($cpf) || empty($email) || empty($telefone) || empty($login) || empty($senha)) {
    echo json_encode(["success" => false, "message" => "Todos os campos devem ser preenchidos."]);
    return;
}

$host = "localhost";
$usuario = "root";
$senha_banco = "";
$banco = "projeto";

$conn = new mysqli($host, $usuario, $senha_banco, $banco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

$sql = "CALL inserir_cliente_usuario('$nome', '$cpf', '$email', '$telefone', '$login', '$senha')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Erro: " . $conn->error]);
}

$conn->close();
?>
