## HackBrowser

![HackBrowser](http://www.hackbrowser.com/images/github-readme-image.png)

HackBrowser is a cross-platform, hackable browser written in Javascript. HackBrowser is built with Electron (formerly Atom Shell), which enables building cross-platform desktop apps with HTML, CSS, and Javascript. Since every part of the application's code is visible, customizing the browser in any way is possible. 

**This project is in heavy development. The first scheduled release is February 1st, 2016.**

## Programmatic control of browser

All browser-related controls and events are exposed through a central HackBrowserWindow object. 

```javascript
var hackBrowserWindow = new HackBrowserWindow();

// open a new tab and save the id to newTabId
hackBrowserWindow.addNewTab("http://www.google.com"); 

// save screensot (synchoronous)
hackBrowserWindow.takeScreenshotSync(); 

// navigate to another page
hackBrowserWindow.navigateTo("http://www.github.com"); 
```

## Features

- Browser tabs
- Options
- Custom "New Tab" page
- Screen Capture
- Page Automation
- Parallel Testing (using multiple tabs)


## License

The MIT License (MIT)
