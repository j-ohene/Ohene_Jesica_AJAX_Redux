(() => {
    const characterBox = document.querySelector("#character-box");
    const filmTemplate = document.querySelector("#film-template");
    const filmCon = document.querySelector("#film-con");
    const baseUrl= `https://swapi.dev/api/`;
    
    function getPeople() {
        fetch(`${baseUrl}people/`)
        .then(response => response.json())
        .then(function(response){
            const characters = response.results;
            const ul = document.createElement('ul');
            characters.forEach(character=>{
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = character['name'];
                // Store character's URL as a data attribute
                a.dataset.url = character['url'];
                li.appendChild(a);
                ul.appendChild(li);
            });
            characterBox.appendChild(ul);
        })
        .then(function(){
            // Listen for clicks on character links
            const links = document.querySelectorAll('#character-box li a');
            links.forEach(link=> {
                link.addEventListener("click", getTitle);
            });
        })
        .catch(error=> {
            console.log(error);
        });
    }
    
    function getTitle(event){
        const characterUrl = event.target.dataset.url;
        
        fetch(characterUrl)
        .then(response => response.json())
        .then(function(characterData) {
            const filmUrls = characterData.films;
            // Clear previous film data
            filmCon.innerHTML = "";
            // Fetch details of each film the character appeared in
            filmUrls.forEach(filmUrl => {
                fetch(filmUrl)
                .then(response => response.json())
                .then(function(filmData) {
                    const template = document.importNode(filmTemplate.content, true);
                    const filmBody = template.querySelector(".film-description");
                    const filmTitle = template.querySelector(".film-heading");
                    filmTitle.textContent = filmData.title;
                    filmBody.textContent = filmData.opening_crawl;
                    filmCon.appendChild(template);
                    const moviePic = document.createElement("img");
                    // Set the source of the image
                    moviePic.src = `img/${filmData.episode_id}.jpg`;
                    // Add alt text
                    moviePic.alt = filmData.title;
                    // Append the image to the film template
                    template.appendChild(moviePic);

                    // Create an image element for the movie poster
                    filmTitle.addEventListener("click", function () {
                        // Create a container for the movie picture
                        const moviePictureContainer = document.createElement("div");
                        moviePictureContainer.querySelector(".movie-picture-container");

                        // Create the movie picture element
                        const moviePicture = document.createElement("img");
                        moviePicture.src = `img/${filmData.episode_id}.jpg`;
                        moviePicture.alt = filmData.title;

                        // Append the movie picture to the container
                        moviePictureContainer.appendChild(moviePicture);

                        // Clear previous movie picture (if any) and display the new one
                        filmCon.innerHTML = "";
                        filmCon.appendChild(moviePictureContainer);


                })
            })
                .catch(error => {
                    console.error('Error fetching film data:', error);
                });


            });
        })
        .catch(error => {
            console.error('Error fetching character data:', error);
        });
    }        

    getPeople();
})();

