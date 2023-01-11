const generateExplanation = async (prompt) => {
    const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${prompt}`;
    console.log("myurl is: ", url);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '348b2319b4msha3e84a1fb857c90p18ed89jsnb9b780258e2e',
            'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);

    console.log("MYresponseis : ", response);

    const responseJson = await response.json();
    const elements = document.getElementsByClassName('droid');

    if (elements.length === 0) {
        return;
    }

    const element = elements[0];

    for (let i=0; i < responseJson.list.length; i++) {

        const definition = responseJson.list[i]["definition"];
        const p1 = document.createElement('p');
        p1.textContent = `${(i + 1).toString()})\nDefinition: ${definition}`;
        element.appendChild(p1);

        const br1 = document.createElement('br');
        element.appendChild(br1);

        const example = responseJson.list[i]["example"];
        const p2 = document.createElement('p');
        p2.textContent = "Example: " + example;
        element.appendChild(p2);
    }
} 

const generateExplanationAction = async () => {
    try {
        const textToExplain = document.getElementById('input_container').value;

        const response = await generateExplanation(`${textToExplain}`);
        console.log(response);

    } catch (error) {
        console.log(error)
    }
}

document.getElementById('explain_button').addEventListener('click', generateExplanationAction);