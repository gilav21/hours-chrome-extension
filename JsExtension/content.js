let fileContent = '';

const prevFocused = document.activeElement;

async function reloadFocus() {
    return new Promise( (resolve, reject) => {
        document.onclick = () => {
            resolve();
        };
    })
}

function readFile(file) {
    let data = file.split('\r\n');
    const entries = data.map(day => {
        const dayEntries = day.split('-');
        return { entry: dayEntries[0], exit: dayEntries[1] };
    });
    let numOfRows = data.length;
    console.log('numOfRows:', numOfRows);
    console.log('entries:', entries);
    fileContent = entries;
    reloadFocus();
}

async function fillHours() {
    await reloadFocus();
    console.log('clicked... start filling...');
    return new Promise( async (resolve, reject) => {
        let entry;
        let exit;
        entries = fileContent;
        for (let i = 0; i < entries.length; i++) {
            project1 = document.querySelector("select[id$='ProjectStep1_EmployeeReports_row_" + i + "_0']");
            project2 = document.querySelector("select[id$='ProjectStep2_EmployeeReports_row_" + i + "_0']");
            
            project3 = document.querySelector("select[id$='ProjectStep3_EmployeeReports_row_" + i + "_0']");
            entry = document.querySelector("input[id$='ManualEntry_EmployeeReports_row_" + i + "_0']");
            exit = document.querySelector("input[id$='ManualExit_EmployeeReports_row_" + i + "_0']");
            
            if (entry && exit) {
                exit.tabIndex = 1;
                project1.selectedIndex = 2;
                project1.dispatchEvent(new Event('change'));
                await new Promise(r => setTimeout(r, 100));
                await waitForSelect(project2);
                project2.selectedIndex = 1;
                project2.dispatchEvent(new Event('change'));
                await waitForSelect(project3);
                await new Promise(r => setTimeout(r, 100));
                project3.selectedIndex = 1;
                project3.dispatchEvent(new Event('change'));
                entry.value = entries[i].entry;
                exit.value = entries[i].exit;
                await new Promise(r => setTimeout(r, 100));
                exit.focus();
                exit.blur();
            }
        }
        console.log('Done');
        resolve();
    });
}

async function waitForSelect(element) {
    return new Promise(async (resolve, reject) => {
        const start = Date.now();
        let counter = 0;
        while (element.disabled || element.children.length === 0) {
            counter ++;
            await new Promise(r => setTimeout(r, 50));
        }
        const duration = Date.now() - start;
        if (counter > 0) {
            console.log(`the selector took ${counter} waits to open`);
        }
        resolve();
    });
}

function chooseWrongDays() {
    const refreshButton = document.querySelector("input[name$='RefreshSelectedDays']");
    const images = document.querySelectorAll("img[src$='error.gif']");
    let imgArr = Array.from(images);
    imgArr = imgArr.filter(image => image.parentElement.parentElement.className === 'dayImageNumberContainer');
    imgArr.forEach(img => {
        img.click();
    });
    refreshButton.click();
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension", request.action);
        switch (request.action) {
            case 'wrongDays':
                console.log('choosing days...');
                chooseWrongDays();
                sendResponse({ action: 'days' });
                return true;
                break

            case 'getFileContent':
                console.log('reading file...');
                readFile(request.file);
                break
            case 'fill':
                console.log('filling hours...');
                fillHours().then( ()=> {
                    console.log('sending reponse...');
                    sendResponse({ action: 'filled' });
                });
                return true;
                
            case 'all':
                console.log('doing all process...');
                console.log('choosing days...');
                chooseWrongDays();
                new Promise(r => setTimeout(r, 1000)).then( () => {
                    console.log('filling hours...');
                    fillHours().then( ()=> {
                        console.log('sending reponse...');
                        sendResponse({ action: 'filled' });
                    });
                });
                return true;
        }
    }
);

// chooseWrongDays();
// document.onclick = () => {
//     fillHours();
//     document.onclick = null;
// };

