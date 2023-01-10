const sendMessage = (content) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      
        const activeTab = tabs[0].id;

        chrome.tabs.sendMessage(
            activeTab,
            { message: 'inject', content },
            (response) => {
                if (response.status === 'failed') {
                console.log('injection failed.');
                }
            }
        );
    });
  };

const generate = async (prompt) => {
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
    const responseJson = await response.json();
    return responseJson;
}  

const generateCompletionAction = async (info) => {
    try {
        sendMessage('generating...');

        const { selectionText } = info;

        const baseCompletion = await generate(`${selectionText}`);

        console.log("Base Completion ", baseCompletion);

        sendMessage(baseCompletion);
    } catch (error) {
        console.log(error);
        sendMessage(error.toString());
    }
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'context-run',
        title: 'Explain This acronym',
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener(generateCompletionAction);