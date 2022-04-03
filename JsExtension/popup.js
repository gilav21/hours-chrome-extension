
function sendMessageToContent(data) { 
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, data, function (response) {
            if (response && response.action === 'filled') {
                console.log('filled...')
                setLoader(false);
                setCheckMark();
            } else if (response && response.action === 'days') {
                console.log('days...')
                setLoader(false);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    let inputLabel = document.getElementById('input-label');
    inputLabel.addEventListener('click', (event) => {
        id = 'getFileText';
        sendMessageToContent({action: id});
    });

})

function setLoader(isLoading) {
    if (isLoading) { 
        document.getElementById('loader').style.display = 'block';
        document.getElementById('content-wrapper').style.display = 'none';
    } else {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content-wrapper').style.display = 'flex';
    }
}

function setCheckMark() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content-wrapper').style.display = 'none';
    document.getElementById('check').style.display = 'inline-block';
}

function showClickPageMessage() {
    document.getElementById('content-wrapper').style.display = 'none';
    document.getElementById('click-page').style.display = 'block';
}