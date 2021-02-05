import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'waf-display';
  parsingError = false;
  data: [];


  file: any;
  fileChanged(e) {
    this.file = e.target.files[0];
  }

  setData(v): void {
    if (Array.isArray(v)) {
      //@ts-ignore
      this.data = v;
    }
    else {
      this.data = [];
      //@ts-ignore
      this.data.push(v);
    }
  }

  async changeListener($event): Promise<void> {
    let t = await this.readThis($event.target);
    this.setData(t);
  }

  readThis(inputValue: any) {
    let file: File = inputValue.files[0];
    return new Promise((resolve, reject) => {
      let myReader: FileReader = new FileReader();
      let setData = this.setData;

      let y = myReader.onloadend = function (e) {

        let jsonFile;
        try {
          jsonFile = JSON.parse(myReader.result.toString());
        } catch (e) {
          alert('the file cant be parsed');
          reject('the file cant be parsed');
        }
        resolve(jsonFile);
        // console.log(jsonIntext);
      }

      myReader.readAsText(file);
    });
  }


  setParsingError(v): any {
    this.parsingError = v;
  }
}
