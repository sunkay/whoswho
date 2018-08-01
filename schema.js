module.exports = `
    type Query {
        employees: [Employee]
    }

    type Employee{
        id: ID!,
        firstname: String!,
        lastname: String,
    }
`;