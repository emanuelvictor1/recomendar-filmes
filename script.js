document.querySelectorAll('.genre-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        var genre = button.dataset.genre;
        var apiKey = '9ab9d776d8903ddf953c0e9418391e8f'; // Substitua pela sua chave de API do TMDb

        fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&sort_by=popularity.desc&with_genres=' + genre)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var movies = data.results;

                if (movies.length > 0) {
                    var recommendation = document.getElementById('recommendation');
                    recommendation.innerHTML = '';

                    for (var i = 0; i < 2; i++) {
                        var randomIndex = Math.floor(Math.random() * movies.length);
                        var randomMovie = movies[randomIndex];

                        var movieContainer = document.createElement('div');
                        movieContainer.classList.add('movie-container');

                        var moviePoster = document.createElement('img');
                        moviePoster.classList.add('movie-poster');
                        moviePoster.src = 'https://image.tmdb.org/t/p/w200' + randomMovie.poster_path;
                        movieContainer.appendChild(moviePoster);

                        var movieDetails = document.createElement('div');
                        movieDetails.classList.add('movie-details');

                        var movieTitle = document.createElement('h3');
                        movieTitle.innerHTML = `Titulo do filme:  ${randomMovie.title}`;
                        movieDetails.appendChild(movieTitle);

                        var movieOverview = document.createElement('p');
                        movieOverview.innerHTML = `<strong>Descrição:</strong> <br>${randomMovie.overview}`;
                        movieDetails.appendChild(movieOverview);

                        // Obter informações sobre as plataformas de streaming
                        fetch('https://api.themoviedb.org/3/movie/' + randomMovie.id + '/watch/providers?api_key=' + apiKey)
                            .then(function(response) {
                                return response.json();
                            })
                            .then(function(data) {
                                var providers = data.results.BR;

                                if (providers && providers.flatrate && providers.flatrate.length > 0) {
                                    var streamingPlatforms = document.createElement('div');
                                    streamingPlatforms.classList.add('streaming-platforms');

                                    providers.flatrate.forEach(function(platform) {
                                        var platformContainer = document.createElement('div');
                                        platformContainer.classList.add('platform-container');

                                        var h3 = document.createElement('h3')
                                        var platformIcon = document.createElement('i');
                                        platformIcon.classList.add('streaming-icon');
                                        platformIcon.classList.add('fas');
                                        platformIcon.classList.add(getStreamingIcon(h3.innerText=`${platform.provider_name}`));
                                        platformContainer.appendChild(platformIcon);

                                        var platformName = document.createElement('span');
                                        platformName.innerText = platform.provider_name;
                                        platformContainer.appendChild(platformName);

                                        streamingPlatforms.appendChild(platformContainer);
                                    });

                                    movieDetails.appendChild(streamingPlatforms);
                                }
                            })
                            .catch(function(error) {
                                console.log('Erro na chamada da API de detalhes do filme:', error);
                            });

                        movieContainer.appendChild(movieDetails);

                        recommendation.appendChild(movieContainer);
                    }
                } else {
                    var recommendation = document.getElementById('recommendation');
                    recommendation.innerHTML = 'Nenhum filme encontrado para o gênero selecionado.';
                }
            })
            .catch(function(error) {
                console.log('Erro na chamada da API de filmes:', error);
            });
    });
});

function getStreamingIcon(providerName) {
    // Mapear o nome do provedor para o ícone FontAwesome correspondente
    switch (providerName.toLowerCase()) {
        case 'undefined':
            return 'fa-netflix';
        default:
            return 'fa-play';
    }
}