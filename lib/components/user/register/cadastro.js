document.addEventListener("DOMContentLoaded", function() {
    const cadastroForm = document.getElementById("cadastroForm");
    const mensagem = document.getElementById("mensagem");

    function validarCadastro() {
        const formData = new FormData(cadastroForm);

        fetch("cadastro.php", {
            method: "POST",
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Usuário cadastrado!");
                window.location.href = "../login/login.html";
            } else {
                mensagem.innerHTML = data.message;
            }
        })
        .catch((error) => {
            console.error("Erro:", error);
            alert("Ocorreu um erro ao enviar o formulário.");
        });
    }

    function voltar() {
        window.location.href = "../login/login.html";
    }

    window.validarCadastro = validarCadastro;
    window.voltar = voltar;
});
