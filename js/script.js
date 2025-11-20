document.addEventListener('DOMContentLoaded', () => {
    const botonBuscar = document.getElementById('btnBuscar');
    const resultadoBusqueda = document.getElementById('lista');
    const inputBuscar = document.getElementById('inputBuscar');
    let peliculas = [];

    // Cargar películas
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            peliculas = data;
        })
        .catch(error => {
            console.error('Ocurrió un error:', error);
        });

    // CLICK EN BUSCAR
    botonBuscar.addEventListener('click', () => {

        let textoBusqueda = inputBuscar.value.toLowerCase().trim();
        if (textoBusqueda.length === 0) {
            alert('Por favor ingrese un término de búsqueda');
            return;
        }

        // Filtrar películas
        let peliculasFiltradas = peliculas.filter(pelicula => {
            return (
                pelicula.title.toLowerCase().includes(textoBusqueda) ||
                pelicula.overview.toLowerCase().includes(textoBusqueda) ||
                pelicula.genres.join(",").toLowerCase().includes(textoBusqueda) ||
                pelicula.tagline.toLowerCase().includes(textoBusqueda)
            );
        });

        resultadoBusqueda.innerHTML = '';

        // Mostrar resultados
        peliculasFiltradas.forEach(pelicula => {

            const li = document.createElement('li');
            li.classList.add('text-light', 'mb-2');

            // Estrellas
            let estrellas = Math.round(pelicula.vote_average / 2);
            let estrellasTexto = '';
            for (let i = 1; i <= 5; i++) {
                estrellasTexto += (i <= estrellas ? '⭐' : '☆');
            }

            li.innerHTML = `${pelicula.title} <br> ${estrellasTexto}`;
            resultadoBusqueda.appendChild(li);

            // CLICK EN UNA PELÍCULA
            li.addEventListener('click', () => {

                // Datos extra
                const year = pelicula.release_date
                    ? pelicula.release_date.substring(0, 4)
                    : "N/A";

                const runtime = pelicula.runtime ?? "N/A";
                const budget = pelicula.budget
                    ? pelicula.budget.toLocaleString()
                    : "N/A";

                const revenue = pelicula.revenue
                    ? pelicula.revenue.toLocaleString()
                    : "N/A";

                // Mostrar detalle
                const detallePelicula = document.getElementById("detallePelicula");
                detallePelicula.style.display = "block";

                detallePelicula.innerHTML = `
                    <h2>${pelicula.title}</h2>

                    <p><strong>Descripción:</strong> ${pelicula.overview}</p>
                    <p><strong>Géneros:</strong> ${pelicula.genres.map(g => g.name).join(", ")}</p>

                    <div class="dropdown my-3">
                        <button 
                            class="btn btn-secondary dropdown-toggle" 
                            type="button" 
                            data-bs-toggle="dropdown">
                            Más información
                        </button>

                        <ul class="dropdown-menu p-3">
                            <li><strong>Año de lanzamiento:</strong> ${year}</li>
                            <li><strong>Duración:</strong> ${runtime} min</li>
                            <li><strong>Presupuesto:</strong> $${budget}</li>
                            <li><strong>Ganancias:</strong> $${revenue}</li>
                        </ul>
                    </div>
                `;
            });
        });
    });

});


//todo lo que se decalra fuera del documet.addEventListenerContentLoaded no va a funcionar porque 
// el DOM no está listo aún y las variables que se declaran fuera de este alcance no se pueden usar dentro de este

// 3. Escuchar el click en el botón buscar


// 4. Tomar el valor del input
// 5. Filtrar las películas según ese valor
// 6. Mostrar las coincidencias en el elemento lista