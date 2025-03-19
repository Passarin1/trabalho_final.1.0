document.addEventListener("DOMContentLoaded", function () {
    const botaoGerar = document.getElementById("gerarRotina");
    
    if (botaoGerar) {
        botaoGerar.addEventListener("click", gerarRotina);
    }
    
    if (window.location.pathname.includes("rotina-personalizada.html")) {
        exibirRotinaPersonalizada();
    }
});

function gerarRotina() {
    const campos = ["limpeza", "hidratacao", "pele", "horario"];
    let dados = {};
    
    for (let campo of campos) {
        const valor = document.getElementById(campo)?.value;
        if (!valor) {
            alert("Por favor, selecione todas as opções.");
            return;
        }
        dados[campo] = valor;
    }
    
    // Salvar no localStorage
    for (let chave in dados) {
        localStorage.setItem(chave, dados[chave]);
    }
    
    // Redirecionar para a página de rotina personalizada
    window.location.href = "rotina-personalizada.html";
}

function exibirRotinaPersonalizada() {
    const resultadoDiv = document.getElementById("resultado");
    if (!resultadoDiv) return;

    const campos = {
        limpeza: "Limpeza",
        hidratacao: "Hidratação",
        pele: "Tipo de Pele",
        horario: "Horário da Rotina"
    };

    let conteudo = "<h3>Sua Rotina Personalizada</h3>";
    let dadosPreenchidos = false;
    
    for (let campo in campos) {
        let valor = localStorage.getItem(campo) ?? "Não informado";
        if (valor !== "Não informado") dadosPreenchidos = true;
        conteudo += `<p><strong>${campos[campo]}:</strong> ${formatarTexto(valor)}</p>`;
    }
    
    if (!dadosPreenchidos) {
        conteudo = "<p>Nenhuma rotina foi selecionada. Volte e escolha suas preferências.</p>";
    } else {
        conteudo += "<p>Para obter melhores resultados, siga as instruções recomendadas para cada etapa.</p>";
    }
    
    resultadoDiv.innerHTML = conteudo;
}

function formatarTexto(texto) {
    return texto.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
