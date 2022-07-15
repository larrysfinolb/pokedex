function getPokemon() {
	const params = new URLSearchParams(window.location.search);
	const name = params.get('name');

	axios
		.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
		.then((response) => {
			let pokemon = response.data;

			let spriteFront = pokemon.sprites['front_default'] == null ? '' : pokemon.sprites['front_default'];
			let spriteBack = pokemon.sprites['back_default'] == null ? '' : pokemon.sprites['back_default'];
			let spriteShinyFront = pokemon.sprites['front_shiny'] == null ? '' : pokemon.sprites['front_shiny'];
			let spriteShinyBack = pokemon.sprites['back_shiny'] == null ? '' : pokemon.sprites['back_shiny'];

			let typesHTML = '';
			for (const key in pokemon.types) {
				const type = pokemon.types[key].type.name;
				typesHTML += `<span class="pokemon__type pokemon__type--${type}">${type}</span>`;
			}

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
					<img src="${spriteFront}" />
					<img src="${spriteBack}" />
					<img src="${spriteShinyFront}" />
					<img src="${spriteShinyBack}" />
				</div>
				<div class="pokemon__types">${typesHTML}</div>
				<div class="pokemon__details">
					<div>
						<h2 class="pokemon__title">Specie</h2>
						<ul class="pokemon__grid">
							<li>Height: ${pokemon.height / 10}m</li>
							<li>Weight: ${pokemon.weight / 10}kg</li>
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
		.catch((error) => {
			console.log(`Error in promise: ${error}`);
		});
}

function buttonSearch() {
	document.querySelector('#searchForm').addEventListener('submit', (event) => event.preventDefault());
	const search = document.querySelector('#search').value;
	if (search == '') {
		window.location.href = 'index.html';
	} else {
		window.location.href = `index.html?search=${search}`;
	}
}
