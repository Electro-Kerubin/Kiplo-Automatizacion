import { Page, expect } from '@playwright/test';


export class Bandejas {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async recibirDocumento(data:{referencia: string, tipoTramite: string, tipoDocumento: string, folio?: string}) {
        await this.page.goto("https://netdoc-qa.nexia.cl/bandeja-documentos-por-recibir");
        await this.page.waitForLoadState("domcontentloaded");

        if(data.tipoDocumento === 'fisico') {
            await this.page.getByRole('row', { 
                name: `${data.folio} ${data.referencia} Test_QA_01 Desarrollo RODRIGO` 
            }).getByRole('link').nth(1).click();
        } else if(data.tipoDocumento === 'electronico') {
            await this.page.getByRole('row', { 
                name: `- ${data.referencia} Test_QA_01 Desarrollo RODRIGO BAEZA En Plazo` 
            }).getByRole('link').nth(1).click();
        }
        

        await this.page.getByRole('link', { name: 'Confirmar' }).click();
        // await this.page.getByRole('link', { name: 'Cerrar' }).click();

        if(data.tipoTramite === 'firmar') {
            await this.page.getByLabel('Acciones disponibles:').selectOption('Firmar (simple)');
            await this.page.getByRole('button', { name: 'Seleccione el certificado:' }).setInputFiles('tests/utils/DocumentosPruebas/mi_certificado.p12');
            await this.page.getByRole('textbox', { name: 'Ingrese la contraseña del' }).fill('polo');
            await this.page.getByRole('link', { name: 'Aceptar' }).click();

            await this.page.getByLabel('Firma realizada con éxito').waitFor({ state: 'visible', timeout: 25000 });
            await expect(this.page.getByLabel('Firma realizada con éxito')).toHaveText('Firma realizada con éxito', { timeout: 2000 });
            
            // await this.page.locator('object').contentFrame().locator('#imagenFirma').waitFor({ state: 'visible', timeout: 25000 });
            // await expect(await this.page.locator('object').contentFrame().locator('#imagenFirma')).toBeVisible({ timeout: 2000 });

        }else if(data.tipoTramite === 'visar') {
            await this.page.getByLabel('Acciones disponibles:').selectOption('Visar');
            await this.page.getByRole('link', { name: 'Confirmar' }).click();

            // await this.page.getByLabel('Visación exitosa').waitFor({ state: 'visible', timeout: 25000 });
            // await expect(this.page.getByLabel('Visación exitosa')).toHaveText('Visación exitosa', { timeout: 2000 });
            await this.page.getByText('× Visación exitosa').waitFor({ state: 'visible', timeout: 25000 });
            await expect(this.page.getByText('Visación exitosa')).toBeVisible();

        }    
    }
}