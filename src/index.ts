import { ApolloServer } from 'apollo-server'

import { Query } from './resolvers/query'
import typeDefs from './schema.graphql'

const resolvers = {
  Query
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
