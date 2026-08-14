const botaoExportar = document.getElementById("exportarRelatorio");

botaoExportar.addEventListener("click", function () {

    const periodo = document.getElementById("periodo").value;

    const dados = [
        ["ZENSYNC - RELATÓRIO DE BEM-ESTAR"],
        [],
        ["Período", periodo],
        [],
        ["INDICADORES GERAIS"],
        ["Indicador", "Resultado"],
        ["Humor médio", "7,8/10"],
        ["Estresse médio", "5,4/10"],
        ["Participação", "72%"],
        ["Check-ins realizados", "1.248"],
        [],
        ["COMPARAÇÃO POR DEPARTAMENTO"],
        [],
        ["Departamento", "Humor", "Estresse", "Participação"],
        ["Marketing", "8,2", "4,1", "86%"],
        ["Vendas", "7,6", "5,2", "78%"],
        ["Operações", "7,1", "5,6", "70%"],
        ["Tecnologia", "6,4", "6,3", "68%"],
        ["Financeiro", "7,0", "4,7", "75%"],
        [],
        ["PONTOS DE ATENÇÃO"],
        [],
        ["Setor", "Indicador", "Informação"],
        ["Tecnologia", "Estresse", "6,3/10"],
        ["Operações", "Participação", "70%"],
        ["Marketing", "Melhor resultado", "Humor 8,2/10 e participação 86%"],
        [],
        ["OBSERVAÇÃO"],
        ["Todos os dados apresentados são anônimos e agregados."]
    ];

    const planilha = XLSX.utils.aoa_to_sheet(dados);

    planilha["!cols"] = [
        { wch: 28 },
        { wch: 22 },
        { wch: 28 },
        { wch: 18 }
    ];

    planilha["!merges"] = [
        {
            s: { r: 0, c: 0 },
            e: { r: 0, c: 3 }
        }
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        planilha,
        "Relatório ZenSync"
    );

    XLSX.writeFile(
        workbook,
        "ZenSync_Relatorio_Bem_Estar.xlsx"
    );

});