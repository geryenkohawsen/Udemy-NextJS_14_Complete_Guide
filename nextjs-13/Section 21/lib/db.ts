import { MongoClient } from 'mongodb'

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://geryzarons:YTnj7rLmeEBCKyN8@cluster0.wkofz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  )

  return client
}
