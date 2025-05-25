import { test } from '@playwright/test';
import { MantenedorFeriados } from '../pages/MantenedorFeriados';

test.describe('Mantenedor Feriados', () => {
    let page;
    let mantenedorFeriados;

    test.beforeAll(async ({ browser }) => {
            page = await browser.newPage();
            // const browser = await chromium.launch({ headless: true }); // Forzando modo headless
            // const context = await browser.newContext();
            // page = await context.newPage();
            await page.goto("https://netdoc-qa.nexia.cl/mantenedor-feriados");
            await page.waitForLoadState("domcontentloaded");
        
            mantenedorFeriados = new MantenedorFeriados(page);
        });
    
        test.afterAll(async () => {
            await page.close();
        });

    test("Filtrar Nombre Feriado", async ({ }) => {
        await mantenedorFeriados.filtrarFeriado();
    });

    test("Filtrar Fecha", async ({ }) => {
        await mantenedorFeriados.filtrarFecha();
    })

    test("Crear Feriado", async ({ }) => {
        await mantenedorFeriados.crearFeriado();
    })

    test("Editar Feriado", async ({ }) => {
        await mantenedorFeriados.editarFeriado();
    })

    test("Eliminar Feriado", async ({ }) => {
        await mantenedorFeriados.eliminarFeriado();
    })
});