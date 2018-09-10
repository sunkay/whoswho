import "jest-dom/extend-expect";
import employeeModel from "../../models/employee";
import { doesNotReject } from "assert";

function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

beforeEach(async () => {
    try{
        var data = await employeeModel.addEmployee({
            id: "100",
            firstname: "test_100_fn",
            lastname: "test_100_ln"
        });
    }
    catch(e){
        console.log(e);
        await employeeModel.deleteEmployee("100", "test_100_fn");
    }
});

afterEach(async () => {
    await employeeModel.deleteEmployee("100", "test_100_fn");
});


test("getEmployees returns a list of records", async (done) => {
    try{
        const data = await employeeModel.getEmployees(1);
        expect(data.Items.length).toBe(1);   
        done(); 
    }
    catch(e){
        done.fail(e);
    }    
});

test("addEmployee adds an employee into the DB, verifys and deletes record", async (done) => {
    try{
        var data = await employeeModel.getEmployee('100');
        expect(data.Items[0].id).toBe('100'); 
        done();   
    }
    catch(e){
        done.fail(e);
    }    
});

test("allEmployees with filter", async (done) => {
    // add an employee record
    try{
        // validate filter returning the right empl record
        var data = await employeeModel.allEmployees('test_100_fn');
        expect(data.Count).toBe(1);

        var data = await employeeModel.allEmployees('test_10_fn');
        expect(data.Count).toBe(0);
        done();  
    }
    catch(e){
        done.fail(e);
    }
});

test("update employee", async (done) => {
    try{
        await employeeModel.updateEmployee({
            id: '100',
            firstname: "UpdatedFN",
            lastname: "UpdatedLN"
        });
        var data = await employeeModel.getEmployee('100');
        expect(data.Items[0].firstname).toBe('UpdatedFN');    
        expect(data.Items[0].lastname).toBe('UpdatedLN');  
        done();  
    }
    catch(e){
        done.fail(e);
    }
});