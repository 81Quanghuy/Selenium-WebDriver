
import fs from "fs";
async function testlogout(browser) {
  await browser.pause(1000);
  const usernameLogout = await browser.$("#logout-buttun");
  await usernameLogout.click();
  await browser.pause(1000);
  await browser.saveScreenshot("./caseLogout.png");
  await browser.pause(1000);
  //đóng trình duyệt
  await browser.deleteSession();
  fs.existsSync("./caseLogin.png");
}
export{testlogout};

