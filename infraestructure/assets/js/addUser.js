document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Captura os valores do formulário
        const name = document.getElementById("signup-name").value;
        const login = document.getElementById("signup-login").value;
        const password = document.getElementById("signup-password").value;
        const email = document.getElementById("signup-email").value;

        // Monta o objeto JSON para enviar à API
        const userData = {
            name: name,
            login: login,
            email: email,
            password: password
        };

        try {
            const response = await fetch("http://localhost:8080/users/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const result = await response.json();
                alert("Cadastro realizado com sucesso!");
                window.location.href = "../register/login.html"; // Redireciona para o login
            } else {
                const errorData = await response.json();
                alert(`Erro ao cadastrar: ${errorData.message || "Tente novamente mais tarde"}`);
            }
        } catch (error) {
            console.error("Erro ao enviar requisição:", error);
            alert("Erro ao conectar com o servidor. Verifique sua conexão.");
        }
    });
});
