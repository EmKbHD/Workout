export const workoutType = `
enum WorkoutStatusEnum{
   IN_PROGRESS
   CANCELED
   COMPLETED
 }

 type Workout {
   id: ID!
   title: String!
   reps: Int!
   load: Float!
   user: User!
 }
 
 type Query {
   getWorkouts: [Workout]
   getWorkoutById(id: ID!): Workout
 }

 input createWorkoutInput {
   title: String!
   reps: Int!
   load: Float!
   userId: ID! 
 }
 
 input updateWorkoutInput {
   title: String
   reps: Int
   load: Float
 }

 type Mutation {
   createWorkout(input:createWorkoutInput!): Workout
   updateWorkout(id:ID!, input:updateWorkoutInput!): Workout!
   deleteWorkout(id: ID!): MessageResponse!
 }
 
 type MessageResponse {
  message: String!
 }

`;
