export async function getPreguntes() {
    const response = await fetch('http://localhost:3000/preguntes');
    const preguntes = await response.json();
    return preguntes;
};