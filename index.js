const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Create a server:
const app = express();

app.use(cors({
    origin: '*'
}));

// Create a schema and a root resolver:
const schema = buildSchema(`
    type Translation {
        key: String!
        text: String!
        locale: String!
    }

    type Query {
        translations: [Translation]
        translation(key: String!, locale: String!): Translation
    }
    `);

const translations = [
{
    key: "app_name",
    text: "Mortgage Overpayment Calculator",
    locale: "en-US",
},
{
    key: "app_name",
    text: "Calculadora de Hipoteca",
    locale: "pt-BR",
}
]

const rootValue = {
    translations: () => {
        return translations;
    },
    translation: ({ key, locale }) => translations.find((t) => (t.key === key && t.locale === locale)),
};

// Use those to handle incoming requests:
app.use(graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}));

// Start the server:
app.listen(8080, () => console.log('Running a GraphQL API server at http://localhost:8080'));