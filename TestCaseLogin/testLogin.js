import fs from "fs";

async function testLogin(browser) {
  await browser.url("http://localhost:3000");
  const username = await browser.$("#login-username");
  await username.setValue("huy");
  await browser.pause(1000);
  const password = await browser.$("#login-password");
  await password.setValue("Huyvff@111");
  await browser.pause(1000);
  const loginButton = await browser.$("#login-button");
  await loginButton.click();
  await browser.pause(1000);
  await browser.saveScreenshot("./caseLoginuserName.png");
  await browser.pause(1000);
  fs.existsSync("./caseLogin.png");
}
export { testLogin };
