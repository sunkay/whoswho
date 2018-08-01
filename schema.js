module.exports = `
    type Query {
        employee(id: String): Employee 
        manager(id: String): Manager
        employees: [Employee]
        managers: [Manager]
    }

    type Employee{
        id: ID!,
        firstname: String!,
        lastname: String,
    }

    type Manager{
        id: ID!,
        firstname: String,
        lastname: String,
    }
`;