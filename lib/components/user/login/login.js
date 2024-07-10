document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const mensagem = document.getElementById("mensagem");

    function validarLogin() {
        var usuario = document.getElementById("usuario").value;
        var senha = document.getElementById("senha").value;

        if (usuario === "" || senha === "") {
            mensagem.innerText = "Por favor, preencha todos os campos.";
        } else {
            const formData = new FormData(loginForm);
            fetch("login.php", {
                method: "POST",
                body: formData,
            })
            .then((response) => response.json())
            .then((dados) => {
                if (dados.autenticado) {
                    window.location.href = "../../index.html";
                } else {
                    mensagem.innerText = "Usuário não cadastrado.";
                }
            })
            .catch((error) => {
                console.error("Erro:", error);
                alert("Ocorreu um erro ao enviar o formulário.");
            });
        }
    }

    function cadastrar() {
        window.location.href = "../userRegister/cadastro.html";
    }

    window.validarLogin = validarLogin;
    window.cadastrar = cadastrar;
});
