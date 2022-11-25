var paginacao = 0;

function getPokemon(paginacao) {
	fetch(`https://pokeapi.co/api/v2/pokemon/?limit=30&offset=${paginacao}`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data.results);
			criarCardPokemon(data.results);
		});
}

async function fetchExam(url) {
	try {
		const response = await fetch(url, {
			method: "GET",
			credentials: "same-origin",
		});
		const exam = await response.json();
		return exam;
	} catch (error) {
		console.error(error);
	}
}
getPokemon(paginacao);

function criarCardPokemon(pokemon) {
	const container = document.querySelector("#pokemons .container-pokemon");
	const containerGrass = document.querySelector("#grass .container-pokemon");
	const containerFire = document.querySelector("#fire .container-pokemon");
	const containerWater = document.querySelector("#water .container-pokemon");
	const containerBug = document.querySelector("#bug .container-pokemon");
	const containerNormal = document.querySelector("#normal .container-pokemon");
	const containerPoison = document.querySelector("#poison .container-pokemon");
	const containerElectric = document.querySelector("#electric .container-pokemon");
	const containerGround = document.querySelector("#ground .container-pokemon");
	const containerFairy = document.querySelector("#fairy .container-pokemon");
	const containerFighting = document.querySelector("#fighting .container-pokemon");
	const containerPsychic = document.querySelector("#psychic .container-pokemon");
	const containerRock = document.querySelector("#rock .container-pokemon");
	const containerGhost = document.querySelector("#ghost .container-pokemon");
	const containerIce = document.querySelector("#ice .container-pokemon");
	const containerDragon = document.querySelector("#dragon .container-pokemon");
	const containerDark = document.querySelector("#dark .container-pokemon");
	const containerSteel = document.querySelector("#steel .container-pokemon");
	const containerFlying = document.querySelector("#flying .container-pokemon");
	const containerUnknown = document.querySelector("#unknown .container-pokemon");
	const containerShadow = document.querySelector("#shadow .container-pokemon");

	// Modifica cada item com url para a Promise retornada de `fetchExam` e então o `Promise.all` cuida de executar e retornar tudo na mesma ordem
	Promise.all(pokemon.map((pokemon) => fetchExam(pokemon.url)))
		/* .then((paginaPokemons) =>
			paginaPokemons.sort(function (a, b) {
				// o Promise all retorna na mesma ordem, mas talvez precise seguir o padrão da propriedade `order`
				return a.order - b.order;
				// console.log(a.pokemon);
			})
		) */
		.then((pokemonsOrdenados) => {
			pokemonsOrdenados.forEach((pokemon) => {
				// console.log(pokemon);

				const nomePokemon = pokemon.name;
				const nomePokemonMaiscula = nomePokemon[0].toUpperCase() + nomePokemon.substr(1);
				var containerPokemon;

				let tipo = pokemon.types[0].type.name;

				if (tipo == "grass") {
					containerPokemon = containerGrass;
				} else if (tipo == "fire") {
					containerPokemon = containerFire;
				} else if (tipo == "water") {
					containerPokemon = containerWater;
				} else if (tipo == "bug") {
					containerPokemon = containerBug;
				} else if (tipo == "normal") {
					containerPokemon = containerNormal;
				} else if (tipo == "poison") {
					containerPokemon = containerPoison;
				} else if (tipo == "electric") {
					containerPokemon = containerElectric;
				} else if (tipo == "ground") {
					containerPokemon = containerGround;
				} else if (tipo == "fairy") {
					containerPokemon = containerFairy;
				} else if (tipo == "fighting") {
					containerPokemon = containerFighting;
				} else if (tipo == "psychic") {
					containerPokemon = containerPsychic;
				} else if (tipo == "rock") {
					containerPokemon = containerRock;
				} else if (tipo == "ghost") {
					containerPokemon = containerGhost;
				} else if (tipo == "ice") {
					containerPokemon = containerIce;
				} else if (tipo == "dragon") {
					containerPokemon = containerDragon;
				} else if (tipo == "dark") {
					containerPokemon = containerDark;
				} else if (tipo == "steel") {
					containerPokemon = containerSteel;
				} else if (tipo == "flying") {
					containerPokemon = containerFlying;
				} else if (tipo == "unknown") {
					containerPokemon = containerUnknown;
				} else if (tipo == "shadow") {
					containerPokemon = containerShadow;
				}

				container.innerHTML += `
  
              <div class="card-container ${tipo} flip-card">
              <div class="flip-card-inner">
                  <div class="flip-card-front ${tipo}">
                      <div class="id">
                          <p>#${pokemon.id}</p>
                      </div>
              
                      <div class="card-body">
                          <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${nomePokemonMaiscula}" title="${nomePokemonMaiscula}">
                          <h2 class="card-title">${nomePokemonMaiscula}</h2>
                      </div>
                  </div>
  
                  <div class="flip-card-back ${tipo}-back">
                      <h2>${nomePokemonMaiscula}</h2>
                  </div>
              </div>
              </div>
  
              `;

				containerPokemon.innerHTML += `
  
              <div class="card-container ${tipo} flip-card">
              <div class="flip-card-inner">
                  <div class="flip-card-front ${tipo}">
                      <div class="id">
                          <p>#${pokemon.id}</p>
                      </div>
              
                      <div class="card-body">
                          <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${nomePokemonMaiscula}" title="${nomePokemonMaiscula}">
                          <h2 class="card-title">${nomePokemonMaiscula}</h2>
                      </div>
                  </div>
  
                  <div class="flip-card-back ${tipo}-back">
                      <h2>${nomePokemonMaiscula}</h2>
                  </div>
              </div>
              </div>
              `;
			});
		})
		.finally(() => {
			// cria o botão ao terminar de executar a renderização inicial
			if (paginacao == 0) {
				let btn = document.createElement("div");
				btn.className = "d-flex";

				btn.innerHTML += `
            <button class="btn btn-primary" id="btn-mais">Carregar mais</button>
        `;

				document.querySelector("#pokemons").appendChild(btn);
			}
		});
}

setTimeout(function () {
	document.querySelector("#btn-mais").addEventListener("click", function () {
		paginacao += 30;
		getPokemon(paginacao);
	});
}, 1000);

function tiposPokemons(evt, cityName) {
	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();
