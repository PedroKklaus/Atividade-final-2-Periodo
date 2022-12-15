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
    let jogosarmazenados = document.getElementById("jogos");
    let jogos_favoritos = localStorage.getItem("favorite_games") ? JSON.parse(localStorage.getItem("favorite_games")) : []
    let intervalo = 10

    if (jogos_favoritos.length > 0){
        let data_lista_jogos_favoritos = listJogos.filter(jogo => jogos_favoritos.includes(String(jogo.id)))
        let jogos_selecionados = data_lista_jogos_favoritos.slice(resultados, (resultados + intervalo));
        jogos_selecionados.map((val) => {
        jogosarmazenados.innerHTML += `
        <div class = "jogosimp">
            <img id = "imagemjogos" src = `+val.thumbnail+`>
    
            <h2 id ="titulojogos">
                <a style="text-decoration:none;color: #FFF;" target="_blank" href=`+val.freetogame_profile_url+` >`+val.title+`</a> 
            </h2>   
            <span class="mdi mdi-star" id="star-${val.id}" style=";color: yellow" onclick="desfavorite(event, 'star-${val.id}')">Favoritar jogo</span>
    
        </div>
    
        `
        }
        )
    }
    
}

function desfavorite(event, id_star){
    event.preventDefault();
    let id_game = id_star.split("-")[1]
    star = document.getElementById(id_star)
    let color = star.style.color === 'yellow' ? 'white' : 'yellow'
    star.style = `color: ${color}`
    if(localStorage.getItem("favorite_games")){
        let games_favoritos = JSON.parse(localStorage.getItem("favorite_games"))
        if (games_favoritos.includes(id_game)){
          let index = games_favoritos.indexOf(id_game)
          games_favoritos.splice(index, 1)
          localStorage.setItem("favorite_games", JSON.stringify(games_favoritos))
        }else{
          localStorage.setItem("favorite_games", JSON.stringify([...games_favoritos, id_game]))
        }
      }else{
        localStorage.setItem("favorite_games", JSON.stringify([id_game]))
      }
}

chamar_api();
  