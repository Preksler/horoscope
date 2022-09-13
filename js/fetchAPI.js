export async function fetchPeople() {
    const res = await fetch('https://swapi.dev/api/people/1/');
    const data = res.json();
    return data;
}