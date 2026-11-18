# Especificación criptográfica (v1)

Regla general: todo se cifra y descifra en el dispositivo.
El servidor nunca recibe la contraseña maestra ni datos sin cifrar.

## Librerías
- libsodium (libsodium-wrappers-sumo): Argon2id y XChaCha20-Poly1305
- Web Crypto API: HKDF-SHA256 y números aleatorios
- Nunca implementamos algoritmos propios

## 1. Clave maestra
- Algoritmo: Argon2id
- Memoria: 64 MiB | Iteraciones: 3 | Hilos: 1
- Salt: 16 bytes aleatorios, uno por cuenta, guardado en el servidor
- Salida: 32 bytes
- La contraseña se normaliza con NFKC antes de usarla

## 2. Separación de claves (HKDF-SHA256)
De la clave maestra salen dos valores de 32 bytes:
| Nombre        | info (etiqueta fija)                    | Dónde vive          |
|---------------|-----------------------------------------|---------------------|
| encryptionKey | gestor-contrasenas/v1/encryption-key    | Solo en el dispositivo |
| authHash      | gestor-contrasenas/v1/auth-hash         | Se envía al servidor   |
Las etiquetas nunca se cambian.

## 3. Vault key
- 32 bytes aleatorios, generados al registrarse
- Se guarda en el servidor cifrada con encryptionKey
- Cifra todas las entradas de la bóveda

## 4. Cifrado de entradas
- Algoritmo: XChaCha20-Poly1305
- Nonce: 24 bytes aleatorios, nuevo en cada cifrado
- Datos asociados (AAD): "v1|" + id de la entrada
- Formato del blob: v1:<nonce base64url>:<datos cifrados base64url>

Contenido de una entrada antes de cifrar (JSON):
- type: "login"
- name, username, password, url, notes
- updatedAt (fecha ISO)

## 5. Kit de emergencia
- Clave de recuperación: 32 bytes aleatorios, mostrada una sola vez
- Cifra una segunda copia de la vault key (vaultKeyRecoveryEnc)
- El kit también incluye los 10 códigos de respaldo del 2FA

## 6. En el servidor
- authHash se vuelve a hashear con Argon2id (19 MiB, 2 iteraciones)
  antes de guardarlo
- Secreto TOTP: RFC 6238, 6 dígitos, 30 segundos, guardado cifrado
  con una clave del servidor (variable de entorno)
- Códigos de respaldo: se guardan como hash, de un solo uso
- Email desconocido en prelogin: se devuelve un salt falso pero
  siempre igual (HMAC del email), para no revelar qué cuentas existen

## Versionado
Cada blob y cada cuenta guardan su versión (v1). Si algún día
cambian los algoritmos, la app sabe cómo leer los datos viejos.