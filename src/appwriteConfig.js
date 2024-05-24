import { Client, Databases, Account } from "appwrite";

// export const API_ENDPOINT = '92.255.134.250'
export const PROJECT_ID = '6650d9fa0032c8343c62'
export const DATABASE_ID = '6650d9fa0032c8343c62'
export const COLLECTION_ID_MESSAGES = '6650da04000a2a93c381'


const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6650d9b00000ce28c07b');

export const databases = new Databases(client);
export const account = new Account(client);

export default client;