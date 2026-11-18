# Modelo de datos (MongoDB)

Base de datos: gestor. Tres colecciones.

## users
| Campo               | Tipo     | Descripción                               |
|---------------------|----------|-------------------------------------------|
| _id                 | ObjectId | Id del usuario                            |
| email               | string   | En minúsculas, único                      |
| kdf                 | objeto   | { version, memoryMiB, iterations, salt }  |
| authHashServer      | string   | Hash Argon2id del authHash                |
| vaultKeyEnc         | string   | Vault key cifrada con encryptionKey       |
| vaultKeyRecoveryEnc | string   | Vault key cifrada con la clave del kit    |
| totp                | objeto   | { secretEnc, enabled }                    |
| backupCodes         | string[] | Hashes de los códigos de respaldo         |
| revision            | number   | Último número de revisión del usuario     |
| createdAt           | Date     |                                           |

Índices: email (único)

## items
| Campo     | Tipo     | Descripción                               |
|-----------|----------|-------------------------------------------|
| _id       | string   | Id generado en el dispositivo (UUID)      |
| userId    | ObjectId | Dueño de la entrada                       |
| blob      | string   | Entrada cifrada (formato v1)              |
| revision  | number   | Revisión en la que cambió por última vez  |
| deleted   | boolean  | Tombstone: true si se borró               |
| updatedAt | Date     | Hora del servidor al guardar              |

Índices: { userId, revision }

## sessions
| Campo      | Tipo     | Descripción                               |
|------------|----------|-------------------------------------------|
| _id        | ObjectId |                                           |
| userId     | ObjectId |                                           |
| tokenHash  | string   | SHA-256 del token de la cookie            |
| deviceName | string   | Ej.: "Chrome en Windows"                  |
| createdAt  | Date     |                                           |
| lastSeenAt | Date     |                                           |
| expiresAt  | Date     | Vence a los 30 días                       |

Índices: tokenHash (único), expiresAt (TTL: Mongo borra las vencidas)

## Reglas
- Toda consulta a items y sessions filtra por userId
- Nunca se borra un item: se marca deleted = true
- La revisión la asigna el servidor con $inc sobre users.revision
- "Gana el último" = gana la revisión más alta (orden de llegada)