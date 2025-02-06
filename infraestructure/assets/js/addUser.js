// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");

    // Adiciona um ouvinte de evento para o envio do formulário
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

        // Captura os valores dos campos de entrada do formulário
        const name = document.getElementById("signup-name").value;
        const login = document.getElementById("signup-login").value;
        const password = document.getElementById("signup-password").value;
        const email = document.getElementById("signup-email").value;

        // Monta o objeto JSON com os dados do usuário para enviar à API
        const userData = {
            name: name,
            login: login,
            email: email,
            password: password
        };

        try {
            // Envia os dados para o backend usando fetch
            const response = await fetch("http://localhost:8080/users/save", {
                method: "POST", // Define o método HTTP como POST
                headers: {
                    "Content-Type": "application/json" // Define o tipo de conteúdo como JSON
                },
                body: JSON.stringify(userData) // Converte o objeto JavaScript para JSON
            });

            // Verifica se a resposta da API foi bem-sucedida (status 200-299)
            if (response.ok) {
                const result = await response.json();
                alert("Cadastro realizado com sucesso!"); // Exibe um alerta de sucesso
                window.location.href = "../register/login.html"; // Redireciona para a página de login
            } else {
                // Se houver erro, captura a resposta da API e exibe uma mensagem
                const errorData = await response.json();
                alert(`Erro ao cadastrar: ${errorData.message || "Tente novamente mais tarde"}`);
            }
        } catch (error) {
            // Captura erros de conexão ou problemas com a requisição
            console.error("Erro ao enviar requisição:", error);
            alert("Erro ao conectar com o servidor. Verifique sua conexão.");
        }
    });
});
