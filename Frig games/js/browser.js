const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b3f000323fmsh6ff107931a97b8dp1144e4jsnca58569a710c',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
  
};

  
  async function chamar_api(){

    let resultados = document.getElementById("jogos").children.length
    await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&sort-by=release-date', options)
      .then(response => response.json())
      .then(response => {
        imprimirjogos(response, resultados)
      })
      .catch(err => console.error(err));
  
    }
    function imprimirjogos(listJogos, resultados){
      let jogosarmazenados = document.getElementById("jogos"); //jogosarmazenados recebem a id jogos
      let intervalo = 10 //intervalo recebe 10
      let jogos_selecionados = listJogos.slice(resultados, (resultados + intervalo)); //jogos selecionados recebe a lista de jogos e copia os resultados + intervalo
      let jogos_favoritos = localStorage.getItem("favorite_games") ? JSON.parse(localStorage.getItem("favorite_games")) : [] 
      //jogos favoritos recebe o local do favoritegames se json.parse analisar a string e o local que recebe favoritegames
      
      jogos_selecionados.map((val) => { //jogos selecionados cria uma array para val que define o atributos dos elementos a seguir
        jogosarmazenados.innerHTML += `
        <div class = "jogosimp">
            <img id = "imagemjogos" src = `+val.thumbnail+`>
    
            <h2 id ="titulojogos">
            <a style="text-decoration:none;color: #FFF;" target="_blank" href=`+val.freetogame_profile_url+` >`+val.title+`</a> 
              </h2>   
              <span  class="mdi mdi-star" id="star-${val.id}" style=";color: ${jogos_favoritos.includes(String(val.id)) ? 'yellow' : 'white'}" onclick="favorite(event, 'star-${val.id}')">Favoritar jogo</span>
    
              </div>
          
              `
        }
      )
    }
              
    function favorite(event, id_star){  //função de favoritar
        event.preventDefault();  //previne ação padrão
        let id_game = id_star.split("-")[1]   //id game recebe a id do icone da estrela e retorna o novo array na posição 1
        let star = document.getElementById(id_star) //star recebe a id de star
        let color = star.style.color === 'yellow' ? 'white' : 'yellow' //mudar a cor da estrela para amarelo se estiver branco e branco se estiver amarelo
        star.style = `color: ${color}` //recebe a cor 
        if(localStorage.getItem("favorite_games")){ //se local receber os jogos favoritados
          let games_favoritos = JSON.parse(localStorage.getItem("favorite_games")) // gamesfavoritos recebe // json.parse analisa a string e o local que recebe favoritegames
          if (games_favoritos.includes(id_game)){ // se gamesfavoritos incluir a id do game
            let index = games_favoritos.indexOf(id_game) //index recebe gamesfavoritos e retorna a primeira posição
            games_favoritos.splice(index, 1) //games favoritos altera a index na primeira posição
            localStorage.setItem("favorite_games", JSON.stringify(games_favoritos))
          }else{
            localStorage.setItem("favorite_games", JSON.stringify([...games_favoritos, id_game])) // se não local define o valor de favoritegames e converte um valor javascrypt em uma string JSON (games_favoritos, id_game) 
          }
        }else{ 
          localStorage.setItem("favorite_games", JSON.stringify([id_game]))//se não local define favorite e converte o valor javascrypt em uma string JSON ( id_game)
        }
    }
              
    chamar_api();
                