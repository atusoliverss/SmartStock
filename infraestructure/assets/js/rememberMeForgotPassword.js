document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os elementos do formulário
    const loginForm = document.getElementById("singin-form");
    const loginInput = document.getElementById("singin-login");
    const passwordInput = document.getElementById("login-password");
    const rememberMeCheckbox = document.getElementById("remember-me");
    const forgotPasswordLink = document.querySelector("a.text-decoration-none.text-primary");

    // 🔹 Recuperar login salvo no localStorage (se houver)
    if (localStorage.getItem("rememberedLogin")) {
        loginInput.value = localStorage.getItem("rememberedLogin"); // Preenche o login salvo
        passwordInput.focus(); // Foca no campo de senha para facilitar o preenchimento
        rememberMeCheckbox.checked = true; // Marca a opção "Lembrar-me"
    }

    // 🔹 Armazena ou remove o login ao enviar o formulário
    loginForm.addEventListener("submit", (event) => {
        if (rememberMeCheckbox.checked) {
            localStorage.setItem("rememberedLogin", loginInput.value); // Salva o login no localStorage
        } else {
            localStorage.removeItem("rememberedLogin"); // Remove o login salvo, se desmarcado
        }
    });

    // 🔹 Redirecionamento ao clicar em "Esqueci a senha"
    forgotPasswordLink.addEventListener("click", (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link
        window.location.href = "../forgot-password/forgot-password.html"; // Redireciona para a página de recuperação de senha
    });
});
