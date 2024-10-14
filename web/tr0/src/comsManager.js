export async function getPreguntes() {
    const response = await fetch('http://localhost:3000/preguntes');
    const preguntes = await response.json();
    return preguntes;
};

export async function postPregunta(novaPregunta) {
    const response = await fetch('http://localhost:3000/preguntes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaPregunta),
    });
    const dades = await response.json();
    console.log(dades);
    novaPregunta.id = dades.id;
};

export async function putPregunta(idPregunta, pregunta) {
    const response = await fetch(`http://localhost:3000/preguntes/${idPregunta}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pregunta),
    });
    const dades = await response.json();
    console.log(dades);
};

export async function deletePregunta(idPregunta) {
    const response = await fetch(`http://localhost:3000/preguntes/${idPregunta}`, {
        method: 'DELETE'
    });
    const dades = await response.status;
    console.log(dades);
};

export async function missatgePython() {
    const response = await fetch('http://localhost:3000/python');
    const dades = await response.text();
    return dades;
};
