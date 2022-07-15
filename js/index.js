let lastSearch = '';
let names = [];

function loadIndex() {
	const params = new URLSearchParams(window.location.search);
	const search = params.get('search');

	if (search != undefined) {
		lastSearch = search;
		document.querySelector('#search').value = search;
		loadPokemonBySearch(search);
	} else {
		loadAllPokemon();
	}
}

function loadAllPokemon() {
	document.querySelector('#list').innerHTML = '';
	axios
		.get('https://pokeapi.co/api/v2/pokemon/?limit=898')
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
		.get('https://pokeapi.co/api/v2/pokemon/?limit=898')
		.then((response) => {
			const allPokemon = response.data.results;

			for (const pokemon of allPokemon) {
				let name = pokemon.name.replace(/-/g, ' ').toLowerCase();
				if (name.includes(search.toLowerCase())) names.push(pokemon.name);
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
				<span class="list__pokemon-name"><p>${pokemon.name.replace(/-/g, ' ')}</p></span>
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
	document.querySelector('#searchForm').addEventListener('submit', (event) => event.preventDefault());
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
