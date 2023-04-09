
// tạo biến chứa id của các element
const LEAGUE_NAME = "#" + ":r7:".replace(/\:/g, "\\:");

import { startBrowser } from '../Browser/browser.js';
import { testLogin } from '../TestCaseLogin/testLogin.js';
async function deleteImgVideo(browser) {
  await browser.url("http://localhost:3000/gallery");
  await browser.pause(2000);
  await browser.$('.ant-btn.ant-btn-circle.ant-btn-default.ant-btn-icon-only.ant-btn-dangerous').click();
  await browser.pause(1000);
  await browser.$('.ant-btn ant-btn-default ant-btn-sm').click();
  await browser.pause(1000);
  await browser.$('.ant-btn.ant-btn-circle.ant-btn-default.ant-btn-icon-only.ant-btn-dangerous').click();
  await browser.pause(1000);
  await browser.$('.ant-btn ant-btn-primary ant-btn-sm').click();
  await browser.saveScreenshot("./caseDeleteImgVideo.png");
  await browser.deleteSession();
}

async function startBr() {
  const browser = await startBrowser();
  const CHECK_LOGIN = await browser.$(LEAGUE_NAME)?.isExisting();
  if (!CHECK_LOGIN) {
    testLogin(browser)
      .then(() => {
        deleteImgVideo(browser).then(() => {})
      })
  }

}
startBr();


