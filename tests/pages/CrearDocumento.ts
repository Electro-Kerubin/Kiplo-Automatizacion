import { Page, expect } from '@playwright/test';
import { GeneradorTexto } from '../utils/GeneradorTexto';


export class CrearDocumento {
    private page: Page;

    static referencia: string;
    static folio: string;

    constructor(page: Page) {
        this.page = page;
    }

    

    async crearDocumento(data:{tipoTramite: string, tipoUsuario: string, tipoDocumento: string}) {

        CrearDocumento.referencia = GeneradorTexto("RE");
        CrearDocumento.folio = "Test_fisico/digital";

        await this.page.getByRole('link', { name: 'Crear Documento' }).click();

        if(data.tipoDocumento === 'fisico') {
            await this.page.getByRole('link', { name: 'Físico o Digital' }).click();

            // Crear Documento
            await this.page.getByRole('textbox', { name: 'Escriba', exact: true }).fill(CrearDocumento.folio); // cambiar
            await this.page.locator('select[name="tipoDocumento"]').selectOption('Test_QA_01');
            await this.page.getByRole('button', { name: 'Upload' }).setInputFiles('tests/utils/DocumentosPruebas/Nómina de Despacho.pdf');
            await this.page.getByRole('link', { name: 'Siguiente' }).click();

            // Informacion Adicional
            await this.page.getByRole('textbox', { name: 'Escriba referencia' }).fill(CrearDocumento.referencia);
            await this.page.getByText('Palabras Claves').click();
            await this.page.getByRole('option', { name: 'Compra/Venta' }).click();
            await this.page.getByRole('textbox', { name: 'Escriba observación' }).fill('Test Observacion');
            await this.page.getByRole('link', { name: 'Siguiente' }).click();
            

        } else if(data.tipoDocumento === 'electronico') {
            
            await this.page.getByRole('link', { name: 'Electrónico' }).click();

            // Crear Documento
            await this.page.locator('select[name="tipoDocumento"]').selectOption({ label: 'Test_QA_01' });
            //await this.page.getByRole('combobox').selectOption('Test_QA_01');
            await this.page.locator('select[name="comuna"]').selectOption('Providencia');
            await this.page.locator('quill-editor div').nth(2).fill('Test Cuerpo Documento');
            await this.page.getByRole('link', { name: 'Siguiente' }).click();

            // Informacion Adicional
            await this.page.getByRole('textbox', { name: 'Escriba referencia' }).fill(CrearDocumento.referencia);
            await this.page.getByRole('link', { name: 'Siguiente' }).click();
        }

        // Acciones sobre los documentos
        if(data.tipoTramite === 'firmar') {
            await this.page.locator('select[name="tipoTramite"]').selectOption('QA_Firma_3004_01');
        } else if(data.tipoTramite === 'visar') {
            await this.page.locator('select[name="tipoTramite"]').selectOption('QA_Visar_01');
        }
        if(data.tipoUsuario === 'usuario') {
            await this.page.getByText('Seleccione...').first().click();
            await this.page.getByText('Selecciona una unidad').click();
            await this.page.getByRole('textbox', { name: 'Ingresa texto para buscar la' }).fill('Desarrollo');
            await this.page.getByRole('listitem').getByText('Desarrollo').click();
            await this.page.getByRole('textbox').fill('rodrigo baeza');
            await this.page.getByRole('link', { name: 'Buscar' }).click();
            await this.page.getByRole('checkbox').click();
            await this.page.getByRole('link', { name: 'Aceptar' }).click();
        } else if(data.tipoUsuario === 'unidad') {
            await this.page.getByText('Seleccione...').nth(1).click();
            await this.page.locator('div').filter({ hasText: /^Selecciona una unidad$/ }).click();
            await this.page.getByRole('textbox', { name: 'Ingresa texto para buscar la' }).fill('Desarrollo');
            await this.page.getByRole('listitem').getByText('Desarrollo').click();
            await this.page.getByRole('link', { name: 'Aceptar' }).click();
        }
        await this.page.getByRole('link', { name: 'Siguiente' }).click();

        // Distribucion y Privacidad
        await this.page.getByRole('link', { name: 'Siguiente' }).click();

        // Resumen
        await this.page.getByText('Guardar y Despachar').click();
        await this.page.locator('#resumen').getByRole('link', { name: 'Crear Documento' }).click();
        await this.page.getByRole('link', { name: 'Confirmar' }).click();

        // Validacion de documento creado
        if(data.tipoDocumento === 'fisico') {
            await expect(await this.page.url()).toMatch(/crear-tramite-documento-fisico-digital/);
        }else if(data.tipoDocumento === 'electronico') {
            await expect(await this.page.url()).toMatch(/crear-tramite-documento-electronico/);
        }

        await this.page.waitForSelector('div:has-text("Por favor espere")', { state: 'detached', timeout: 100000 });
        await expect(await this.page.getByRole('heading', { name: 'DOCUMENTO GUARDADO CON ÉXITO' })).toHaveText("DOCUMENTO GUARDADO CON ÉXITO", { timeout: 100000 });

        
        
    }
}