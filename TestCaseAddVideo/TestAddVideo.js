import fs from "node:fs";
import { remote } from "webdriverio";
import path from "node:path";
const browser = await remote({
  capabilities: {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: process.env.CI ? ["headless", "disable-gpu"] : [],
    },
  },
});
// tạo biến chứa id của các element
const ADD_EVENT =
  ".MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-12fwbsp-MuiButtonBase-root-MuiButton-root";
const ITEM_VIDEO =
  ".MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd.css-j204z7-MuiFormControlLabel-root";
const VIEW =
  ".MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-sghohy-MuiButtonBase-root-MuiButton-root";

const EXIT_ADD_VIDEO =
  ".MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary.MuiIconButton-sizeMedium.css-1kuq5xv-MuiButtonBase-root-MuiIconButton-root";

const ADD_LOGO = "input[type=checkbox].ant-checkbox-input";
const TITLE =
  ".MuiOutlinedInput-input.MuiInputBase-input.MuiInputBase-inputMultiline.css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input";

const MERGE =
  ".MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-1clzr65-MuiButtonBase-root-MuiButton-root";

// kiểm tra đăng nhập
const CHECK_LOGIN = await browser.$(ADD_LOGO)?.isExisting();
if (!CHECK_LOGIN) {
  await browser.url("http://localhost:3000/login");
  await browser.$("#login-username").setValue("huy");
  await browser.$("#login-password").setValue("Huyvff@111");
  await browser.$("#login-button").click();
  await browser.pause(3000);
}

// thực hiện các bước test
await browser.url("http://localhost:3000/highlight");

await browser.$(VIEW).click();
await browser.pause(1000);
await browser.$(ADD_EVENT).click();
await browser.pause(1000);
await browser.$$(ITEM_VIDEO)[0].click();
await browser.$$(ITEM_VIDEO)[1].click();
await browser.pause(1000);
await browser.$(EXIT_ADD_VIDEO).click();
await browser.pause(1000);
await browser.$(ADD_LOGO).click();
await browser.pause(1000);
await browser.$(TITLE).setValue("HAGL vs SHB");
await browser.pause(1000);
await browser.$(MERGE).click();
await browser.pause(4000);
await browser.saveScreenshot("./caseAddVideo.png");
await browser.deleteSession();
