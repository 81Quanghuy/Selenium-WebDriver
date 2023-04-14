import { log } from "node:console";
import fs from "node:fs";
import { remote } from "webdriverio";
const browser = await remote({
  capabilities: {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: process.env.CI ? ["headless", "disable-gpu"] : [],
    },
  },
});
// tạo biến chứa id của các element
const LIST_VIDEO = ".ant-table-row.ant-table-row-level-0";
const LIST_BUTTON = "button[type=button]";
const LIST_INPUT = "input[type=text]";
const MODAL =
  ".MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container";
const DESCRIPTION =
  ".MuiInput-input.MuiInputBase-input.MuiInputBase-inputMultiline.MuiInputBase-inputSizeSmall.css-1wuzo6d-MuiInputBase-input-MuiInput-input";
const BTN_SHARE =
  ".MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-sghohy-MuiButtonBase-root-MuiButton-root";

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
const LEAGUE_NAME = "#" + ":r7:".replace(/\:/g, "\\:");
const CHECK_LOGIN = await browser.$(LEAGUE_NAME)?.isExisting();
if (!CHECK_LOGIN) {
  await browser.url("http://localhost:3000/login");
  await browser.$("#login-username").setValue("huy");
  await browser.$("#login-password").setValue("Huyvff@111");
  await browser.$("#login-button").click();
  await browser.pause(3000);
}
// thực hiện các bước test
await browser.url("http://localhost:3000/highlight");

const List_video = await browser.$$(LIST_VIDEO);
const List_button = await List_video[0].$$(LIST_BUTTON);

// kiểm tra có video nào chưa
if (List_video.length == 0) {
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
  await browser.pause(3000);
}
// thực hiện các bước test
List_button[1].click();

await browser.pause(2000);
const Modal = await browser.$(MODAL);
const List_input = await Modal.$$(LIST_INPUT);

const Description = await browser.$(DESCRIPTION);
const BtnDown = await Modal.$(
  ".MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-popupIndicator.css-qzbt6i-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator"
);
const BtnShare = await Modal.$$(BTN_SHARE);
List_input[0].setValue("HAGL vs SHB");
await browser.pause(3000);

Description.setValue("Đây là automaiton test");
await browser.pause(3000);
List_input[1].setValue("Demo Match");
await browser.pause(3000);
List_input[2].setValue("Private");
await BtnDown.click();
await browser.pause(3000);
await BtnShare[0].click();
await browser.pause(3000);
await browser.saveScreenshot("./caseShareVideo.png");
//await browser.deleteSession();
// fails if file was not created
fs.existsSync("./caseShareVideo.png");
