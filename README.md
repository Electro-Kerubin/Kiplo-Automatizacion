# Kiplo-Automatizacion

# Pruebas automatizadas

## Alcance de pruebas automatizadas
- Crear documento
    - Crear documento fisico/digital por usuario
    - Crear documento fisico/digital por unidad
    - Crear documento electronico por usuario
    - Crear documento electronico por unidad
    
- Firmar documento
    - Firmar documento fisico/digital por usuario
    - Firmar documento fisico/digital por unidad
    - Firmar documento electronico por usuario
    - Firmar documento electronico por unidad

- Visar Documento
    - Visar documento fisico/digital por usuario
    - Visar documento fisico/digital por unidad
    - Visar documento electronico por usuario
    - Visar documento electronico por unidad

- Mantenedor de Feriados
    - Filtrar Nombre de Feriado
    - Filtrar Fecha de feriado
    - Crear Feriado
    - Editar Feriado
    - Eliminar Feriado

- Mantenedor de usuarios
    - Filtrar por nombre de usuario
    - Filtrar por unidad
    - Filtrar por cargo
    - Filtrar por perfil
    - Filtrar por estado Activo
    - Filtrar por estado Inactivo
    - Registrar usuario interno
    - Registrar usuario externo

## Ejecucion de pruebas
Ejecutar todas las pruebas
```bash
npx playwright test
```

Ejecutar pruebas en especifico
- Firmar Documento
```bash
npx playwright test FirmarDocumento.spec.ts
```

- Visar Documento
```bash
npx playwright test VisarDocumento.spec.ts
```

- Mantenedor de feriados
```bash
npx playwright test MantenedorFeriados.spec.ts
```

- Mantenedor de Usuarios
```bash
npx playwright test MantenedorUsuario.spec.ts
```