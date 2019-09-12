var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var fetch = require('node-fetch')

const memberType = new graphql.GraphQLObjectType({
  name: 'Member',
  fields: {
    name: {type: graphql.GraphQLString},
  }
});

const teamType = new graphql.GraphQLObjectType({
  name: 'Team',
  fields: {
    id: {type: graphql.GraphQLString},
    name: {type: graphql.GraphQLString},
    members: { type: new graphql.GraphQLList(memberType), resolve: (_, args, context) => {
        return fetch(`http://localhost:3000/teams/${_.id}/members`, {headers: context.headers}).then(res => res.json())
    }}
  }
});

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    team: {
      type: teamType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, {id}, context) => {
          return fetch(`http://localhost:3000/teams/${id}`, {headers: context.headers}).then(res => res.json())
      }
    },
    teams: {
      type: new graphql.GraphQLNonNull(new graphql.GraphQLList(new graphql.GraphQLNonNull(teamType))),
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, args, context) => {
          return fetch(`http://localhost:3000/teams`, {headers: context.headers}).then(res => res.json())
      }
    },
  }
});

var schema = new graphql.GraphQLSchema({query: queryType});

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');