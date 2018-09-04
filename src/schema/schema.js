module.exports = `
    type Query {
        allEmployees(filter: String!): [Employee]
        employee(id: String): Employee 
        manager(id: String): Manager
        employees: [Employee]
        managers: [Manager]
    }

    type Mutation {
        addEmployee(input: AddEmployeeInput): AddEmployeePayload
        updateEmployee(input: AddEmployeeInput): Employee
        deleteEmployee(id: String, firstname: String): Employee

        # manager is another employee
        addManager(input: AddEmployeeInput): AddEmployeePayload
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
