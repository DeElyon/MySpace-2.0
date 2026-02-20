import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Type Definitions
const typeDefs = `#graphql
  # User Types
  type User {
    id: ID!
    msf_id: String!
    email: String!
    username: String!
    display_name: String
    tagline: String
    location: String
    avatar_url: String
    account_type: AccountType!
    profile_completion: Int!
    wallet_balance: Float!
    created_at: String!
  }

  enum AccountType {
    FREELANCER
    CLIENT
    COMPANY
    AGENCY
  }

  # Job Types
  type Job {
    id: ID!
    msf_id: String!
    title: String!
    description: String!
    category: String!
    budget_min: Float!
    budget_max: Float
    hourly_rate: Float
    skills_required: [String!]!
    status: JobStatus!
    proposals_count: Int!
    ai_match_score: Float
    client: User!
    created_at: String!
  }

  enum JobStatus {
    OPEN
    IN_PROGRESS
    COMPLETED
    CANCELLED
    ON_HOLD
  }

  # Proposal Types
  type Proposal {
    id: ID!
    job: Job!
    freelancer: User!
    cover_letter: String!
    proposed_budget: Float!
    proposed_timeline: Int!
    status: ProposalStatus!
    match_score: Float
    created_at: String!
  }

  enum ProposalStatus {
    PENDING
    SHORTLISTED
    ACCEPTED
    REJECTED
    WITHDRAWN
  }

  # Wallet Types
  type Wallet {
    id: ID!
    user: User!
    balance_ngn: Float!
    balance_usd: Float!
    balance_gbp: Float!
    balance_eur: Float!
    tier: WalletTier!
    kyc_verified: Boolean!
  }

  enum WalletTier {
    TIER_1
    TIER_2
    TIER_3
  }

  type Transaction {
    id: ID!
    type: TransactionType!
    amount: Float!
    currency: String!
    status: TransactionStatus!
    description: String
    created_at: String!
  }

  enum TransactionType {
    DEPOSIT
    WITHDRAWAL
    TRANSFER
    ESCROW_HOLD
    ESCROW_RELEASE
    PENALTY
    REFUND
    COMMISSION
  }

  enum TransactionStatus {
    PENDING
    PROCESSING
    COMPLETED
    FAILED
    CANCELLED
  }

  # Message Types
  type Conversation {
    id: ID!
    participants: [User!]!
    last_message: String
    last_message_at: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    sender: User!
    content: String!
    type: MessageType!
    created_at: String!
  }

  enum MessageType {
    TEXT
    IMAGE
    FILE
    VIDEO
    AUDIO
  }

  # Query & Mutation
  type Query {
    # User queries
    me: User
    user(id: ID!): User
    userByMsfId(msf_id: String!): User
    users(limit: Int, offset: Int): [User!]!
    
    # Job queries
    job(id: ID!): Job
    jobs(limit: Int, offset: Int, status: JobStatus): [Job!]!
    jobsByCategory(category: String!, limit: Int): [Job!]!
    jobsMatchingUser(limit: Int): [Job!]!
    
    # Proposal queries
    proposal(id: ID!): Proposal
    proposalsByJob(jobId: ID!): [Proposal!]!
    proposalsByFreelancer: [Proposal!]!
    
    # Wallet queries
    wallet: Wallet
    transactions(limit: Int): [Transaction!]!
    
    # Message queries
    conversations: [Conversation!]!
    conversation(id: ID!): Conversation
    
    # Search
    searchJobs(query: String!, filters: JobFilters): [Job!]!
    searchUsers(query: String!): [User!]!
  }

  input JobFilters {
    category: String
    budget_min: Float
    budget_max: Float
    skills: [String!]
    job_type: JobType
  }

  enum JobType {
    FIXED
    HOURLY
    MILESTONE
  }

  type Mutation {
    # Auth mutations
    register(input: RegisterInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    refreshToken(refresh_token: String!): AuthPayload!
    logout: Boolean!
    
    # User mutations
    updateProfile(input: UpdateProfileInput!): User!
    updateSettings(input: UpdateSettingsInput!): User!
    deleteAccount: Boolean!
    
    # Job mutations
    createJob(input: CreateJobInput!): Job!
    updateJob(id: ID!, input: UpdateJobInput!): Job!
    deleteJob(id: ID!): Boolean!
    
    # Proposal mutations
    createProposal(input: CreateProposalInput!): Proposal!
    updateProposalStatus(id: ID!, status: ProposalStatus!): Proposal!
    
    # Wallet mutations
    deposit(amount: Float!, method: String!): Transaction!
    withdraw(amount: Float!, account: String!): Transaction!
    transfer(amount: Float!, to_msf_id: String!): Transaction!
    
    # Message mutations
    sendMessage(conversationId: ID!, content: String!, type: MessageType): Message!
    createConversation(participantIds: [ID!]!): Conversation!
    markMessageRead(messageId: ID!): Message!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
    account_type: AccountType!
  }

  input UpdateProfileInput {
    display_name: String
    tagline: String
    location: String
    about: String
    avatar_url: String
  }

  input UpdateSettingsInput {
    notification_preferences: JSON
    privacy_settings: JSON
    appearance_settings: JSON
  }

  input CreateJobInput {
    title: String!
    description: String!
    category: String!
    job_type: JobType!
    budget_min: Float!
    budget_max: Float
    hourly_rate: Float
    skills_required: [String!]!
    duration: String!
  }

  input UpdateJobInput {
    title: String
    description: String
    status: JobStatus
    budget_min: Float
    budget_max: Float
  }

  input CreateProposalInput {
    job_id: ID!
    cover_letter: String!
    proposed_budget: Float!
    proposed_timeline: Int!
  }

  type AuthPayload {
    user: User!
    access_token: String!
    refresh_token: String!
  }

  scalar JSON
`;

