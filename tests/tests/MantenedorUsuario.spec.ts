import {test, chromium} from '@playwright/test';
import { MantenedorUsuarios } from '../pages/MantenedorUsuarios';

test.describe('Mantenedor Usuarios', () => {

    let page;
    let mantenedorUsuarios: MantenedorUsuarios;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        // const browser = await chromium.launch({ headless: true }); // Forzando modo headless
        // const context = await browser.newContext();
        // page = await context.newPage();
        await page.goto("https://netdoc-qa.nexia.cl/mantenedor-usuarios");
        await page.waitForLoadState("domcontentloaded");
    
        mantenedorUsuarios = new MantenedorUsuarios(page);
    });

    test.afterAll(async () => {
        await page.close();
    });

    test("Filtrar Nombre Usuario", async ({ }) => {
        await mantenedorUsuarios.filtrarNombreUsuario();
    })

    test("Filtrar Unidad", async ({ }) => {
        await mantenedorUsuarios.filtrarUnidad();
    })

    test("Filtrar Cargo", async ({ }) => {
        await mantenedorUsuarios.filtrarCargo();
    })

    test("Filtrar Perfil", async ({ }) => {
        await mantenedorUsuarios.filtrarPerfil();
    })

    test("Filtrar Estado Activo", async ({ }) => {
        await mantenedorUsuarios.filtrarEstadoActivo();
    })

    test("Filtrar Estado Inactivo", async ({ }) => {
        await mantenedorUsuarios.filtrarEstadoInactivo();
    })

    test("Registrar Usuario Interno", async ({ }) => {
        await mantenedorUsuarios.registrarUsuario({externo: false});
    })

    test("Registrar Usuario Externo", async ({ }) => {
        await mantenedorUsuarios.registrarUsuario({externo: true});
    })
});