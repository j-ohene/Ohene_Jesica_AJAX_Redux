(() => {
    const characterBox = document.querySelector("#character-box");
    const filmTemplate = document.querySelector("#film-template");
    const filmCon = document.querySelector("#film-con");
    const baseUrl= `https://swapi.dev/api/`;
    
    function getPeople() {
        fetch(`${baseUrl}people/`)
        .then(response =>response.json())
        .then(function(response){
            //console.log(response.description);
            const characters = response.results;
            const ul = document.createElement('ul');
            characters.forEach(character=>{
              // console.log(character['name']);
               //console.log(character['height']);
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = character['name'];
                a.dataset.review = character['url']
                li.appendChild(a);
                ul.appendChild(li);
    
            });
            characterBox.appendChild(ul);
        })
        .then(function(){
            const links = document.querySelectorAll('#character-box li a');
            links.forEach(link=> {
                link.addEventListener("click", getTitle);
            })
        })
        .catch(error=> {
            console.log(error);
            //ideallly we would write to the DOM and let user know, something is wrong
        });
    
    }
    function getTitle(){
       // console.log("getReview called");
       //console.log(e.currentTarget.dataset.review)
       //console.log(this.dataset);
       fetch(`${baseUrl}films/?format=json`)
       //https://swapi.dev/api/films/2/?format=json
       .then(response => response.json())
       .then(function(response) {
        filmCon.innerHTML = "";
        const movies = response.results;
        movies.forEach(movie=>{
       //console.log(movie['filmTitle']);
         const template = document.importNode(filmTemplate.content, true);
         const filmBody = template.querySelector(".film-description");
         const filmTitle = template.querySelector(".film-heading");
         filmTitle.innerHTML = movie['title'];
         filmBody.innerHTML = movie ['opening_crawl'];

         filmCon.appendChild(template);
        });
        
    })

       .catch();
    }
    getPeople();
    })();