require("dotenv").config();
// récupérer les chemins alias une fois le projet déployé
if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
};



import express, { Application, Response, Request } from "express";
import helmet from "helmet";
import http from "http";
import cors from "cors";
import playwright  from 'playwright';
import { generate } from 'csv-generate';



// cache
declare global {
  var myCache: NodeCache;
};
import NodeCache from "node-cache";
import { CSV } from "./CSV";

global.myCache = new NodeCache();

const app: Application = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

app.use(require("express-status-monitor")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

const ArrayImmeuble :any = [];

const RecursiveSearch : any = async(page : any, stop : boolean, number : number = 200, name:any, code:any) => {

  if (stop == null) {
    stop = true;
  }

  var formation = await page.locator(`div.col>article.formation>div.col`)
  await page.waitForTimeout(number);
  
  var formationCount = await formation.count()

  for (var i = 1; i <= formationCount; i++) {
    try {
      var title = await page.locator(`div.col:nth-child(${i})>article.formation>div.col>h3>a`).first()
      title = await title.allInnerTexts()
      await page.waitForTimeout(500);
      code.push(title[0].split('-\n')[0])
      name.push(title[0].split('-\n')[1])
    } catch (err) {
      return {code, name}
    }
  }
}


async function main(name: string, n: any, code:any) {

  console.log(name)

    const browser = await playwright.chromium.launch({
        headless: false // setting this to true will not run the UI
    });
    
    const page = await browser.newPage();
    await page.waitForTimeout(2000); // wait for 5 seconds href="/marketplace"
    await page.goto('https://www.m2iformation.fr/recherche/?q='+name);

    
    await page.waitForTimeout(3000); // wait for 5 seconds href="/marketplace"
    let a = await RecursiveSearch(page, null, 200, n, code)
    await browser.close();
}

app.get("/", async(req: Request, res: Response) => {

  var name : any = []
  var code : any = []
  
  
  await main('gestion de projet agile', name, code);
  await main('javascript', name, code);
  await main('php', name, code);
  await main('html', name, code);
  await main('css', name, code);
  await main('sass', name, code);
  await main('react', name, code);
  await main('angular', name, code);
  await main('vuejs', name, code);
  await main('sveltejs', name, code);
  await main('typescript', name, code);
  await main('cybersécurité', name, code);
  await main('flutter', name, code);
  await main('ionic', name, code);
  await main('gestion de projet', name, code);
  await main('sécurité informatique', name, code);
  await main('UX', name, code);
  await main('UI', name, code);
  await main('Developpeur web & web mobile', name, code);
  await main("concepteur developpeur d'application", name, code);

  console.log(code, name.length)
  
  for (var i = 0; i < name.length; i++) {
    console.log(name[i], code[i])
    console.log('ecriture')
    const csv = new CSV(name[i], code[i]);
    console.log('save')
    csv.saveAsCSV();
  }
  
  console.log("finish")
  return res.json({
    error: false,
    message: 'bots m2i'
  }) 
});

(async () => {
  try {
    httpServer.listen(PORT);
    console.log(`Serveur lancé sur le port ${PORT}`);
  
  } catch (error) {
    console.log("error: ", error);
  }
})();
