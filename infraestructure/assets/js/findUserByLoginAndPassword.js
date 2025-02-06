document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("singin-form");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário

        const login = document.getElementById("singin-login").value;
        const password = document.getElementById("login-password").value;

        const requestData = {
            login: login,
            password: password
        };

        try {
            const response = await fetch("http://localhost:8080/users/findbyloginandpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error("Usuário não encontrado ou credenciais inválidas");
            }

            const userData = await response.json();
            if (userData) {
                // Salvar usuário no localStorage (se necessário)
                localStorage.setItem("user", JSON.stringify(userData));
                
                // Redirecionar para a página inicial
                window.location.href = "../home/home.html";
            }
        } catch (error) {
            alert("Erro: " + error.message);
        }
    });
});
