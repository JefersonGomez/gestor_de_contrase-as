# Modelo de amenazas

## Qué protegemos
- Las contraseñas y notas guardadas en la bóveda
- La contraseña maestra y las claves derivadas de ella
- El acceso a la cuenta

## De qué SÍ protege la app
| Amenaza                                   | Defensa                                          |
|-------------------------------------------|--------------------------------------------------|
| Roban la base de datos                    | Todo está cifrado; authHash y tokens solo como hash |
| Hackean el servidor y leen los datos      | Zero-knowledge: el servidor nunca ve las claves  |
| Alguien espía la red (wifi pública)       | HTTPS obligatorio + datos ya cifrados            |
| Fuerza bruta sobre la contraseña maestra  | Argon2id con 64 MiB por intento                  |
| Prueban contraseñas en el login           | Límite de intentos + 2FA                         |
| Roban o adivinan tu contraseña maestra    | 2FA: sin el código no pueden descargar la bóveda |
| El servidor intercambia o altera blobs    | XChaCha20-Poly1305 con AAD lo detecta            |
| Averiguar qué emails tienen cuenta        | Salt falso y constante en prelogin               |
| Dejas la app abierta                      | Bloqueo automático y portapapeles que se borra   |
| Pierdes el celular con sesión abierta     | Bóveda bloqueada + cerrar la sesión remotamente  |

## De qué NO protege la app
| Riesgo                                        | Mitigación parcial                          |
|-----------------------------------------------|---------------------------------------------|
| Malware o keylogger en tu dispositivo         | Ninguna: mantén tus equipos limpios         |
| Contraseña maestra débil                      | Exigir largo mínimo y mostrar su fortaleza  |
| Olvidar la maestra Y perder el kit            | Ninguna: se pierde todo, por diseño         |
| El hosting entrega código JavaScript alterado | CSP, PWA en caché, revisar dependencias     |
| XSS: código inyectado en la página            | CSP estricta, no insertar HTML sin limpiar  |
| Una dependencia de npm maliciosa              | Pocas dependencias, npm audit, lockfile     |
| Alguien te obliga a abrir la bóveda           | Fuera del alcance                           |

## Supuestos
- El navegador y el sistema operativo del dispositivo son confiables
- libsodium y la Web Crypto API funcionan correctamente
- Tú eres el único usuario de tus dispositivos