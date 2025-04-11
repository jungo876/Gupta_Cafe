import { 
  users, 
  type User, 
  type InsertUser, 
  type FranchiseRequest, 
  type InsertFranchiseRequest,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveFranchiseRequest(request: InsertFranchiseRequest): Promise<FranchiseRequest>;
  saveContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private franchiseRequests: Map<number, FranchiseRequest>;
  private contactMessages: Map<number, ContactMessage>;
  private userIdCounter: number;
  private franchiseIdCounter: number;
  private messageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.franchiseRequests = new Map();
    this.contactMessages = new Map();
    this.userIdCounter = 1;
    this.franchiseIdCounter = 1;
    this.messageIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async saveFranchiseRequest(request: InsertFranchiseRequest): Promise<FranchiseRequest> {
    const id = this.franchiseIdCounter++;
    const createdAt = new Date().toISOString();
    const franchiseRequest: FranchiseRequest = { ...request, id, createdAt };
    this.franchiseRequests.set(id, franchiseRequest);
    console.log(`Franchise request saved: ${JSON.stringify(franchiseRequest)}`);
    return franchiseRequest;
  }

  async saveContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageIdCounter++;
    const createdAt = new Date().toISOString();
    const contactMessage: ContactMessage = { ...message, id, createdAt };
    this.contactMessages.set(id, contactMessage);
    console.log(`Contact message saved: ${JSON.stringify(contactMessage)}`);
    return contactMessage;
  }
}

export const storage = new MemStorage();
