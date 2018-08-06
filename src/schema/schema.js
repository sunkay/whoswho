module.exports = `
    type Query {
        employee(id: String): Employee 
        manager(id: String): Manager
        employees: [Employee]
        managers: [Manager]
    }

    type Mutation {
        addEmployee(id: String, firstname: String, lastname: String): Employee
        addManager(id: String, firstname: String, lastname: String): Manager
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
