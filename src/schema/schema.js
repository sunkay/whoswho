module.exports = `
    type Query {
        employee(id: String): Employee 
        manager(id: String): Manager
        employees: [Employee]
        managers: [Manager]
    }

    type Mutation {
        addEmployee(input: AddEmployeeInput): AddEmployeePayload
        # manager is another employee
        addManager(input: AddEmployeeInput): AddEmployeePayload
        deleteEmployee(id: String, firstname: String): Employee
        deleteManager(id: String, firstname: String): Manager
    }

    input AddEmployeeInput{
        id: String!, 
        firstname: String!, 
        lastname: String!,        
    }

    type AddEmployeePayload{
        id: String, 
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
