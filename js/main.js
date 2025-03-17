const API_URL = "https://api.tvmaze.com/shows";
const SEARCH_API = "https://api.tvmaze.com/search/shows?q=";

// Mostrar listado inicial al cargar la página
window.addEventListener("DOMContentLoaded", async () => {
    await showDefaultShows();
});

document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("searchInput").value.trim();
    if (query) showResults(query);
});

const showDefaultShows = async () => {
    const series = await fetchDefaultShows();
    renderShows(series);
};

const showResults = async (query) => {
    const series = await fetchSeries(query);
    renderShows(series);
};

const renderShows = (series) => {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = series.slice(0, 40).map(show => {
        if (!show.image) return "";
        return `
            <div class="card" onclick="showDetails(${show.id})">
                <img src="${show.image.medium}" alt="${show.name}">
                <h3>${show.name}</h3>
                <p>${show.summary || 'Sin descripción'}</p>
            </div>
        `;
    }).join("");
};

const fetchSeries = async (query) => {
    try {
        const response = await axios.get(`${SEARCH_API}${query}`);
        return response.data.map(item => item.show);
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return [];
    }
};

const fetchDefaultShows = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener datos por defecto:", error);
        return [];
    }
};

const showDetails = (id) => {
    console.log('cambio');
    
    window.location.href = `detalles.html?id=${id}`;
};
window.showDetails = showDetails;