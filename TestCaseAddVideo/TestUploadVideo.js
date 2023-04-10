// tạo biến chứa id của các element
const LEAGUE_NAME = "#" + ":r7:".replace(/\:/g, "\\:");

async function uploadVideo(browser) {
  await browser.url("http://localhost:3000/gallery");
  await browser.pause(1000);
  await browser.$$('.MuiButtonBase-root MuiFab-root MuiFab-circular MuiFab-sizeLarge MuiFab-primary css-1suf56w-MuiButtonBase-root-MuiFab-root').click();
  await browser.pause(1000);

  await browser.$$('.MuiInput-input MuiInputBase-input css-1x51dt5-MuiInputBase-input-MuiInput-input').setValue("images");

  await browser.pause(1000);
  browser.$("input[type=file]").setValue("/Users/hoangtoannguyen/Desktop/hinh1.png");

  await browser.pause(1000);
  await browser.$$('.MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root').click();

  await browser.pause(1000);
  await browser.saveScreenshot("./caseUploadVideo.png");
  await browser.deleteSession();
}

import { startBrowser } from '../Browser/browser.js';
import { testLogin } from '../TestCaseLogin/testLogin.js';


async function startBr() {
  const browser = await startBrowser();
  const CHECK_LOGIN = await browser.$(LEAGUE_NAME)?.isExisting();
  if (!CHECK_LOGIN) {
    testLogin(browser)
      .then(() => {
        uploadVideo(browser)
        .then(() => {})
      })
  }

}
startBr();


