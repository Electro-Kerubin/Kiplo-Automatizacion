import { test, chromium } from '@playwright/test';
import { CrearDocumento } from '../pages/CrearDocumento';
import { Bandejas } from '../pages/Bandejas';

test.describe('Firma Documento', () => {

    let page;
    let crearDocumento: CrearDocumento;
    let bandeja: Bandejas;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        // const browser = await chromium.launch({ headless: true }); // Forzando modo headless
        // const context = await browser.newContext();
        // page = await context.newPage();
        await page.goto("https://netdoc-qa.nexia.cl/mis-documentos");
        await page.waitForLoadState("domcontentloaded");
    
        crearDocumento = new CrearDocumento(page);
        bandeja = new Bandejas(page);
    });
    
    test.afterAll(async () => {
        await page.close();
    }); 

    test("Crear Documento Fisico/Digital | Firmar | Unidad", async ({ }) => {
        await crearDocumento.crearDocumento({tipoTramite: "firmar", tipoUsuario: "unidad", tipoDocumento: "fisico"});
    })

    test("Firmar Documento Fisico/Digital | Unidad", async ({ }) => {
        const referencia = CrearDocumento.referencia;
        const folio = CrearDocumento.folio;
        await bandeja.recibirDocumento({referencia: referencia, tipoTramite: "firmar", tipoDocumento: "fisico", folio: folio});
    })

    test("Crear Documento Fisico/Digital | Firmar | Usuario", async ({ }) => {
        await crearDocumento.crearDocumento({tipoTramite: "firmar", tipoUsuario: "usuario", tipoDocumento: "fisico"});
    })

    test("Firmar Documento Fisico/Digital | Usuario", async ({ }) => {
        const referencia = CrearDocumento.referencia;
        const folio = CrearDocumento.folio;
        await bandeja.recibirDocumento({referencia: referencia, tipoTramite: "firmar", tipoDocumento: "fisico", folio: folio});
    })

    test("Crear Documento Electronico | Firmar | Unidad", async ({ }) => {
        await crearDocumento.crearDocumento({tipoTramite: "firmar", tipoUsuario: "unidad", tipoDocumento: "electronico"});
    })

    test("Firmar Documento Electronico | Unidad", async ({ }) => {
        const referencia = CrearDocumento.referencia;
        await bandeja.recibirDocumento({referencia: referencia, tipoTramite: "firmar", tipoDocumento: "electronico"});
    })

    test("Crear Documento Electronico | Firmar | Usuario", async ({ }) => {
        await crearDocumento.crearDocumento({ tipoTramite: "firmar", tipoUsuario: "usuario", tipoDocumento: "electronico"});
    })

    test("Firmar Documento Electronico | Usuario", async ({ }) => {
        const referencia = CrearDocumento.referencia;
        await bandeja.recibirDocumento({referencia: referencia, tipoTramite: "firmar", tipoDocumento: "electronico"});
    })

});

