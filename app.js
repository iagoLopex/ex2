// Classe Funcionario com atributos, construtor, getters, setters e método toString
class Funcionario {
  constructor(nome, idade, cargo, salario) {
      this._nome = nome;
      this._idade = idade;
      this._cargo = cargo;
      this._salario = salario;
  }

  get nome() { return this._nome; }
  set nome(valor) { this._nome = valor; }

  get idade() { return this._idade; }
  set idade(valor) { this._idade = valor; }

  get cargo() { return this._cargo; }
  set cargo(valor) { this._cargo = valor; }

  get salario() { return this._salario; }
  set salario(valor) { this._salario = valor; }

  toString() {
      return `${this._nome} - ${this._idade} anos - ${this._cargo} - R$ ${this._salario}`;
  }
}

// Array para armazenar os funcionários
let funcionarios = [];

// Seleciona elementos do DOM
const form = document.getElementById('formFuncionario');
const tabela = document.querySelector('#tabelaFuncionarios tbody');
const relatoriosDiv = document.getElementById('relatorios');

// Variável para identificar se é uma edição
let indiceEdicao = null;

// Evento para cadastro e atualização
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const idade = Number(document.getElementById('idade').value);
  const cargo = document.getElementById('cargo').value;
  const salario = Number(document.getElementById('salario').value);

  if (indiceEdicao !== null) {
      // Atualiza funcionário existente usando setters
      funcionarios[indiceEdicao].nome = nome;
      funcionarios[indiceEdicao].idade = idade;
      funcionarios[indiceEdicao].cargo = cargo;
      funcionarios[indiceEdicao].salario = salario;
      indiceEdicao = null;
  } else {
      // Cria um novo funcionário
      const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
      funcionarios.push(novoFuncionario);
  }

  atualizarTabela();
  form.reset();
});

// Função para atualizar a tabela com os dados dos funcionários
const atualizarTabela = () => {
  tabela.innerHTML = '';
  funcionarios.forEach((func, index) => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
          <td>${func.nome}</td>
          <td>${func.idade}</td>
          <td>${func.cargo}</td>
          <td>${func.salario}</td>
          <td>
              <button onclick="editarFuncionario(${index})">Editar</button>
              <button onclick="excluirFuncionario(${index})">Excluir</button>
          </td>
      `;
      tabela.appendChild(linha);
  });
};

// Função para excluir um funcionário
const excluirFuncionario = (index) => {
  funcionarios = funcionarios.filter((_, i) => i !== index);
  atualizarTabela();
};

// Função para carregar os dados de um funcionário no formulário para edição
const editarFuncionario = (index) => {
  const func = funcionarios[index];
  document.getElementById('nome').value = func.nome;
  document.getElementById('idade').value = func.idade;
  document.getElementById('cargo').value = func.cargo;
  document.getElementById('salario').value = func.salario;
  indiceEdicao = index;
};

// Relatórios utilizando métodos de array com arrow functions

// Relatório: Funcionários com salário > R$5000
document.getElementById('btnRelatorioSalario').addEventListener('click', () => {
  const relatorio = funcionarios.filter(func => func.salario > 5000);
  relatoriosDiv.innerHTML = `<h3>Funcionários com salário > R$5000</h3><pre>${JSON.stringify(relatorio, null, 2)}</pre>`;
});

// Relatório: Média Salarial
document.getElementById('btnMediaSalarial').addEventListener('click', () => {
  const media = funcionarios.length > 0 
      ? (funcionarios.reduce((acc, func) => acc + func.salario, 0) / funcionarios.length).toFixed(2) 
      : 0;
  relatoriosDiv.innerHTML = `<h3>Média Salarial</h3><pre>R$ ${media}</pre>`;
});

// Relatório: Cargos Únicos
document.getElementById('btnCargosUnicos').addEventListener('click', () => {
  const cargos = [...new Set(funcionarios.map(func => func.cargo))];
  relatoriosDiv.innerHTML = `<h3>Cargos Únicos</h3><pre>${JSON.stringify(cargos, null, 2)}</pre>`;
});

// Relatório: Nomes em Maiúsculo
document.getElementById('btnNomesMaiusculo').addEventListener('click', () => {
  const nomes = funcionarios.map(func => func.nome.toUpperCase());
  relatoriosDiv.innerHTML = `<h3>Nomes em Maiúsculo</h3><pre>${JSON.stringify(nomes, null, 2)}</pre>`;
});
