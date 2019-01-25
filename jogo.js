var timerId = null; // variável que armazena chamada 


function iniciaJogo(){

	var nivel_jogo = window.location.search.replace("?",""); // apenas pega o query da pagina para o nivel


	//var nivel_jogo = url.replace("?",""); // tirar  interrogação da resposta

	var tempo_segundos = 0;

	if(nivel_jogo == 1){
			//1 fácil 	-> 120 seg
		tempo_segundos = 120;

	}

	if(nivel_jogo == 2){
		//2 normal -> 60 seg
		tempo_segundos = 60;
		
	}

	if(nivel_jogo == 3){
		//3 difícil -> 30 seg
		tempo_segundos = 30;
		
	}

	// inserindo segundos no span

	document.getElementById('cronometro').innerHTML = tempo_segundos; // inserir dentro do conteudo html

	//quantidade de baoes

	var qtde_baloes = 80;

	criar_Baloes(qtde_baloes);

	//imprimri quantidade de baloes inteiros

	document.getElementById('balaos_inteiros').innerHTML = qtde_baloes;
	document.getElementById('balaos_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1);

	//contagem_tempo(tempo_segundos);
}

function contagem_tempo(segundos){

	segundos--;

	if(segundos == -1){ // para o cronometr nao negativas
		clearTime(timerId); // ja que ele esta referencia a funcao por essa variável
		gamer_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")", 1000); //("execute esse função" , a cada , millesegundos)

}

function game_over(){
	alert('Fim de jogo, voce não conseguiu estourar todos os balões a tempo');
}

function criar_Baloes(qtde_baloes){

	for( var i = 1; i<= qtde_baloes; i++){

		var balao = document.createElement("img"); // cria um elemento imagem
		balao.src='imagens/balao_azul_pequeno.png'; // origem da imagem
		balao.style.margin = '10px';
		balao.id = 'b' + i;
		balao.onclick = function(){ estourar(this); };

		document.getElementById('cenario').appendChild(balao);

	}
}

function estourar(e){

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick","")
	document.getElementById(id_balao).src ='imagens/balao_azul_pequeno_estourado.png';

	pontuacao(-1);

}

function pontuacao(acao){

		var balaos_estourados = document.getElementById('balaos_estourados').innerHTML;
		var balaos_inteiros = document.getElementById('balaos_inteiros').innerHTML;

		balaos_inteiros = parseInt(balaos_inteiros);
		balaos_estourados = parseInt(balaos_estourados);

		balaos_inteiros = balaos_inteiros + acao;
		balaos_estourados = balaos_estourados - acao;

		document.getElementById('balaos_inteiros').innerHTML = balaos_inteiros;
	    document.getElementById('balaos_estourados').innerHTML = balaos_estourados;

	    situacao_jogo(balaos_inteiros);

	}

function situacao_jogo(balaos_inteiros){

	if (balaos_inteiros == 0){

		alert('Parabens, voce consegui estourar os baloes a tempo');
		parar_jogo();
	}
}


function parar_jogo(){

	clearTimeout(timerId);
}

