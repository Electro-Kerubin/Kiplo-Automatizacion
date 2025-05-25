import { test, chromium } from '@playwright/test';

test.describe('Mantenedor Tipo Documento', () => {

    let page;

    test.beforeAll(async ({ browser }) => {
            page = await browser.newPage();
            // const browser = await chromium.launch({ headless: true }); // Forzando modo headless
            // const context = await browser.newContext();
            // page = await context.newPage();
            await page.goto("https://netdoc-qa.nexia.cl/mantenedor-usuarios");
            await page.waitForLoadState("domcontentloaded");
        });
    
        test.afterAll(async () => {
            await page.close();
        });

    test("Filtrar por Nombre Tipo Documento", async ({ }) => {});

    test("Filtrar por Estado", async ({ }) => {});
});