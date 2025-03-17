const urlParams = new URLSearchParams(window.location.search);
const showId = urlParams.get("id");
const SHOW_API = `https://api.tvmaze.com/shows/${showId}`;

window.addEventListener("DOMContentLoaded", async () => {
    const show = await fetchShowDetails();
    renderShowDetails(show);
});

const fetchShowDetails = async () => {
    try {
        const response = await axios.get(SHOW_API);
        return response.data;
    } catch (error) {
        console.error("Error al obtener detalles de la serie:", error);
    }
};

const renderShowDetails = (show) => {
    document.getElementById("showDetails").innerHTML = `
        <h1>${show.name}</h1>
        <img src="${show.image?.medium || ''}" alt="${show.name}">
        <p>${show.summary || 'Sin descripción disponible.'}</p>
        <a href="index.html" class="back-link">⬅ Volver al inicio</a>
    `;
};