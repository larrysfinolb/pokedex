let lastSearch = '';
let names = [];

function loadAllPokemon() {
	document.querySelector('#list').innerHTML = '';
	axios
		.get('https://pokeapi.co/api/v2/pokemon/?limit=905')
		.then((response) => {
			const allPokemon = response.data.results;

			for (const pokemon of allPokemon) {
				names.push(pokemon.name);
			}

			getPokemonByNames(names);
		})
		.catch((error) => {
			console.log(`Error in promise: ${error}`);
		});
}

function loadPokemonBySearch(search) {
	document.querySelector('#list').innerHTML = '';
	axios
		.get('https://pokeapi.co/api/v2/pokemon/?limit=905')
		.then((response) => {
			const allPokemon = response.data.results;

			for (const pokemon of allPokemon) {
				let name = pokemon.name.replace(/-/g, ' ');
				if (name.includes(search)) names.push(pokemon.name);
			}

			getPokemonByNames(names);
		})
		.catch((error) => {
			console.log(`Error in promise: ${error}`);
		});
}

function getPokemonByNames() {
	if (names.length > 0) {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${names[0]}`)
			.then((response) => {
				let pokemon = response.data;
				createCard(pokemon);
			})
			.catch((error) => {
				console.log(`Error in promise: ${error}`);
			})
			.finally(() => {
				names.shift();
				if (names.length > 0) getPokemonByNames(names);
			});
	}
}

function createCard(pokemon) {
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

	for (const name of names) {
		if (name == pokemon.name) {
			document.querySelector('#list').appendChild(card);
			break;
		}
	}
}

function buttonSearch() {
	const search = document.querySelector('#search').value;
	if (search == '' && lastSearch != '') {
		names = [];
		lastSearch = search;
		loadAllPokemon();
	} else if (lastSearch != search) {
		names = [];
		lastSearch = search;
		loadPokemonBySearch(search);
	}
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
