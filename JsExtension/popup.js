
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
    // console.log('readdddyyyy')
    // let wrongDaysBtn = document.getElementById("wrong_days_btn");

    // wrongDaysBtn.addEventListener('click', (event) => {
    //     id = 'wrongDays';
    //     setLoader(true);
    //     sendMessageToContent({action: id});
    // });

    // let file_input = document.getElementById('file_input');
    // file_input.addEventListener('change', (event) => {
    //     // id = 'getFileContent';
    //     id = 'getFileText';
    //     sendMessageToContent({action: id, file: event.target.files[0]});
    //     // // var fr=new FileReader();
    //     // var fr=newText();
    //     // fr.onload=function(){
    //     //     const file_stats = document.getElementById('file-stats');
    //     //     file_stats.innerHTML = `The file contains ${fr.result.split('\r\n').length} days`
    //     //     sendMessageToContent({action: id, file: fr.result});
    //     // }
    //     // fr.readAsText(event.target.files[0]);
    //     // const file_name = document.getElementById('file-name');
    //     // file_name.innerHTML = event.target.files[0].name;
    // });

    // let fill_hours_btn = document.getElementById('fill_hours_btn');
    // fill_hours_btn.addEventListener('click', (event) => {
    //     id = 'fill';
    //     // setLoader(true);
    //     showClickPageMessage();
    //     sendMessageToContent({action: id});
    // });

    // let all_btn = document.getElementById('all_btn');
    // all_btn.addEventListener('click', (event) => {
    //     id = 'all';
    //     // setLoader(true);
    //     showClickPageMessage();
    //     sendMessageToContent({action: id});
    // });

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