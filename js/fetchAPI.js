export async function fetchPeople() {
    const res = await fetch('https://swapi.dev/api/people/1/');
    console.log(res)
    const data = res.json();
    return data;
}