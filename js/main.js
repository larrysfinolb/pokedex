// Función para obtener todos los pokemones y cargarlos en el home
// function getAllPokemon() {
// axios
// 	.get('https://pokeapi.co/api/v2/pokemon/')
// 	.then((response) => {
// 		let data = response.data;
// 		console.log(data);
// 		axios
// 			.get(`https://pokeapi.co/api/v2/pokemon/?limit=${20}`)
// 			.then((response) => {
// 				let results = response.data.results;
// 				let allPokemon = '';
// 				for (const result of results) {
// 					axios
// 						.get(result.url)
// 						.then((response) => {
// 							let pokemon = response.data;
// 							allPokemon += `
// 							<li class="list__pokemon">
// 							    <a href="pokemon.html?name=${pokemon.name}">
// 									<div class="list__pokemon-img">
// 										<img src="${pokemon.sprites['front_default']}" />
// 									</div>
// 									<div class="list__pokemon-info">
// 										<p class="list__pokemon-id">#${pokemon.id}</p>
// 							        	<p class="list__pokemon-name">${pokemon.name}</p>
// 							    	</div>
// 								</a>
// 							</li>`;
// 							document.querySelector('#list').innerHTML = allPokemon;
// 						})
// 						.catch((error) => {});
// 				}
// 			})
// 			.catch((error) => {});
// 	})
// 	.catch((error) => {});
// }

function getAllPokemon(id) {
	axios
		.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then((response) => {
			let pokemon = response.data;

			let card = document.createElement('li');
			card.classList.add('list__pokemon');

			let spriteFront = pokemon.sprites['front_default'] == null ? '' : pokemon.sprites['front_default'];

			card.innerHTML = `
				<a href="pokemon.html?name=${pokemon.name}">
					<div class="list__pokemon-img">
						<img src="${spriteFront}" />
					</div>
					<div class="list__pokemon-info">
						<p class="list__pokemon-id">#${pokemon.id.toString().padStart(3, 0)}</p>
						<p class="list__pokemon-name">${pokemon.name.replace(/-/g, ' ')}</p>
					</div>
				</a>`;

			document.querySelector('#list').appendChild(card);
		})
		.catch((error) => {
			console.log(`Error in promise: ${error}`);
		})
		.finally(() => {
			id++;
			if (id <= 905) getAllPokemon(id);
		});
}

// Función para obtener los datos de un pokemon
function getPokemosn() {
	const params = new URLSearchParams(window.location.search);
	const name = params.get('name');

	axios
		.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
		.then((response) => {
			let pokemon = response.data;
			console.log(pokemon);

			let movesHTML = '';
			for (const key in pokemon.moves) {
				movesHTML += `<li>${pokemon.moves[key].move.name.replace(/-/g, ' ')}</li>`;
			}

			document.querySelector('#pokemon').innerHTML = `
				<div class="pokemon__info">
					<p class="pokemon__id">#${pokemon.id}</p>
					<p class="pokemon__name">${pokemon.name}</p>
				</div>
				<div class="pokemon__imgs">
					<img src="${pokemon.sprites['front_default']}" />
					<img src="${pokemon.sprites['back_default']}" />
					<img src="${pokemon.sprites['front_shiny']}" />
					<img src="${pokemon.sprites['back_shiny']}" />
				</div>
				<div class="pokemon__details">
					<div>
						<h2 class="pokemon__title">Specie</h2>
						<ul class="pokemon__grid">
							<li>Height: ${pokemon.height / 10}M</li>
							<li>Weight: ${pokemon.weight / 10}Kg</li>
						</ul>
					</div>
					<div>
						<h2 class="pokemon__title">Stats</h2>
						<ul class="pokemon__grid">
							<li>HP: ${pokemon.stats[0].base_stat}</li>
							<li>Attack: ${pokemon.stats[1].base_stat}</li>
							<li>Defense: ${pokemon.stats[2].base_stat}</li>
							<li>Sp. Attack: ${pokemon.stats[3].base_stat}</li>
							<li>Sp. Defense: ${pokemon.stats[4].base_stat}</li>
							<li>Speed: ${pokemon.stats[5].base_stat}</li>
						</ul>
					</div>
					<div>
						<h2 class="pokemon__title">Moves</h2>
						<ul class="pokemon__list">${movesHTML}</ul>
					</div>
				</%&div>
			`;
		})
		.catch((error) => {});
}
