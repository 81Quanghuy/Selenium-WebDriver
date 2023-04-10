import fs from "node:fs";
import { startBrowser } from '../Browser/browser.js';
import {testLogin} from './testLogin.js';
import {testlogout} from './testlogout.js';

async function startBr() {
  const browser = await startBrowser();
  testLogin(browser)
  .then(() => {
  testlogout(browser);
  
})
}
startBr();
  