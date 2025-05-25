import { Page, expect } from '@playwright/test';
import { GeneradorTexto } from '../utils/GeneradorTexto';
import { GeneradorCorreo } from '../utils/GeneradorCorreo';

export class MantenedorUsuarios {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    static nombreUsuario: string;
    static correoElectonico: string;

    async filtrarNombreUsuario() {
        const nombreUsuario = "rbaeza@nexia.cl";
        await this.page.getByRole('textbox', { name: 'Nombre Usuario' }).fill(nombreUsuario);
        await this.page.getByRole('link', { name: 'Buscar' }).click();
        await this.page.getByRole('cell', { name: 'RODRIGO BAEZA' }).waitFor({ state: 'visible' });
        expect(await this.page.getByRole('cell', { name: 'adsasdasdads' }).first().isVisible()).toBeTruthy();
    }

    async filtrarUnidad() {
        const unidad = "QA_Automatizacion";

        await this.page.getByRole('link', { name: 'Limpiar' }).click();

        await this.page.locator('#filtroUnidad div').filter({ hasText: 'Todas' }).first().click();
        await this.page.getByRole('textbox', { name: 'Ingresa texto para buscar la' }).fill(unidad);
        await this.page.locator('button.btn.btn-sm.btn-link.p-0.me-2').click();
        await this.page.locator('#filtroUnidad').getByText('QA_Automatizacion').click();
        await this.page.getByRole('link', { name: 'Buscar' }).click();
        await this.page.getByRole('cell', { name: 'QA_Automatizacion', exact: true }).waitFor({ state: 'visible' });
        expect(await this.page.getByRole('cell', { name: 'QA_Automatizacion', exact: true }).first().isVisible()).toBeTruthy();
    }

    async filtrarCargo() {
        const cargo = "rrhh01";
        await this.page.getByRole('link', { name: 'Limpiar' }).click();

        await this.page.getByRole('textbox', { name: 'Cargo' }).fill(cargo);
        await this.page.getByRole('link', { name: 'Buscar' }).click();
        await this.page.getByRole('cell', { name: 'rrhh_01' }).waitFor({ state: 'visible' });
        expect(await this.page.getByRole('cell', { name: 'rrhh_01' }).isVisible()).toBeTruthy();
    }

    async filtrarPerfil() {
        const perfil = "QA_Aut_test_01";
        await this.page.getByRole('link', { name: 'Limpiar' }).click();

        await this.page.getByLabel('Perfil').selectOption(perfil);
        await this.page.getByRole('link', { name: 'Buscar' }).click();

        expect(await this.page.getByRole('cell', { name: 'QA_Aut_test_01' }).first().isVisible()).toBeTruthy();
    }

    async filtrarEstadoActivo() {
        const nombreUsuario = "ACTIVO";

        await this.page.getByRole('link', { name: 'Limpiar' }).click();

        await this.page.getByRole('textbox', { name: 'Nombre Usuario' }).fill(nombreUsuario);
        await this.page.getByLabel('Estado').selectOption('Activo');
        await this.page.getByRole('link', { name: 'Buscar' }).click();
        await this.page.getByRole('cell', { name: 'USUARIO ACTIVO' }).waitFor({ state: 'visible' });
        expect(await this.page.getByRole('cell', { name: 'USUARIO ACTIVO' }).first().isVisible()).toBeTruthy();
    }

    async filtrarEstadoInactivo() {
        const nombreUsuario = "INACTIVO";
        
        await this.page.getByRole('link', { name: 'Limpiar' }).click();
        await this.page.getByRole('textbox', { name: 'Nombre Usuario' }).fill(nombreUsuario);
        await this.page.getByLabel('Estado').selectOption('Inactivo');
        await this.page.getByRole('link', { name: 'Buscar' }).click();
        await this.page.getByRole('cell', { name: 'USUARIO INACTIVO' }).waitFor({ state: 'visible' });
        expect(await this.page.getByRole('cell', { name: 'USUARIO INACTIVO' }).first().isVisible()).toBeTruthy();
    }

    async registrarUsuario(data:{externo: boolean}) {
        
        if(data.externo) {
            MantenedorUsuarios.nombreUsuario = GeneradorTexto("externo");
            MantenedorUsuarios.correoElectonico = GeneradorCorreo("externo");
        } else {
            MantenedorUsuarios.nombreUsuario = GeneradorTexto("interno");
            MantenedorUsuarios.correoElectonico = GeneradorCorreo("interno");
        }

        const contasena = "123123";
        const nombres = "QA";
        const apellidos = "Pruebas";
        const cargo = "Automatizacion";
        const unidad = "Desarrollo";
        const firmaJpg = "tests/utils/DocumentosPruebas/Cencosud_logo.svg.png";

        await this.page.getByRole('link', { name: 'Registrar Usuario' }).click();

        // Formulario
        await this.page.getByRole('textbox', { name: 'Ingresa el Nombre de Usuario' }).fill(MantenedorUsuarios.nombreUsuario);
        await this.page.getByRole('textbox', { name: 'Ingresa la contraseña del' }).fill(contasena);
        await this.page.getByRole('textbox', { name: 'Ingresa los Nombres de la' }).fill(nombres);
        await this.page.getByRole('textbox', { name: 'Ingresa los Apellidos de la' }).fill(apellidos);
        await this.page.getByRole('textbox', { name: 'Ingrese el correo electrónico' }).fill(MantenedorUsuarios.correoElectonico);
        await this.page.getByRole('textbox', { name: 'Ingresa el Cargo' }).fill(cargo);
        await this.page.getByRole('dialog').locator('app-selector-unidad div').filter({ hasText: '2404' }).first().click();
        if(data.externo) {
            await this.page.locator('div').filter({ hasText: /^\*Es Externo:NoSí$/ }).locator('span').nth(2).click();
        } else {
            await this.page.getByRole('textbox', { name: 'Ingresa texto para buscar la' }).fill(unidad);
            await this.page.getByRole('listitem').getByText('Desarrollo').click();
        }
        await this.page.getByRole('combobox').click();
        await this.page.getByRole('combobox').selectOption('QA_Aut_test_01');
        await this.page.getByRole('button', { name: 'Upload' }).setInputFiles(firmaJpg);
        await this.page.getByRole('link', { name: 'Guardar' }).click();

        await this.page.getByRole('alert', { name: 'Usuario registrado' }).waitFor({ state: 'visible' });
        await expect(this.page.getByRole('alert', { name: 'Usuario registrado' }).isVisible()).toBeTruthy();
        
        await this.page.getByRole('link', { name: 'Limpiar' }).click();
        await this.page.getByRole('textbox', { name: 'Nombre Usuario' }).waitFor({ state: 'visible' });
        await this.page.getByRole('textbox', { name: 'Nombre Usuario' }).fill(MantenedorUsuarios.nombreUsuario);
        await this.page.getByRole('link', { name: 'Buscar' }).click();

        await this.page.getByRole('cell', { name: `${MantenedorUsuarios.nombreUsuario}` }).waitFor({ state: 'visible' });
        expect(await this.page.getByRole('cell', { name: `${MantenedorUsuarios.nombreUsuario}` }).isVisible()).toBeTruthy();
    }

}