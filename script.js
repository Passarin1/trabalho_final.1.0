document.addEventListener("DOMContentLoaded", function () {
    const botaoGerar = document.getElementById("gerarRotina");
    if (botaoGerar) {
        botaoGerar.addEventListener("click", function () {
            const limpeza = document.getElementById("limpeza").value;
            const hidratacao = document.getElementById("hidratacao").value;

            if (!limpeza || !hidratacao) {
                alert("Por favor, selecione todas as opções.");
                return;
            }

            // Salvar escolhas no localStorage para acessar na próxima página
            localStorage.setItem("limpeza", limpeza);
            localStorage.setItem("hidratacao", hidratacao);
            
            // Redirecionar para a página de rotina personalizada
            window.location.href = "rotina-personalizada.html";
        });
    }

    // Exibir a rotina personalizada na outra página
    if (window.location.pathname.includes("rotina-personalizada.html")) {
        const resultadoDiv = document.getElementById("resultado");
        if (resultadoDiv) {
            const limpeza = localStorage.getItem("limpeza");
            const hidratacao = localStorage.getItem("hidratacao");

            if (limpeza && hidratacao) {
                resultadoDiv.innerHTML = `
                    <h3>Sua Rotina Personalizada</h3>
                    <p><strong>Limpeza:</strong> ${formatarTexto(limpeza)}</p>
                    <p><strong>Hidratação:</strong> ${formatarTexto(hidratacao)}</p>
                    <p>Para obter melhores resultados, siga as instruções recomendadas para cada etapa.</p>
                `;
            } else {
                resultadoDiv.innerHTML = "<p>Nenhuma rotina foi selecionada. Volte e escolha suas preferências.</p>";
            }
        }
    }
});

// Função para formatar o texto exibido
function formatarTexto(texto) {
    return texto.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}