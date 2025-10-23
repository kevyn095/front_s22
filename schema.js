// schema.js
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
  } = require('graphql');
  
  const { events } = require('./data');
  
  // Tipo Event
  const EventType = new GraphQLObjectType({
    name: 'Event',
    description: 'Um evento disponível no sistema',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      date: { type: GraphQLString },
      description: { type: GraphQLString }
    })
  });
  
  // Root Query
  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      // Buscar todos os eventos
      eventos: {
        type: new GraphQLList(EventType),
        resolve(parent, args) {
          return events;
        }
      },
      // Buscar evento por ID (retorna o objeto; o cliente pode pedir somente name e date)
      evento: {
        type: EventType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return events.find(e => e.id === args.id);
        }
      }
    }
  });
  
  module.exports = new GraphQLSchema({
    query: RootQuery
  });
  