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
    await this.readThis($event.target)
    .then((data) => this.setData(data))
    .catch((e) => {console.log(e); alert('the file cant be parsed')})
  }

  readThis(inputValue: any) {
    let file: File = inputValue.files[0];
    return new Promise((resolve, reject) => {
      let myReader: FileReader = new FileReader();
      let tryConvertingTojson = (target) => {
          let string = target.replace(/(\r\n|\n|\r)/gm,",");
          string[string.length - 1] === "," ? string = string.slice(0, -1) : '';
          let finalString = '['+ string + ']';

          return finalString;

      }
      let y = myReader.onloadend = function (e) {

        let jsonFile;
        try {
          jsonFile = JSON.parse(myReader.result.toString());
        } catch (e) {
          try {
            let res = tryConvertingTojson(myReader.result.toString());
            resolve(JSON.parse(res));
          } catch (e) {
            reject(e);
          }
        }
        resolve(jsonFile);
      }

      myReader.readAsText(file);
    });
  }


  setParsingError(v): any {
    this.parsingError = v;
  }
}
