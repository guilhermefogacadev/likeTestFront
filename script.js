
function salvarOrcamento() {
  const nomeCliente = document.getElementById("nomeCliente").value;

  const data = "";

  const produtos = [];
  const elementosProduto = document.querySelectorAll(".produto");
  for (const elemento of elementosProduto) {
    const produto = {
      nome: elemento.querySelector("input[id^='nomeProduto']").value,
      valor: elemento.querySelector("input[id^='valorProduto']").value,
      quantidade: elemento.querySelector("input[id^='quantidadeProduto']").value,
    };
    produtos.push(produto);
  }

  const dadosJson = {
    nomeCliente,
    data,
    produtos,
  };

  const jsonStr = JSON.stringify(dadosJson, null, 2);


  fetch('http://localhost:8080/api/orcamento/criar', {
    method: 'post',
    body: jsonStr,
    headers: {
      'Content-Type': 'application/json', 
  },
  })
  .then(async (response) => {
    if (response.status === 201) {
      alert("Orçamento salvo com sucesso!");
    } else {
      const erro = await response.text();
      alert("Erro ao salvar orçamento: " + erro);
    }
  })
  .catch((error) => {
    alert("Erro ao salvar orçamento: " + error.message);
  });
}

function listaOrcamento() {
  fetch('http://localhost:8080/api/orcamento/buscar')
      .then(async (response) => {
          if (response.ok) {
              const data = await response.text();
              alert(data)
          } else {
              const erro = await response.text();
              alert("Erro ao buscar orçamento: " + erro);
          }
      })
      .catch((error) => {
          alert("Erro ao buscar orçamento: " + error.message);
      });
}

  
  
  
let indiceProduto = 1; 

function adicionarProduto() {
  const produtos = document.getElementById("produtos");
  const novoProduto = `
    <div class="produto">
      <label for="nomeProduto${indiceProduto}">Nome do Produto:</label>
      <input type="text" id="nomeProduto${indiceProduto}" name="nomeProduto${indiceProduto}" required>
      <label for="valorProduto${indiceProduto}">Valor:</label>
      <input type="number" id="valorProduto${indiceProduto}" name="valorProduto${indiceProduto}" required>
      <label for="quantidadeProduto${indiceProduto}">Quantidade:</label>
      <input type="number" id="quantidadeProduto${indiceProduto}" name="quantidadeProduto${indiceProduto}" required>
    </div>
  `;

  produtos.innerHTML += novoProduto;
  indiceProduto++;
}
