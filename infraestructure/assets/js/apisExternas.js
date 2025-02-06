document.addEventListener("DOMContentLoaded", function () {
    // Seleciona as imagens que representam os botões de login social pelo atributo 'alt'
    const googleButton = document.querySelector("img[alt='Google']");
    const facebookButton = document.querySelector("img[alt='Facebook']");
    const appleButton = document.querySelector("img[alt='Apple']");

    // URLs das APIs oficiais de autenticação OAuth para cada provedor
    const authUrls = {
        Google: "https://accounts.google.com/o/oauth2/auth?client_id=SEU_CLIENT_ID&redirect_uri=http://localhost:8080/auth/callback&response_type=code&scope=email profile",
        Facebook: "https://www.facebook.com/v18.0/dialog/oauth?client_id=SEU_CLIENT_ID&redirect_uri=http://localhost:8080/auth/callback&response_type=code&scope=email,public_profile",
        Apple: "https://appleid.apple.com/auth/authorize?client_id=SEU_CLIENT_ID&redirect_uri=http://localhost:8080/auth/callback&response_type=code&scope=email name"
    };

    // Função que redireciona o usuário para a URL de autenticação do provedor escolhido
    function redirectToAuth(provider) {
        if (authUrls[provider]) {
            window.location.href = authUrls[provider]; // Redireciona para a URL correspondente
        } else {
            console.error("Provedor inválido!"); // Exibe erro caso o provedor não seja encontrado
        }
    }

    // Adiciona eventos de clique nos botões para chamar a função de redirecionamento
    googleButton.addEventListener("click", () => redirectToAuth("Google"));
    facebookButton.addEventListener("click", () => redirectToAuth("Facebook"));
    appleButton.addEventListener("click", () => redirectToAuth("Apple"));
});
