import { Page, expect } from '@playwright/test';
import { GeneradorTexto } from '../utils/GeneradorTexto';



export class MantenedorFeriados {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    static nombreFeriado: string;
    static fechaFeriado: string;

    async filtrarFeriado() {
        const nombreFeriado = "Día Nacional del Trabajo";
        await this.page.getByRole('textbox', { name: 'Nombre Feriado' }).fill(nombreFeriado);
        await this.page.getByRole('link', { name: 'Buscar' }).click();
        await this.page.getByRole('cell', { name: 'Día Nacional del Trabajo' }).waitFor({ state: 'visible' });
        await expect(this.page.getByRole('cell', { name: 'Día Nacional del Trabajo' })).toBeVisible();
    }

    async filtrarFecha() {
        const fecha = "2025-05-01";
        await this.page.getByRole('textbox', { name: 'Fecha' }).fill(fecha);
        await this.page.getByRole('link', { name: 'Buscar' }).click();
        await this.page.getByRole('cell', { name: 'Día Nacional del Trabajo' }).waitFor({ state: 'visible' });
        await expect(this.page.getByRole('cell', { name: 'Día Nacional del Trabajo' })).toBeVisible();
    }

    async crearFeriado() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;

        
        MantenedorFeriados.nombreFeriado = GeneradorTexto('Feriado');
        MantenedorFeriados.fechaFeriado = formattedDate;
        console.log(MantenedorFeriados.fechaFeriado);
        
        await this.page.getByRole('link', { name: 'Crear Feriado' }).click();
        await this.page.getByRole('textbox', { name: '*Nombre Feriado' }).fill(MantenedorFeriados.nombreFeriado);
        await this.page.getByRole('textbox', { name: '*Fecha' }).fill(MantenedorFeriados.fechaFeriado);
        await this.page.getByRole('checkbox', { name: '¿Este Feriado se repite' }).click();
        await this.page.getByRole('link', { name: 'Guardar' }).click();

        await this.page.getByRole('link', { name: 'Limpiar' }).click();
        await this.page.getByRole('textbox', { name: 'Nombre Feriado' }).fill(MantenedorFeriados.nombreFeriado);
        await this.page.getByRole('link', { name: 'Buscar' }).click();
        await this.page.getByRole('link', { name: 'Editar' }).first().click();

        await expect(this.page.getByRole('textbox', { name: '*Nombre Feriado' })).toHaveValue(MantenedorFeriados.nombreFeriado);
        await expect(this.page.getByRole('textbox', { name: '*Fecha' })).toHaveValue(MantenedorFeriados.fechaFeriado);
        await expect(this.page.getByRole('checkbox', { name: '¿Este Feriado se repite' })).toBeChecked();
    }

    async editarFeriado() {
        MantenedorFeriados.nombreFeriado = MantenedorFeriados.nombreFeriado + ' Editado';
        MantenedorFeriados.fechaFeriado = '2025-10-31';

        await this.page.goto('https://netdoc-qa.nexia.cl/mantenedor-feriados');

        await this.page.getByRole('textbox', { name: 'Nombre Feriado' }).fill(MantenedorFeriados.nombreFeriado);
        await this.page.getByRole('link', { name: 'Buscar' }).click();
        await this.page.getByRole('link', { name: 'Editar' }).first().click();

        await this.page.getByRole('textbox', { name: '*Nombre Feriado' }).fill(MantenedorFeriados.nombreFeriado);
        await this.page.getByRole('textbox', { name: '*Fecha' }).fill(MantenedorFeriados.fechaFeriado);
        await this.page.getByRole('checkbox', { name: '¿Este Feriado se repite' }).click();
        await this.page.getByRole('link', { name: 'Guardar' }).click();

        await this.page.getByRole('link', { name: 'Limpiar' }).click();
        await this.page.getByRole('textbox', { name: 'Nombre Feriado' }).fill(MantenedorFeriados.nombreFeriado);
        await this.page.getByRole('link', { name: 'Buscar' }).click();
        await this.page.getByRole('link', { name: 'Editar' }).first().click();

        await expect(this.page.getByRole('textbox', { name: '*Nombre Feriado' })).toHaveValue(MantenedorFeriados.nombreFeriado);
        await expect(this.page.getByRole('textbox', { name: '*Fecha' })).toHaveValue(MantenedorFeriados.fechaFeriado);
        await expect(this.page.getByRole('checkbox', { name: '¿Este Feriado se repite' })).not.toBeChecked();
    }

    async eliminarFeriado() {
        await this.page.goto('https://netdoc-qa.nexia.cl/mantenedor-feriados');
        await this.page.getByRole('textbox', { name: 'Nombre Feriado' }).fill(MantenedorFeriados.nombreFeriado);
        await this.page.getByRole('link', { name: 'Buscar' }).click();
        await this.page.getByRole('link', { name: 'Eliminar' }).first().click();
        await this.page.getByRole('link', { name: 'Confirmar' }).click();

        await this.page.getByRole('alert', { name: 'Feriado eliminado exitosamente' }).waitFor({ state: 'visible' });
        await expect(this.page.getByRole('alert', { name: 'Feriado eliminado exitosamente' })).toBeVisible();

        await this.page.getByRole('textbox', { name: 'Nombre Feriado' }).fill(MantenedorFeriados.nombreFeriado);
        await this.page.getByText('× No se encontraron feriados').waitFor({ state: 'visible' });
        await expect(this.page.getByText('× No se encontraron feriados')).toBeVisible();
    }
}