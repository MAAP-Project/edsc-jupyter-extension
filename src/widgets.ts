import { Widget } from '@lumino/widgets';
import { PageConfig } from '@jupyterlab/coreutils'
import { Notification } from '@jupyterlab/apputils';

import {
  request, RequestResult
} from './request';

//import "./globals"
import globals from "./globals";

let unique = 0;

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
    console.log("graceal1 in iframe constructor with path");
    console.log(path);
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
// Widget to display Earth Data Search Client inside an iframe
//

/*export class IFrameWidget extends Widget {
  private iframe: HTMLIFrameElement;

  constructor(initialPath: string) {
    super();
    this.id = initialPath + '-' + unique;
    unique += 1;

    this.title.label = "Earthdata Search";
    this.title.closable = true;

    let div = document.createElement('div');
    div.classList.add('iframe-widget');
    this.iframe = document.createElement('iframe');
    this.iframe.id = "iframeid";

    // Set the initial URL
    this.iframe.src = initialPath;

    // Add an event listener for the iframe's load event
    this.iframe.addEventListener('load', () => {
      // Check if the URL has changed due to redirection
      console.log("graceal1 in iframe add event listener ");
      console.log(this.iframe.src);
      if (this.iframe.src !== initialPath) {
        console.log('Redirected to:', this.iframe.src);
      }
    });

    div.appendChild(this.iframe);
    this.node.appendChild(div);

    // Add a message event listener to handle cross-origin communication
    window.addEventListener('message', (event) => this.handleMessage(event));
  }

  private handleMessage(event: MessageEvent): void {
    console.log("graceal1 in handle mesage function");
    console.log(event);
    // Ensure the message is from the iframe
    if (event.source === this.iframe.contentWindow) {
      // Handle the message data as needed
      console.log('Received message:', event.data);
    }
  }

  // Method to navigate the iframe to a new URL
  public navigateToUrl(url: string): void {
    // Update the iframe's source to the specified URL
    this.iframe.src = url;
  }
}*/
/*
export class IFrameWidget extends Widget {
  private iframe: HTMLIFrameElement;
  //private originalPath: string;
  //private currentPath: string;

  constructor(path: string) {
    super();
    this.id = path + '-' + unique;
    unique += 1;

    this.title.label = "Earthdata Search";
    this.title.closable = true;

    let div = document.createElement('div');
    div.classList.add('iframe-widget');
    this.iframe = document.createElement('iframe');
    this.iframe.id = "iframeid";

    // Store the original path
    //this.originalPath = path;
    //this.currentPath = path;

    // Add the iframe to the widget
    div.appendChild(this.iframe);
    this.node.appendChild(div);

    // Set up an event listener to handle URL changes in the iframe
    this.iframe.addEventListener('load', this.handleIFrameLoad.bind(this));*/
    /*this.iframe.addEventListener('load', (event) => { // initially was "click", but "load" is actually catching
      // I am wondering if load negates the need to check event.target.tagName... more testing needed 
      const iframeDocument = this.iframe.contentDocument;
      console.log("graceal1 iframe document");
      console.log(iframeDocument);

      if (iframeDocument) {
        // Access the iframe's document
        const anchorElements = iframeDocument.querySelectorAll('a');
        console.log(anchorElements);

        anchorElements.forEach((anchor) => {
          anchor.addEventListener('click', (event) => {
            console.log("graceal1 in anchor element click event with ");
            console.log(event);
            event.preventDefault(); // Prevent the default link behavior
            const link = anchor.href; // Get the link URL
            // Open the link in a new tab or window
            window.open(link, '_blank');
          });
        });
      }*/
      /*console.log("graceal1 in add event listener for iframe and event is ");
      console.log(event);
      console.log(event.target);
      console.log(event.target instanceof HTMLElement);
      if (event.target && event.target instanceof HTMLElement) {
        console.log('graceal1 in first if statement printing tagName');
        console.log(event.target.tagName);
      }
      if (event.target && event.target instanceof HTMLElement) {
        console.log("graceal1 entered if statement seeing that link was pressed ");
        // If a link within the iframe is clicked
        event.preventDefault(); // Prevent the default link behavior
        const link = event.target.getAttribute('src'); // Get the link URL
        console.log("graceal1 link should be ");
        console.log(link);
        // Open the link in a new tab or window
        window.open("https://ideas-digitaltwin.jpl.nasa.gov/airquality/dat/", '_blank');
      }
    });*/

    // Load the initial URL
    /*this.loadURL(path);
  }

  private handleIFrameLoad(event: Event) {
    console.log("graceal1 in handle iframe load with ");
    console.log(event);
    // Check if the current URL has changed
    console.log("graceal1 trying to figure out why not going into if statement");
    console.log(this.iframe.contentWindow);
    let temp = this.iframe.contentWindow ? this.iframe.contentWindow.location: "content window is null"
    console.log(temp);*/
    /*if (this.iframe.contentWindow && this.currentPath !== this.iframe.contentWindow.location.href) {
      console.log("graceal1 content window location href");
      console.log(this.iframe.contentWindow.location.href);
      // Update the current path
      this.currentPath = this.iframe.contentWindow.location.href;
      // Load the new URL
      //this.loadURL(this.currentPath);
      event.preventDefault(); // Prevent the default link behavior
      if (event.target && event.target instanceof HTMLElement) {
        console.log("graceal1 and event target is ");
        console.log(event.target.getAttribute("src"));
        //const link = event.target.getAttribute('href'); // Get the link URL
        // Open the link in a new tab or window
        window.open("https://ideas-digitaltwin.jpl.nasa.gov/airquality/dat/", '_blank');
      }
    }*/
  //}

  /*private loadURL(path: string) {
    // set proxy to EDSC
    console.log("graceal1 in load url ");
    console.log(path);
    request('get', path).then((res: RequestResult) => {
      if (res.ok) {
        console.log('site accessible: proceeding');
        this.iframe.src = path;
      } else {
        console.log('site failed with code ' + res.status.toString());
        if (res.status == 404) {
          // Handle 404 error
        } else if (res.status == 401) {
          // Handle 401 error
        } else {
          console.log('setting proxy');
          // Modify the path to use the proxy
          path = "edsc/proxy/" + path;
          this.iframe.src = path;
        }
      }
    });
  }
}*/


//
// Widget to display selected search parameter
//
export
class ParamsPopupWidget extends Widget {
  constructor() {
    let body = document.createElement('div');
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    
    let showGranuleParams = globals.granuleParams;
    let showCollectionParams = globals.collectionParams;
    if (showGranuleParams != null && showGranuleParams["concept_id"].length == 0) {
      showGranuleParams = null;
    }
    if (showCollectionParams !=null && showCollectionParams["concept_id"].length == 0) {
      showCollectionParams = null;
    }
    body.innerHTML = "<pre>Granule search: " + JSON.stringify(showGranuleParams, null, " ") + "</pre><br>"
        + "<pre>Collection search: " + JSON.stringify(showCollectionParams, null, " ") + "</pre><br>"
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
      inputLimit.value = String(globals.limit);
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
    let limitTemp = parseInt((<HTMLInputElement>document.getElementById('inputLimit')).value);
    if (Number.isNaN(limitTemp) || limitTemp < 0) {
      Notification.error("Please enter a positive integer for results limit", {autoClose: 3000});
    } else if (limitTemp > Number.MAX_SAFE_INTEGER) {
      Notification.error("Please enter a positive integer less than 9007199254740991");
    } else {
      globals.limit = limitTemp;
    }

  }

}