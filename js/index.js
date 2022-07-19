let lastSearch = '';
let search = '';
let isSearching = false;
let fullLoad = false;

function loadIndex() {
	const params = new URLSearchParams(window.location.search);
	search = params.get('search') == undefined ? '' : params.get('search').toLowerCase().trim();

	if (search != '') {
		lastSearch = search;
		loadPokemonBySearch(search);
	} else {
		loadAllPokemon();
	}
}

function loadAllPokemon() {
	fullLoad = false;
	document.querySelector('#list').innerHTML = '';
	axios
		.get('https://pokeapi.co/api/v2/pokemon/?limit=898')
		.then((response) => {
			const allPokemon = response.data.results;
			const names = [];

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
	fullLoad = false;
	document.querySelector('#list').innerHTML = '';
	axios
		.get('https://pokeapi.co/api/v2/pokemon/?limit=898')
		.then((response) => {
			const allPokemon = response.data.results;
			const names = [];

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

function getPokemonByNames(names) {
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
				if (names.length > 0 && !isSearching) getPokemonByNames(names);
				else if (isSearching) {
					isSearching = false;
					loadPokemonBySearch(search);
				} else {
					fullLoad = true;
				}
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
				<img src="${spriteFront}" alt="image of ${pokemon.name}"/>
			</div>
			<div class="list__pokemon-info">
				<p class="list__pokemon-id">#${pokemon.id.toString().padStart(3, 0)}</p>
				<span class="list__pokemon-name"><p>${pokemon.name.replace(/-/g, ' ')}</p></span>
			</div>
		</a>`;
	document.querySelector('#list').appendChild(card);
}

function buttonSearch() {
	document.querySelector('#searchForm').addEventListener('submit', (event) => event.preventDefault());
	search = document.querySelector('#search').value.toLowerCase().trim();
	if (search == '' && lastSearch != '') {
		lastSearch = search;
		loadAllPokemon();
	} else if (lastSearch != search) {
		isSearching = true;
		lastSearch = search;
		if (fullLoad) loadPokemonBySearch(search);
	}
}
