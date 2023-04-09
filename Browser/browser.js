import { remote } from 'webdriverio';

const options = {
  capabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: process.env.CI ? ['headless', 'disable-gpu'] : [],
    },
  },
};

let browser;

export async function startBrowser() {
  browser = await remote(options);
  return browser;
}

export async function stopBrowser() {
  if (browser) {
    await browser.deleteSession();
    browser = null;
  }
}

export function getBrowser() {
  return browser;
}

