var genreButtons = document.getElementsByClassName('genre-btn');

        for (var i = 0; i < genreButtons.length; i++) {
            genreButtons[i].addEventListener('click', function() {
                var genre = this.getAttribute('data-genre');
                var apiKey = 'ad326655'; // Substitua pela sua chave de API OMDB

                fetch('http://www.omdbapi.com/?apikey=' + apiKey + '&type=movie&s=' + genre)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        // Filtra filmes por gênero
                        if (data.Response === 'False') {
                            var recommendation = document.getElementById('recommendation');
                            recommendation.innerHTML = 'Nenhum filme encontrado para o gênero selecionado.';
                        } else {
                            var movies = data.Search;
                            var randomIndex = Math.floor(Math.random() * movies.length);
                            var randomMovie = movies[randomIndex];
                            var recommendation = document.getElementById('recommendation');
                            recommendation.innerHTML = 'Recomendação: ' + randomMovie.Title;
                        }
                    })
                    .catch(function(error) {
                        console.log('Erro na chamada da API:', error);
                    });
            });
        }