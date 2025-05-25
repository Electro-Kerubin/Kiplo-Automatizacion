import { Page, expect } from '@playwright/test';

export class MantenedorTipoDocumento {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    static nombreTipoDocumento: string;

    async filtrarNombreTipoDocumento() {
        MantenedorTipoDocumento.nombreTipoDocumento = "Carta_swagger";
        await this.page.getByRole('textbox', { name: 'Nombre Tipo Documento' }).fill(MantenedorTipoDocumento.nombreTipoDocumento);
        await this.page.getByRole('cell', { name: 'Carta_swagger' }).waitFor({ state: 'visible' });
        await expect(this.page.getByRole('cell', { name: 'Carta_swagger' })).toBeVisible();
    }

    async filtrarEstado () {
        await this.page.getByRole('link', { name: 'Limpiar' }).click();
        

    }
}