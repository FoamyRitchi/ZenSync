const opcoes = document.querySelectorAll(".opcao");

opcoes.forEach(opcao => {
    opcao.addEventListener("click", function () {

        opcoes.forEach(item => {
            item.classList.remove("selecionada");
        });

        this.classList.add("selecionada");
    });
});


const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

if (mensagem && contador) {

    mensagem.addEventListener("input", function () {

        contador.textContent =
            this.value.length + "/1000 caracteres";

    });

}


const toggleAnonimo = document.getElementById("toggleAnonimo");

if (toggleAnonimo) {

    toggleAnonimo.addEventListener("click", function () {

        this.classList.toggle("ativo");

    });

}


function mostrarAviso(titulo, texto, tipo = "") {

    const avisoExistente =
        document.querySelector(".aviso");

    if (avisoExistente) {
        avisoExistente.remove();
    }

    const aviso =
        document.createElement("div");

    aviso.className = "aviso " + tipo;

    let icone = "fa-check";

    if (tipo === "atencao") {
        icone = "fa-exclamation";
    }

    if (tipo === "erro") {
        icone = "fa-xmark";
    }

    aviso.innerHTML = `
        <div class="aviso-icone">
            <i class="fa-solid ${icone}"></i>
        </div>

        <div class="aviso-conteudo">
            <strong>${titulo}</strong>
            <span>${texto}</span>
        </div>
    `;

    document.body.appendChild(aviso);

    setTimeout(() => {
        aviso.classList.add("mostrar");
    }, 50);

    setTimeout(() => {

        aviso.classList.remove("mostrar");

        setTimeout(() => {
            aviso.remove();
        }, 350);

    }, 3000);
}


const botaoEnviar =
    document.getElementById("botaoEnviar");

if (botaoEnviar) {

    botaoEnviar.addEventListener("click", function () {

        const texto =
            mensagem.value.trim();

        if (texto === "") {

            mostrarAviso(
                "Mensagem vazia",
                "Escreva sua mensagem antes de enviar.",
                "atencao"
            );

            return;
        }

        if (texto.length < 10) {

            mostrarAviso(
                "Mensagem muito curta",
                "Escreva um pouco mais para enviar.",
                "atencao"
            );

            return;
        }

        mensagem.value = "";

        contador.textContent =
            "0/1000 caracteres";

        mostrarAviso(
            "Mensagem enviada!",
            "Sua mensagem foi registrada com sucesso."
        );

    });

}


const botaoSair =
    document.getElementById("botaoSair");

if (botaoSair) {

    botaoSair.addEventListener("click", function (evento) {

        evento.preventDefault();

        const destino = this.getAttribute("href");

        mostrarAviso(
            "Saindo...",
            "Você será direcionado para a tela inicial."
        );

        setTimeout(() => {

            window.location.href = destino;

        }, 2000);

    });

}


const verTodas =
    document.getElementById("verTodas");

if (verTodas) {

    verTodas.addEventListener("click", function () {

        mostrarAviso(
            "Minhas mensagens",
            "Aqui serão exibidas todas as suas mensagens."
        );

    });

}