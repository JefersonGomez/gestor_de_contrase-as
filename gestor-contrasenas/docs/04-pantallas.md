# Pantallas y flujos

## Pantallas
| #  | Pantalla             | Qué hace                                              | Fase |
|----|----------------------|-------------------------------------------------------|------|
| 1  | Inicio               | Página pública (Astro): qué es y cómo funciona        | 2    |
| 2  | Registro             | Email + contraseña maestra (con medidor de fortaleza) | 2    |
| 3  | Configurar 2FA       | QR para la app autenticadora + verificar un código    | 2    |
| 4  | Kit de emergencia    | Descargar PDF y confirmar que se guardó               | 2    |
| 5  | Login                | Email + contraseña maestra                            | 2    |
| 6  | Código 2FA           | Código de 6 dígitos o código de respaldo              | 2    |
| 7  | Recuperación         | Clave del kit + nueva contraseña maestra              | 2    |
| 8  | Bloqueo              | Pedir la maestra para desbloquear (sesión ya abierta) | 3    |
| 9  | Bóveda               | Lista de entradas + búsqueda                          | 3    |
| 10 | Detalle / edición    | Ver, copiar, editar y borrar una entrada              | 3    |
| 11 | Generador            | Crear contraseñas aleatorias                          | 3    |
| 12 | Ajustes              | Bloqueo automático, dispositivos, exportar            | 3–5  |

## Flujos
- Registro: 2 → 3 → 4 → 9
  (no se entra a la bóveda sin 2FA configurado y kit guardado)
- Login: 5 → 6 → 9
- Desbloqueo con sesión abierta: 8 → 9
- Recuperación: 5 → "Olvidé mi contraseña" → 7 → 6 → 9
- Bloqueo automático: cualquier pantalla → 8

## Reglas de interfaz
- La contraseña maestra exige al menos 12 caracteres
- Las contraseñas se muestran ocultas (••••) hasta que se pidan
- Copiar al portapapeles lo borra a los 30 segundos
- La bóveda se bloquea tras 5 minutos sin actividad