import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const id = "Nexia";
    const username = "rbaeza@nexia.cl";
    const password = "123";

    const loginPage = "https://netdoc-qa.nexia.cl/login";
    await page.goto(loginPage);

    // Completar los campos de login
    await page.getByRole('textbox', { name: 'ID de cuenta o Alias' }).fill(id);
    await page.getByRole('textbox', { name: 'Nombre de Usuario' }).fill(username);
    await page.getByRole('textbox', { name: 'Contraseña' }).fill(password);

    // Hacer clic en el botón de ingresar
    await page.getByRole('button', { name: 'ingresar a Kiplo' }).click();

    // Esperar que cargue la página principal después del login
    await page.waitForLoadState("domcontentloaded");
    await page.waitForURL(/mis-documentos/);

    // Guardar el estado de la sesión (cookies y local storage)
    await context.storageState({ path: 'cookies.json' });

    await browser.close();
}

export default globalSetup;