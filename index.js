const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const { off } = require('process');

async function start()
{
    const browser = await puppeteer.launch(); // need to wait for the browser to launch
    const page = await browser.newPage(); // need to wait for the browser to open up a new page
    await page.goto('https://learnwebcode.github.io/practice-requests/'); // navigate to a new url
    
    /* Taking a screenshot */
    // await page.screenshot({
    //     path: "screencap.png",
    //     //fullPage: true, // takes screenshot of full page
    // }); // takes a screenshot and saves it as pathname

    /* Selecting elements using evaluate() to evaluate client-side JS */
    // const names = await page.evaluate(() => { // evaluates client-side JS
    //     return Array.from(document.querySelectorAll(".info strong")).map(e => e.textContent); // querySelector can select HTML elements by their CSS class, identifier etc. and return a node array; Array.from() returns an array and mapping returns the portion that we want to access
    // });
    // await fs.writeFile("names.txt", names.join("\r\n"));

    /* Returning an array of elements uysing $$eval() */
    // const photoURLs = await page.$$eval("img", (elems) => {
    //     return elems.map(e => e.src); // $$eval returns an actual array of elements
    // }); // selects particular HTML elements

    /* Simulating a click using click() */
    // await page.click("#clickme"); // simulates mouse click on elemnent identified by CSS selector, identifier etc. (best to use with identifiers)
    // const clickedData = await page.$$eval("#data", (elems) => { // $$eval returns an array of elements; $eval returns just one or the first element
    //     return elems.map(e => e.textContent);
    // });
    // console.log(clickedData);

    /* Navigating to different URLs from a list of URLs */
    // for (photo of photoURLs)
    // {
    //     const img = await page.goto(photo); // navigate to the URL
    //     await fs.writeFile(photo.split("/").pop(), await img.buffer());
    // }

    /* Simulating a form submission using type() */
    await page.type("#ourfield", "blue");

    // It is a better idea to await on the Promises like so
    await Promise.all(
        [
            page.click("#ourform button"), // clicks the submit button
            page.waitForNavigation(),
        ]
    );

    // This is the problematic approach
    // await page.click("#ourform button"); // clicks the submit button
    // await page.waitForNavigation(); // wait for new page to load up

    const info = await page.$eval("#message", (elem) => elem.textContent);
    console.log(info);

    await browser.close(); // close the browser
}

start();