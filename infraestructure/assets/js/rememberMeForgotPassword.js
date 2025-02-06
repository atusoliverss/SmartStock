document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("singin-form");
    const loginInput = document.getElementById("singin-login");
    const passwordInput = document.getElementById("login-password");
    const rememberMeCheckbox = document.getElementById("remember-me");
    const forgotPasswordLink = document.querySelector("a.text-decoration-none.text-primary");

    // 🔹 Recuperar login salvo
    if (localStorage.getItem("rememberedLogin")) {
        loginInput.value = localStorage.getItem("rememberedLogin");
        passwordInput.focus();
        rememberMeCheckbox.checked = true;
    }

    // 🔹 Lembre-se de mim (Salvar no localStorage)
    loginForm.addEventListener("submit", (event) => {
        if (rememberMeCheckbox.checked) {
            localStorage.setItem("rememberedLogin", loginInput.value);
        } else {
            localStorage.removeItem("rememberedLogin");
        }
    });

    // 🔹 Esqueci a senha (Redirecionamento)
    forgotPasswordLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "../forgot-password/forgot-password.html";
    });
});
