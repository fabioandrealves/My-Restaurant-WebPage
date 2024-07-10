<?php
session_start();

$username = $_POST['usuario'];
$password = $_POST['senha'];

$host = "localhost";
$usuario = "root";
$senha_banco = "";
$banco = "projeto";

$conn = new mysqli($host, $usuario, $senha_banco, $banco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT * FROM usuario WHERE login = ? AND senha = ?");
$stmt->bind_param("ss", $username, $password);

$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $linha = $resultado->fetch_assoc();
    $id_cliente = $linha["cliente_codigo_cliente"];
    $id_restaurante = $linha['restaurante_codigo_restaurante'];

    if ($id_cliente != null) {
        $sql = "SELECT * FROM cliente WHERE codigo_cliente = $id_cliente";
        if ($resultado = $conn->query($sql)) {
            $linha = $resultado->fetch_assoc();
            $nome = $linha["nome"];
            $email = $linha["email"];
            $telefone = $linha["telefone"];

            $_SESSION['tipo'] = 'cliente';
            $_SESSION['id'] = $id_cliente;
            $_SESSION['nome'] = $nome;
            $_SESSION['email'] = $email;
            $_SESSION['telefone'] = $telefone;
        }
    } else {
        $sql = "SELECT * FROM restaurante WHERE codigo_restaurante = $id_restaurante";
        if ($resultado = $conn->query($sql)) {
            $linha = $resultado->fetch_assoc();
            $nome = $linha["nome_fantasia"];
            $email = $linha["email"];
            $telefone = $linha["telefone"];

            $_SESSION['tipo'] = 'restaurante';
            $_SESSION['id'] = $id_restaurante;
            $_SESSION['nome'] = $nome;
            $_SESSION['email'] = $email;
            $_SESSION['telefone'] = $telefone;
        }
    }

    echo json_encode(array("autenticado" => true, "tipo" => $_SESSION['tipo'], "id" => $_SESSION['id']));
} else {
    echo json_encode(array("autenticado" => false));
}

$stmt->close();
$conn->close();
?>
