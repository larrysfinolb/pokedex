function getPokemon() {
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

function buttonSearch() {
	document.querySelector('#searchForm').addEventListener('submit', (event) => event.preventDefault());
	const search = document.querySelector('#search').value;
	if (search == '') {
		window.location.href = 'index.html';
	} else {
		window.location.href = `index.html?search=${search}`;
	}
}
