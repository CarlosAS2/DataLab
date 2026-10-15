
/* DataLab | Laboratórios e desafios de JavaScript - Grupo 5, 3º INTIN */

(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const escJS = value => JSON.stringify(value);
  const INITIAL_FRUITS = ['Maçã', 'Banana', 'Uva'];
  let fruits = [...INITIAL_FRUITS];
  let pushHistory = [];
  let selected = 0;
  let lastArrayAction = 'console.log(frutas[0]);';
  let lastArrayMessage = 'Maçã';

  function renderArray(){
    const wrap = $('array-cards');
    wrap.replaceChildren();
    fruits.forEach((fruit,index)=>{
      const b = document.createElement('button');
      b.type='button'; b.className='array-item'+(index===selected?' active':'');
      b.setAttribute('aria-label',`Índice ${index}: ${fruit}`);
      b.setAttribute('aria-pressed',String(index===selected));
      const num=document.createElement('span');num.className='index';num.textContent=`índice ${index}`;
      const v=document.createElement('span');v.className='value';v.textContent=fruit;
      b.append(num,v);
      b.addEventListener('click',()=>{selected=index;lastArrayAction=`console.log(frutas[${index}]);`;lastArrayMessage=fruit;renderArray();});
      wrap.appendChild(b);
    });
    $('array-count').textContent=`${fruits.length} ${fruits.length===1?'item':'itens'}`;
    $('array-length').textContent=`frutas.length = ${fruits.length}`;
    $('array-selected').textContent=`índice selecionado = ${selected}`;
    $('array-explanation').textContent=`O índice ${selected} acessa ${escJS(fruits[selected])}. O primeiro índice sempre é 0.`;
    $('array-code').textContent=`let frutas = ${JSON.stringify(INITIAL_FRUITS)};\n${pushHistory.map(item=>`frutas.push(${escJS(item)});`).join('\n')}\n// Quantos elementos há?\nconsole.log(frutas.length); // ${fruits.length}\n\n// Ação de agora:\n${lastArrayAction}`;
    $('array-output').textContent=lastArrayMessage;
  }

  $('array-form').addEventListener('submit',e=>{
    e.preventDefault();
    if(fruits.length>=8){$('array-output').textContent='Limite de 8 elementos nesta demonstração. Reinicie a lista para continuar!';return;}
    const value=$('new-item').value.trim();
    if(!value)return;
    fruits.push(value);pushHistory.push(value);selected=fruits.length-1;
    lastArrayAction=`console.log(frutas);`;
    lastArrayMessage=`[${fruits.map(escJS).join(', ')}]`;
    $('new-item').value='';renderArray();
  });

  $('array-reset').addEventListener('click',()=>{fruits=[...INITIAL_FRUITS];pushHistory=[];selected=0;lastArrayAction='console.log(frutas[0]);';lastArrayMessage='Maçã';renderArray();});

  const defaultStudent = {nome:'Ana',idade:17,turma:'3º INTIN'};
  let student={...defaultStudent};

  function renderObject(message){
    $('obj-name-view').textContent=student.nome;
    $('obj-age-view').textContent=student.idade;
    $('obj-class-view').textContent=student.turma;
    $('object-code').textContent=`let aluno = {\n  nome: ${escJS(student.nome)},\n  idade: ${student.idade},\n  turma: ${escJS(student.turma)}\n};\n\nconsole.log(aluno.nome);`;
    $('object-output').textContent=message||student.nome;
  }

  $('object-form').addEventListener('submit',e=>{
    e.preventDefault();
    const nome=$('obj-name').value.trim();const idade=Number($('obj-age').value);const turma=$('obj-class').value.trim();
    if(!nome||!turma||!Number.isInteger(idade)||idade<1||idade>120){$('object-output').textContent='Confira os dados: a idade deve ser um número inteiro entre 1 e 120.';return;}
    student={nome,idade,turma};renderObject(`Objeto atualizado! aluno.nome → ${student.nome}`);
  });

  $('object-reset').addEventListener('click',()=>{student={...defaultStudent};$('obj-name').value=student.nome;$('obj-age').value=student.idade;$('obj-class').value=student.turma;renderObject('Objeto restaurado!');});

  let students=[];
  const colorEmojis=['📚','🎒','✏️','🧠','💡','📝','🚀','⭐'];

  function renderMission(message){
    $('mission-count').textContent=`alunos.length = ${students.length}`;
    $('mission-progress').textContent=students.length>=3?'Missão concluída ✓':`Missão: ${students.length}/3`;
    const wrap=$('mission-roster');wrap.replaceChildren();

    if(!students.length){const p=document.createElement('p');p.textContent='Nenhum estudante cadastrado. Comece acima! 👆';wrap.appendChild(p);}

    students.forEach((s,i)=>{
      const card=document.createElement('div');card.className='roster-card';
      const em=document.createElement('div');em.className='em';em.textContent=colorEmojis[i%colorEmojis.length];
      const name=document.createElement('b');name.textContent=s.nome;
      const grade=document.createElement('small');grade.textContent=`Índice ${i} · Nota ${String(s.nota).replace('.',',')}`;
      card.append(em,name,grade);wrap.appendChild(card);
    });

    const entries=students.map(s=>`alunos.push({ nome: ${escJS(s.nome)}, nota: ${s.nota} });`).join('\n');
    $('mission-code').textContent=`let alunos = [];\n${entries}\n\nconsole.log(alunos.length); // ${students.length}${students.length?'\nconsole.log(alunos[0].nome); // '+students[0].nome:''}`;
    $('mission-output').textContent=message||(students.length>=3?'🎉 Parabéns! Você criou um array de objetos. Missão concluída!':`Faltam ${3-students.length} ${students.length===2?'estudante':'estudantes'} para concluir a missão.`);
  }

  $('mission-form').addEventListener('submit',e=>{
    e.preventDefault();
    if(students.length>=8){renderMission('Limite de 8 estudantes nesta demonstração. Limpe para cadastrar novamente.');return;}
    const nome=$('mission-name').value.trim();const nota=Number($('mission-grade').value);
    if(!nome||!Number.isFinite(nota)||nota<0||nota>10){renderMission('Confira o nome e escolha uma nota de 0 a 10.');return;}
    students.push({nome,nota});
    $('mission-name').value='';$('mission-grade').value='';
    renderMission(students.length>=3?'🎉 Missão concluída! Cada cadastro é um objeto dentro do array alunos.':`Cadastro adicionado com alunos.push({ nome: ${escJS(nome)}, nota: ${nota} })`);
    $('mission-name').focus();
  });

  $('mission-reset').addEventListener('click',()=>{students=[];renderMission('Lista limpa. Experimente cadastrar três estudantes!');});

  const questions=[
    {q:'Em JavaScript, qual é o índice do primeiro elemento de um array?',answers:['0','1','10'],correct:0,why:'Os índices começam em 0. Exemplo: frutas[0] acessa a primeira fruta.'},
    {q:'Qual propriedade informa a quantidade de elementos?',answers:['.push()','.length','.nome'],correct:1,why:'.length retorna o número de elementos do array.'},
    {q:'O que frutas.push("Kiwi") faz?',answers:['Apaga toda a lista','Mostra o primeiro item','Adiciona "Kiwi" ao final'],correct:2,why:'.push() acrescenta um ou mais elementos ao final do array.'},
    {q:'Qual opção acessa o nome do objeto aluno?',answers:['aluno.nome','aluno[0]','aluno.push(nome)'],correct:0,why:'Em um objeto, usamos propriedades como aluno.nome ou aluno["nome"].'}
  ];

  let qIndex=0,score=0,answered=false;

  function renderQuiz(){
    if(qIndex>=questions.length){
      $('quiz-number').textContent='Desafio finalizado';$('quiz-bar').style.width='100%';
      $('quiz-question').textContent=score===4?'Você gabaritou! 🥳':'Desafio concluído! 🎉';
      $('quiz-choices').replaceChildren();
      $('quiz-feedback').textContent=score===4?'Você domina os fundamentos!':'Revise os exemplos dos laboratórios e tente outra vez.';
      $('quiz-next').hidden=true;$('quiz-restart').hidden=false;
      $('quiz-summary').textContent=score===4?'Mestre dos Dados desbloqueado!':'Você está evoluindo. Continue praticando!';
      return;
    }

    answered=false;$('quiz-next').hidden=true;$('quiz-restart').hidden=true;
    const question=questions[qIndex];$('quiz-number').textContent=`Pergunta ${qIndex+1} de ${questions.length}`;
    $('quiz-bar').style.width=`${(qIndex/questions.length)*100}%`;
    $('quiz-question').textContent=question.q;$('quiz-feedback').textContent='Selecione uma resposta.';
    const wrap=$('quiz-choices');wrap.replaceChildren();

    question.answers.forEach((opt,index)=>{
      const b=document.createElement('button');b.className='choice';b.type='button';b.textContent=`${String.fromCharCode(65+index)}. ${opt}`;
      b.addEventListener('click',()=>{
        if(answered)return;
        answered=true;if(index===question.correct)score++;
        [...wrap.children].forEach((child,i)=>{child.disabled=true;if(i===question.correct)child.classList.add('correct');else if(i===index)child.classList.add('wrong');});
        $('quiz-feedback').textContent=(index===question.correct?'✅ Acertou! ':'❌ Quase! ')+question.why;
        $('quiz-score').textContent=`${score}/${questions.length}`;
        $('quiz-next').textContent=qIndex===questions.length-1?'Ver resultado →':'Próxima pergunta →';$('quiz-next').hidden=false;
      });
      wrap.appendChild(b);
    });
  }

  $('quiz-next').addEventListener('click',()=>{if(!answered)return;qIndex++;renderQuiz();});
  $('quiz-restart').addEventListener('click',()=>{qIndex=0;score=0;$('quiz-score').textContent='0/4';$('quiz-summary').textContent='Cada acerto é um passo a mais para dominar JavaScript!';renderQuiz();});

  renderArray();renderObject();renderMission();renderQuiz();
})();
