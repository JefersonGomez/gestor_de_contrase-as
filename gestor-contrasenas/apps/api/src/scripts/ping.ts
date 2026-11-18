import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('Falta MONGODB_URI en apps/api/.env')
}

const client = new MongoClient(uri)

try {
  await client.connect()
  const db = client.db(process.env.MONGODB_DB ?? 'gestor')

  // 1. ¿Responde el servidor?
  await db.command({ ping: 1 })
  console.log('Conectado a MongoDB Atlas')

  // 2. Escribir un documento de prueba
  const pruebas = db.collection('pruebas')
  const resultado = await pruebas.insertOne({ mensaje: 'hola', fecha: new Date() })
  console.log('Insertado con _id:', resultado.insertedId.toString())

  // 3. Leerlo de vuelta
  const doc = await pruebas.findOne({ _id: resultado.insertedId })
  console.log('Leído:', doc)

  // 4. Limpiar
  await pruebas.drop()
  console.log('Colección de prueba borrada')
} finally {
  await client.close()
}