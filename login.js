const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const puppeteer = require('puppeteer');

const user = [{
        type: 'input',
        name: 'username',
        message: '[>] Username:',
        validate: (value) => {
            if (!value) return 'Can\'t Empty';
            return true;
        }
    },
    {
        type: 'password',
        name: 'password',
        message: '[>] Password:',
        mask: '*',
        validate: (value) => {
            if (!value) return 'Can\'t Empty';
            return true;
        }
    }
];

const login = async (account) => {
   try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/accounts/login/');
    await page.click(".aOOlW.bIiDR");
    await page.waitForSelector("input[name=username]")
    await page.focus('input[name=username]');
    await page.keyboard.type(account.username);
    await page.focus('input[name=password]');
    await page.keyboard.type(account.password);
    await page.click('button[type="submit"]');
    const cookies = await page.cookies()
    fs.writeFileSync('login_cookie.json', JSON.stringify(cookies));
    await browser.close();
   } catch (error) {
       console.error(error);
   }
}



console.log(chalk.blue.cyan(`+++ [Get Cookies Instagram] +++`));
inquirer.prompt(user).then(account => login(account));
