import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'hours-chrome-extension';
  content: string = '';
  entries: { entry: string, exit: string }[] = [];

  constructor() {
  }

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.readFile(fileList[0]);
    }
  }

  readFile(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.content = fileReader.result as string;
      console.log(this.content);
    }
    fileReader.readAsText(file);
  }

  processText() {
    let data = this.content.split('\n');
    this.entries = data.map(day => {
      const dayEntries = day.split('-');
      return { entry: dayEntries[0], exit: dayEntries[1] };
    });

  }

  async fillHours() {
    let entry;
    let exit;
    for (let i=0; i< this.entries.length; i++) {
        const project1 = document.querySelector("select[id$='ProjectStep1_EmployeeReports_row_"+ i +"_0']");
        const project2 = document.querySelector("select[id$='ProjectStep2_EmployeeReports_row_"+ i +"_0']");
        const project3 = document.querySelector("select[id$='ProjectStep3_EmployeeReports_row_"+ i +"_0']");
        entry = document.querySelector("input[id$='ManualEntry_EmployeeReports_row_"+ i +"_0']");
        exit = document.querySelector("input[id$='ManualExit_EmployeeReports_row_" + i + "_0']");

        if (entry && exit) {
            (project1 as HTMLSelectElement).selectedIndex = 2;
            (project1 as HTMLSelectElement).dispatchEvent(new Event('change'));
            await new Promise(r => setTimeout(r, 100));
            (project2 as HTMLSelectElement).selectedIndex = 1;
            (project2 as HTMLSelectElement).dispatchEvent(new Event('change'));
            await new Promise(r => setTimeout(r, 100));
            (project3 as HTMLSelectElement).selectedIndex = 1;
            (project3 as HTMLSelectElement).dispatchEvent(new Event('change'));
            (entry as HTMLInputElement).value = this.entries[i].entry;
            (exit as HTMLInputElement).value = this.entries[i].exit;
            (exit as HTMLInputElement).focus();
            (exit as HTMLInputElement).blur();
        }
      }
  }

  chooseWrongDays() {
    debugger
    const images = document.querySelectorAll("img[src$='error.gif']");
    console.log(images);
    const refreshButton = document.querySelector("input[name$='RefreshSelectedDays']");
    console.log(refreshButton);
    let imgArr = Array.from(images);
    imgArr = imgArr.filter((image) => {
      const firstParent = (image as HTMLElement).parentElement;
      if (firstParent) {
        const secondParent = firstParent.parentElement;
        if (secondParent) {
          return secondParent.className === 'dayImageNumberContainer';
        }
      }
      return false;
    });
    imgArr.forEach(img => {
      (img as HTMLElement).click();
    });
    (refreshButton as HTMLElement).click();
  }
}
