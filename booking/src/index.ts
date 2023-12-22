import express from "express";
import puppeteer from "puppeteer";

const app = express();
const port = 3000;

interface Flight {
    schedule: string;
    airline: string;
    duration: string;
    transfer: string;
    price: string;
    svg?: string;
    ariaLabel: string;
    emissions: string;
    availableTransport: string;
    contingencies: string;
    travelModes: string;
}


function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/", async (req, res) => {
    res.send("Web completada.");
});

app.get("/api/flights", async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto(
            "https://consent.google.com/m?continue=https://www.google.com/travel/flights&gl=ES&m=0&pc=trv&cm=2&hl=es&src=1"
        );

        await page.type(".ND6Vic:nth-child(1) > .II2One", "Lisboa");
        await delay(2000);

        await page.click(".w1ZvBc");

        await page.waitForSelector(
            ".Bc6Ryd:nth-child(2) .yg1Os:nth-child(2) > .WhDFk:nth-child(3) .eoY5cb",
            { visible: true }
        );

        await page.click(
            ".Bc6Ryd:nth-child(2) .yg1Os:nth-child(2) > .WhDFk:nth-child(3) .eoY5cb"
        );

        await page.waitForSelector(".sYt5sc > .p1BRgf", { visible: true });

        await page.click(".sYt5sc > .p1BRgf");

        await page.waitForSelector(".rtW97 > .VfPpkd-vQzf8d", { visible: true });
        await page.click(".rtW97 > .VfPpkd-vQzf8d");

        await page.waitForSelector(".TUT4y > .VfPpkd-vQzf8d", { visible: true });

        await page.click(".TUT4y > .VfPpkd-vQzf8d");

        await page.waitForSelector(
            "div.BLohnc.q5Vmde",
            { visible: true }
        );

        await page.click("div.BLohnc.q5Vmde");

        await page.waitForSelector(".vun5vf > .WhDFk:nth-child(3) .RZ6mCd", {
            visible: true,
        });

        await page.click(".vun5vf > .WhDFk:nth-child(3) .RZ6mCd");

        await page.waitForSelector(".sYt5sc .n3qw7", { visible: true });

        await page.click(".sYt5sc .n3qw7");

        await page.waitForSelector(".rtW97 > .VfPpkd-vQzf8d", { visible: true });

        await page.click(".rtW97 > .VfPpkd-vQzf8d");

        await page.waitForSelector(".TUT4y > .VfPpkd-vQzf8d", { visible: true });

        await page.click(".TUT4y > .VfPpkd-vQzf8d");

        await delay(2000);

        await page.waitForSelector(
            "ul.VfPpkd-rymPhb.r6B9Fd.bwNLcf.P2Hi5d.VfPpkd-OJnkse",
            { timeout: 5000 }
        );


        const dataFlightsAfter: Flight[] = await page.evaluate(() => {
            const flightsAfter: Flight[] = [];
            const liElements = document.querySelectorAll("li.pIav2d");

            liElements.forEach((liElement) => {
                const divElement = liElement.querySelector('.JMc5Xc') as HTMLElement | null;
                const imgElement = divElement?.querySelector('.EbY4Pc.P2UJoe') as HTMLDivElement | null;
                const imgUrl = imgElement?.style.getPropertyValue('--travel-primitives-themeable-image-default') || '';

                const ariaLabel = divElement?.getAttribute('aria-label');

                const airline = (liElement as HTMLElement).outerText || "Valor No Encontrado";

                const lineas = airline.split("\n");
                const resultFligth: Flight = {
                    schedule: `${lineas[0]} ${lineas[1]} ${lineas[2]}`,
                    airline: lineas[3],
                    duration: lineas[4],
                    transfer: lineas[6],
                    price: lineas[10],
                    svg: imgUrl ? imgUrl : "",
                    ariaLabel: ariaLabel ? ariaLabel : "",
                    emissions: lineas[9],
                    availableTransport: lineas[5],
                    contingencies: lineas[7],
                    travelModes: lineas[8],
                };

                flightsAfter.push(resultFligth);
            });

            return flightsAfter;
        });

        await browser.close();

        res.json(dataFlightsAfter);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener datos de vuelos",
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
