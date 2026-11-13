import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setProject(conf.appwriteProjectId)
      .setEndpoint(conf.appwriteUrl);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    const userAccount = await this.account.create(ID.unique(), email, password, name)

    if (userAccount) {
      return this.login({ email, password })
    }

    return userAccount
  }

  async login({ email, password }) {
    return await this.account.createEmailPasswordSession(email, password)
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser :: error -> ', error)
    }
    return null
  }

  async logout() {
    try {
      await this.account.deleteSessions()
      return true
    } catch (error) {
      console.log('Appwrite service :: logout :: error -> ', error)
    }
    return false
  }
}

const authAervice = new AuthService()

export default authAervice;