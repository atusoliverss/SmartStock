document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o formulário de login pelo ID
    const loginForm = document.getElementById("singin-form");

    // Adiciona um evento de submit ao formulário
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário (recarregar a página)

        // Captura os valores dos campos de login e senha
        const login = document.getElementById("singin-login").value;
        const password = document.getElementById("login-password").value;

        // Monta o objeto JSON para enviar à API
        const requestData = {
            login: login,
            password: password
        };

        try {
            // Envia a requisição para a API de autenticação
            const response = await fetch("http://localhost:8080/users/findbyloginandpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData) // Converte o objeto em JSON para envio
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error("Usuário não encontrado ou credenciais inválidas");
            }

            // Converte a resposta para JSON
            const userData = await response.json();
            if (userData) {
                // Armazena os dados do usuário no localStorage para uso futuro
                localStorage.setItem("user", JSON.stringify(userData));
                
                // Redireciona o usuário para a página inicial após o login bem-sucedido
                window.location.href = "../home/home.html";
            }
        } catch (error) {
            // Exibe uma mensagem de erro ao usuário
            alert("Erro: " + error.message);
        }
    });
});
