import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Book {
    id: String
    title: String
    author: String
  }

  type Query {
    books: [Book]
    book(id: String): Book
  }

  type Mutation {
    addBook(id: String, title: String, author: String): Book
  }
`;

let books = [
  {
    id: "1",
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
    book: (_, args) => {
      const singleBook = books.find((d) => d.id === args.id);
      return books.find((d) => d.id === args.id);
    },
  },
  Mutation: {
    addBook: (_, { id, title, author }) => {
      books = [...books, { id, title, author }];
      return { id, title, author };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: http://localhost:4000/graphql`);
