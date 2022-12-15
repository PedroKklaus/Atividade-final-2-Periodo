const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b3f000323fmsh6ff107931a97b8dp1144e4jsnca58569a710c',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
  
};

async function chamar_api(){

    let resultados = document.getElementById("jogos").children.length                   
    await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
      .then(response => response.json())
      .then(response => {
        imprimirjogos(response, resultados)
      })
      .catch(err => console.error(err));
  
    }
function imprimirjogos(listJogos, resultados){
  let jogosarmazenados = document.getElementById("jogos"); //jogosarmazenados recebem o elemento html da lista
  let intervalo = 10 //intervalo recebe 10
  let jogos_selecionados = listJogos.slice(resultados, (resultados + intervalo)); //jogos selecionados recebe a lista de jogos e pega o intervalo de elementos
  let jogos_favoritos = localStorage.getItem("favorite_games") ? JSON.parse(localStorage.getItem("favorite_games")) : [] 
  //Verifica se existe uma lista se não existir retorna uma lista vazia 
  
  jogos_selecionados.map((val) => { //jogos selecionados cria uma array para val que define o atributos dos elementos a seguir
    jogosarmazenados.innerHTML += `
    <div class = "jogosimp">
        <img id = "imagemjogos" src = `+val.thumbnail+`>

        <h2 id ="titulojogos">
        <a style="text-decoration:none;color: #FFF;" target="_blank" href=`+val.freetogame_profile_url+` >`+val.title+`</a> 
          </h2>   
          <span  class="mdi mdi-star" id="star-${val.id}" style="color: ${jogos_favoritos.includes(String(val.id)) ? 'yellow' : 'white'}" onclick="favorite(event, 'star-${val.id}')" > Favoritar jogo</span>                                                        
          </div>
          `
    }
  )
}
          
function favorite(event, id_star){  //função de favoritar
    event.preventDefault();  //previne o comportamento padrão do navegador(DE dar reload na pagina)
    let id_game = id_star.split("-")[1]   //id game recebe a id do icone da estrela e retorna direto o id na posição 1
    let star = document.getElementById(id_star) //utiliza o id da linha acima para selecionar o elemento da estrela
    let color = star.style.color === 'yellow' ? 'white' : 'yellow' //mudar a cor da estrela para amarelo se estiver branco e branco se estiver amarelo
    star.style = `color: ${color}` //recebe a cor 
    if(localStorage.getItem("favorite_games")){ //verifica se existe esse base de dados
      let games_favoritos = JSON.parse(localStorage.getItem("favorite_games")) // pega a lista de jogos no localstorage
      if (games_favoritos.includes(id_game)){ // se gamesfavoritos incluir a id do game
        let index = games_favoritos.indexOf(id_game) //Recebe a posição do game na lista dos favoritos
        games_favoritos.splice(index, 1) //Verifica se o game ja está na lista e se tiver ele remove
        localStorage.setItem("favorite_games", JSON.stringify(games_favoritos))//substitui por uma nova lista caso o jogo ja exista na lista
       }else{
        localStorage.setItem("favorite_games", JSON.stringify([...games_favoritos, id_game])) //Adiciona o game na lista de favoritos
      }
    }else{ 
      localStorage.setItem("favorite_games", JSON.stringify([id_game]))//se não exite favorito ele cria ela
    }
}
          
chamar_api();
            