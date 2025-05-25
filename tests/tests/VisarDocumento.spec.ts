import { test, chromium } from '@playwright/test';
import { CrearDocumento } from '../pages/CrearDocumento';
import { Bandejas } from '../pages/Bandejas';

test.describe('Visar Documento', () => {

    let page;
    let crearDocumento: CrearDocumento;
    let bandeja: Bandejas;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        // const browser = await chromium.launch({ headless: false });
        // const context = await browser.newContext();
        // page = await context.newPage();
        await page.goto("https://netdoc-qa.nexia.cl/mis-documentos");
        await page.waitForLoadState("domcontentloaded");
    
        crearDocumento = new CrearDocumento(page);
        bandeja = new Bandejas(page);
    });
    
    test.afterAll(async () => {
        // await page.close();
    }); 

    test("Crear Documento Fisico/Digital | Visar | Unidad", async ({ }) => {
        await crearDocumento.crearDocumento({tipoTramite: "visar", tipoUsuario: "unidad", tipoDocumento: "fisico"});
    })

    test("Visar Documento Fisico/Digital | Unidad", async ({ }) => {
        const referencia = CrearDocumento.referencia;
        const folio = CrearDocumento.folio;
        await bandeja.recibirDocumento({referencia: referencia, tipoTramite: "visar", tipoDocumento: "fisico", folio: folio});
    })

    test("Crear Documento Fisico/Digital | Visar | Usuario", async ({ }) => {
        await crearDocumento.crearDocumento({tipoTramite: "visar", tipoUsuario: "usuario", tipoDocumento: "fisico"});
    })

    test("Visar Documento Fisico/Digital | Usuario", async ({ }) => {
        const referencia = CrearDocumento.referencia;
        const folio = CrearDocumento.folio;
        await bandeja.recibirDocumento({referencia: referencia, tipoTramite: "visar", tipoDocumento: "fisico", folio: folio});
    })

    test("Crear Documento Electronico | Visar | Unidad", async ({ }) => {
        await crearDocumento.crearDocumento({tipoTramite: "visar", tipoUsuario: "unidad", tipoDocumento: "electronico"});
    })

    test("Visar Documento Electronico | Unidad", async ({ }) => {
        const referencia = CrearDocumento.referencia;
        await bandeja.recibirDocumento({referencia: referencia, tipoTramite: "visar", tipoDocumento: "electronico"});
    })

    test("Crear Documento Electronico | Visar | Usuario", async ({ }) => {
        await crearDocumento.crearDocumento({tipoTramite: "visar", tipoUsuario: "usuario", tipoDocumento: "electronico"});
    })

    test("Visar Documento Electronico | Usuario", async ({ }) => {
        const referencia = CrearDocumento.referencia;
        await bandeja.recibirDocumento({referencia: referencia, tipoTramite: "visar", tipoDocumento: "electronico"});
    })

});