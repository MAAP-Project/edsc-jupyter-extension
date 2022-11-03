import { Widget } from '@lumino/widgets';
import { PageConfig } from '@jupyterlab/coreutils'
import { INotification } from "jupyterlab_toastify";

import {
  request, RequestResult
} from './request';

//import "./globals"
import globals from "./globals";

let unique = 0;

//
// Widget to display Earth Data Search Client inside an iframe
//
export
class IFrameWidget extends Widget {

  constructor(path: string) {
    super();
    this.id = path + '-' + unique;
    unique += 1;

    this.title.label = "Earthdata Search";
    this.title.closable = true;

    let div = document.createElement('div');
    div.classList.add('iframe-widget');
    let iframe = document.createElement('iframe');
    iframe.id = "iframeid";

    // set proxy to EDSC
    request('get', path).then((res: RequestResult) => {
      if (res.ok){
        console.log('site accesible: proceeding');
        iframe.src = path;
      } else {
        iframe.setAttribute('baseURI', PageConfig.getBaseUrl());

        console.log('site failed with code ' + res.status.toString());
        if(res.status == 404){

        } else if(res.status == 401){

        } else {
          console.log('setting proxy');
          path = "edsc/proxy/" + path;
          iframe.src = path;
        }
      }
    });

    div.appendChild(iframe);
    this.node.appendChild(div);
  }
};

//
// Widget to display selected search parameter
//
export
class ParamsPopupWidget extends Widget {
  constructor() {
    let body = document.createElement('div');
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    if (globals.granuleParams == null){
      console.log("graceal granule params is null in params pop up");
    }
    body.innerHTML = "<pre>Granule search: " + JSON.stringify(globals.granuleParams, null, " ") + "</pre><br>"
        + "<pre>Collection search: " + JSON.stringify(globals.collectionParams, null, " ") + "</pre><br>"
        + "<pre>Results Limit: " + globals.limit + "</pre>";

    super({ node: body });
  }
}

//
// Popup widget to display any string message
//
export class FlexiblePopupWidget extends Widget {
  constructor(text:string) {
    let body = document.createElement('div');
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.innerHTML = text;

    super({ node: body });
  }
}

//
// Widget with popup to set search results limit
//
export class LimitPopupWidget extends Widget {
  constructor() {
      let body = document.createElement('div');
      body.style.display = 'flex';
      body.style.flexDirection = 'column';

      super({node: body});

      this.getValue = this.getValue.bind(this);

      let inputLimit = document.createElement('input');
      inputLimit.id = 'inputLimit';
      this.node.appendChild(inputLimit);
  }

  /* sets limit */
  /**
   * Check for the following error cases in limit: some letters some numbers, negative number 
   * float with letters and numbers, operations/ other characters, and value greater than maximum int
   * (9007199254740991)
   * A float is automatically rounded down to the next closest integer 
   */
  getValue() {
    let limit_temp = parseInt((<HTMLInputElement>document.getElementById('inputLimit')).value);
      console.log("graceal trying to get nan to not work");
      console.log(typeof limit_temp);
    if (Number.isNaN(limit_temp) || limit_temp < 0) {
      INotification.error("Please enter a positive integer for results limit");
    } else if (limit_temp > Number.MAX_SAFE_INTEGER) {
      INotification.error("Please enter a positive integer less than 9007199254740991");
    } else {
      globals.limit = limit_temp;
      console.log("new limit is: ", globals.limit)
      INotification.success("Results limit is now set to " + globals.limit);
    }

  }

}