
const express_graphql = require('express-graphql');
const graphql = require('graphql');
const repo = require('./repository.js');

module.exports.initGraphQL = (app) => {

    const rootQuery = new graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            messages: {
                type: new graphql.GraphQLList(
                    new graphql.GraphQLObjectType({
                        name: 'Message',
                        fields: {
                            id: { type: graphql.GraphQLInt },
                            time: { type: graphql.GraphQLString },
                            message: { type: graphql.GraphQLString },
                            name: { type: graphql.GraphQLString },
                            chatroomId: { type: graphql.GraphQLString },
                        }
                    })
                ),
                resolve: () => repo.Message.findAll()
            },

            userLog: {
                type: new graphql.GraphQLList(
                    new graphql.GraphQLObjectType({
                        name: 'UserLog',
                        fields: {
                            id: { type: graphql.GraphQLInt },
                            userName: { type: graphql.GraphQLString },
                            chatRoomIndex: { type: graphql.GraphQLString },
                            touchEventCount: { type: graphql.GraphQLInt },
                            signInTime: { type: graphql.GraphQLString },
                            stayTime: { type: graphql.GraphQLInt }
                        }
                    })
                ),
                resolve: () => repo.UserLog.findAll()
            }
        }
    });

    app.use('/graphql', express_graphql({
        schema: new graphql.GraphQLSchema({ query: rootQuery }),
        graphiql: true
    }));
};