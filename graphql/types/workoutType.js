export const workoutType = `
 type Workout {
   id: ID!
   title: String!
   reps: Int!
   load: Int!
   createdAt: String!
   updatedAt: String!
   user: USer!
 }

 type USer{
   id: ID!
   name: String!
   email: String!
   password: String!
   content: String!
   status: String!
   createdAt: String!
   updatedAt: String!
   workouts: [Workout]
 }
 
 type Query {
   getWorkouts: [Workout]
   getWorkoutById(id: ID!): Workout
 }

 type Mutation {
   createWorkout(input:createWorkoutInput): Workout
   updateWorkout(input:updateWorkoutInput): Workout
   deleteWorkout(id: ID!): Workout
 }
 
 input createWorkoutInput {
   title: String!
   reps: Int!
   load: Int!
 }
 
 input updateWorkoutInput {
   title: String
   reps: Int
   load: Int
 }
`;