// Mock Resolvers (replace with actual service calls)
const resolvers = {
  Query: {
    me: () => ({
      id: '1',
      msf_id: 'MSF12345678F',
      email: 'user@example.com',
      username: 'johndoe',
      display_name: 'John Doe',
      tagline: 'Full-Stack Developer',
      location: 'Lagos, Nigeria',
      account_type: 'FREELANCER',
      profile_completion: 85,
      wallet_balance: 245000,
      created_at: new Date().toISOString(),
    }),
    
    jobs: async (_, { limit = 10, offset = 0, status }) => {
      // In production, call job_service via HTTP/gRPC
      return Array(limit).fill(null).map((_, i) => ({
        id: `${i + 1}`,
        msf_id: `JOB${10000000 + i}J`,
        title: `Job ${i + 1}`,
        description: 'Job description here...',
        category: 'Development',
        budget_min: 50000 + (i * 10000),
        budget_max: 200000 + (i * 20000),
        skills_required: ['React', 'Node.js', 'TypeScript'],
        status: status || 'OPEN',
        proposals_count: Math.floor(Math.random() * 20),
        ai_match_score: 75 + Math.random() * 25,
        created_at: new Date().toISOString(),
        client: {
          id: 'client1',
          msf_id: 'MSF87654321C',
          email: 'client@example.com',
          username: 'techcorp',
          display_name: 'TechCorp Nigeria',
          account_type: 'CLIENT',
          profile_completion: 100,
          wallet_balance: 5000000,
          created_at: new Date().toISOString(),
        },
      }));
    },
    
    wallet: () => ({
      id: '1',
      user: { id: '1' },
      balance_ngn: 245000,
      balance_usd: 520.50,
      balance_gbp: 180,
      balance_eur: 150,
      tier: 'TIER_2',
      kyc_verified: true,
    }),
  },
  
  Mutation: {
    register: async (_, { input }) => {
      // In production, call auth_service
      return {
        user: {
          id: '1',
          msf_id: 'MSF12345678F',
          email: input.email,
          username: input.username,
          account_type: input.account_type,
          profile_completion: 20,
          wallet_balance: 0,
          created_at: new Date().toISOString(),
        },
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token',
      };
    },
    
    login: async (_, { email, password }) => {
      // In production, call auth_service
      return {
        user: {
          id: '1',
          msf_id: 'MSF12345678F',
          email,
          username: 'johndoe',
          account_type: 'FREELANCER',
          profile_completion: 85,
          wallet_balance: 245000,
          created_at: new Date().toISOString(),
        },
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token',
      };
    },
  },
};

// Create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create Apollo Server
const server = new ApolloServer({
  schema,
});

// Create Express app
const app = express();

app.use(cors());
app.use(express.json());

// Start server
const PORT = process.env.PORT || 4000;

async function startServer() {
  await server.start();
  
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.authorization,
      }),
    }),
  );
  
  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'api-gateway' });
  });
  
  app.listen(PORT, () => {
    console.log(`🚀 API Gateway ready at http://localhost:${PORT}/graphql`);
    console.log(`📊 Health check at http://localhost:${PORT}/health`);
  });
}

startServer().catch(console.error);
