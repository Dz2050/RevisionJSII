import { TIMEOUT_SEC } from "./config";

export const handleFetch = async (fetchPromise) => {
    const resp = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);

    if (!resp.ok) {
    throw new Error(
        `Error en la petición: ${resp.status} - ${resp.statusText}`
    );
}

const data = await resp.json();
return data;
};

export const getJSON = async (url) => {
    try {
    const fetchPro = fetch(url);
    const data = await handleFetch(fetchPro);
    return data;
} catch (error) {
    console.error(`${error} 💥💥💥💥`);
    throw error;
}
};

const timeout = (seconds) => {
    return new Promise((_, reject) => {
    setTimeout(() => {
    reject(new Error(`La petición ha tardado más de ${seconds} segundos.`));
    }, seconds * 1000);
});
};