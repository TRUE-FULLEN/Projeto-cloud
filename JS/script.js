//passo 1
let titulo = document.querySelector('#titulo');

//passo 2
titulo.addEventListener('click', function() {
    //passo 3
    titulo.style.backgroundColor = "red";
});

let div_element = document.querySelector('#div_element');

div_element.addEventListener('mouseover', function() {
    div_element.style.backgroundColor = "blue";
});

div_element.addEventListener('mouseout', function() {
    div_element.style.backgroundColor = "white";
});

function sumAndMultiply(a, b, c) {
    return (a + b) * c;
}

function areaCirculo(raio) {
    return Math.PI * raio * raio;
}

function temperatureConverter(celsius) {
    return (celsius * 9/5) + 32;
}   

function mensagemNascimento(nome, idade) {
    let anoAtual = 2026;
    let anoNascimento = anoAtual - idade;
    return `Olá ${nome}, nasceste em ${anoNascimento}`;
}

let objeto = {
  nome: "Francisco",
  anoNascimento: 1998
}

function converterIdade(pessoa) {
  let anoAtual = 2026;
  let idadeCalculada = anoAtual - pessoa.anoNascimento;
  return {
    nome: pessoa.nome,
    idade: idadeCalculada
  };
}

let alunos = [
  { nome: "João", idade: 20 },
  { nome: "Teresa", idade: 23 },
  { nome: "Maria", idade: 25 }
];

console.log("--- Lista de todos os alunos ---");

alunos.forEach(function(aluno) {
  console.log("Nome: " + aluno.nome + " | Idade: " + aluno.idade);
});

console.log("\n--- Alunos com mais de 21 anos ---");

alunos.forEach(function(aluno) {
  if (aluno.idade > 21) {
    console.log(aluno.nome + " tem " + aluno.idade + " anos.");
  }
});

let alunos2 = [
  { nome: "João", idade: 20 },
  { nome: "Teresa", idade: 23 },
  { nome: "Maria", idade: 25 }
];

let nomesApenas = alunos2.map(function(aluno) {
  return aluno.nome; 
});

console.log("Apenas nomes:", nomesApenas);

let alunosMaiores = alunos2.filter(function(aluno) {
  return aluno.idade > 21;
});

console.log("Alunos com mais de 21 anos:", alunosMaiores);

console.log(sumAndMultiply(2, 3, 4)); 
console.log(areaCirculo(5));    
console.log(temperatureConverter(25));   
console.log(mensagemNascimento("João", 30));
console.log(converterIdade(objeto));