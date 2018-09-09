import "jest-dom/extend-expect";
import employeeModel from "../../models/employee";

function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("getEmployees returns a list of records", async () => {
    const data = await employeeModel.getEmployees(5);
    expect(data.Items.length).toBe(5);
});

test("addEmployee adds an employee into the DB, verifys and deletes record", async () => {
    try{
        var data = await employeeModel.addEmployee({
            id: "100",
            firstname: "test_100_fn",
            lastname: "test_100_ln"
        });
        data = await employeeModel.getEmployee('100');
        expect(data.Items[0].id).toBe('100');    
    }
    catch(e){
        console.log(e);
        await employeeModel.deleteEmployee("100", "test_100_fn");
    }
    
    //cleanup
    await employeeModel.deleteEmployee("100", "test_100_fn");
});

test("allEmployees with filter", async () => {
    // add an employee record
    try{
        var data = await employeeModel.addEmployee({
            id: "100",
            firstname: "test_100_fn",
            lastname: "test_100_ln"
        });
        data = await employeeModel.getEmployee('100');
        expect(data.Items[0].id).toBe('100');    

        // validate filter returning the right empl record
        var data = await employeeModel.allEmployees('test_100_fn');
        //console.log(data);
        expect(data.Count).toBe(1);

    }
    catch(e){
        console.log(e);
        await employeeModel.deleteEmployee("100", "test_100_fn");
    }

    // cleanup
    await employeeModel.deleteEmployee("100", "test_100_fn");

});