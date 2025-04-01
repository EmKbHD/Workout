export const userType = `
  enum UserStatusEnum{
    ACTIVE
    INACTIVE
  }

  type User {
    id: ID!
    name: String!
    email: String!
    status: UserStatusEnum!
    workouts:[Workout]
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  input createUserInput {
    name: String!
    email: String!
    password: String!
    status: UserStatusEnum!
    workoutId:ID!
  }

  input updateUserInput {
    name: String
    email: String
    password: String
    status: UserStatusEnum
  }

  type Mutation {
    createUser(input:createUserInput): User
    updateUser(id:ID!, input:updateUserInput): User!
    deleteUser(id:ID!): MessageResponse!
  }

  type MessageResponse {
  message: String!
  }
`;
