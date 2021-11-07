const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { getLocales } = require('./locales.js');
const { getTranslation } = require('./translation.js');

// Create a server:
const app = express();

app.use(cors({
    origin: '*'
}));

// Create a schema and a root resolver:
const schema = buildSchema(`
    type Locale {
        key: String!
    }

    type Translation {
        key: String!
        text: String!
        locale: Locale!
    }

    type Query {
        locales: [Locale]
        translation(key: String!, locale: String!): Translation
    }
`);

const rootValue = {
    locales: () => getLocales(),
    translation: ({ key, locale }) => getTranslation(key, locale)
};

// Use those to handle incoming requests:
app.use(graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}));

const PORT = process.env.PORT || 8080
const DOMAIN = process.env.DOMAIN || `http://localhost:${PORT}`

// Start the server:
app.listen(PORT, () => console.log(`Running a GraphQL API server at ${DOMAIN}`));