const insert = (content) => {
    const elements = document.getElementsByClassName('droid');

    if (elements.length === 0) {
        return;
    }

    const element = elements[0];

    for (let i=0; i < content.list.length; i++) {

        const definition = content.list[i]["definition"];
        const p1 = document.createElement('p');
        p1.textContent = `${(i + 1).toString()})\n ${definition}`;
        element.appendChild(p1);

        const br1 = document.createElement('br');
        element.appendChild(br1);

        const example = content.list[i]["example"];
        const p2 = document.createElement('p');
        p2.textContent = example;
        element.appendChild(p2);

    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'inject') {
        const { content } = request;
        const result = insert(content);
    
        if (!result) {
            sendResponse({status: 'failed'});
        }

        sendResponse({ status: 'success' });
    }
});