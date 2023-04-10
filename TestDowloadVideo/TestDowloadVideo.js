import { startBrowser } from '../Browser/browser.js';
import { testLogin } from '../TestCaseLogin/testLogin.js';

async function downloadVideo(browser) {
  await browser.url("http://localhost:3000/gallery");
  await browser.pause(2000);
  const videoSrc = await browser.$('video').getAttribute('src');
  console.log("Video source:", videoSrc);
  return videoSrc;
}

const LEAGUE_NAME = "#" + ":r7:".replace(/\:/g, "\\:");

async function startBr() {
  const browser = await startBrowser();
  const CHECK_LOGIN = await browser.$(LEAGUE_NAME)?.isExisting();
  if (!CHECK_LOGIN) {
    testLogin(browser).then(async () => {
      const videoSrc = await downloadVideo(browser);
      console.log("Download video successfully!");
      //mở tab mới
      await browser.newWindow(videoSrc.toString());
      await browser.pause(3000);
      await browser.saveScreenshot("./caseDownloadVideo.png");
      await browser.deleteSession();
    });
  }
}

startBr();
