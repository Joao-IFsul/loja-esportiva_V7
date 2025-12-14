const API = '/api';

// ===== USUÁRIO =====
document.getElementById('btnCadastrar').addEventListener('click', async () => {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  if (!nome || !email) {
    alert('Preencha nome e email!');
    return;
  }

  const res = await fetch(`${API}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email })
  });

  const data = await res.json();

  localStorage.setItem('usuario', JSON.stringify(data[0]));
  alert('Usuário cadastrado com sucesso!');
});

// ===== PRODUTOS =====
async function carregarProdutos() {
  try {
    const res = await fetch(`${API}/products`);

    if (!res.ok) {
      throw new Error('Erro ao buscar produtos');
    }

    const produtos = await res.json();

    const grid = document.getElementById('produtos');
    grid.innerHTML = '';

    produtos.forEach(produto => {
      grid.innerHTML += `
        <div class="card">
          <h3>${produto.nome}</h3>
          <p>${produto.descricao || ''}</p>
          <p><strong>R$ ${Number(produto.preco).toFixed(2)}</strong></p>
          <button onclick="adicionarCarrinho(
            '${produto.id}',
            '${produto.nome}',
            ${produto.preco}
          )">
            Adicionar ao Carrinho
          </button>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar produtos');
  }
}

function adicionarCarrinho(id, nome, preco) {
  const usuario = localStorage.getItem('usuario');

  if (!usuario) {
    alert('⚠️ Cadastre um usuário antes de adicionar produtos!');
    return;
  }

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  carrinho.push({ id, nome, preco });

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert('Produto adicionado ao carrinho!');
}

carregarProdutos();