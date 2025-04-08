// import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const [showEmployees, setShowEmployees] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); 

  const getEmployees = async () => {
    if (!dataFetched) {
      // Fetch data only if it hasn't been fetched before
      try {
        const response = await axios.get("http://localhost:3001/employees");
        setEmployeeList(response.data); 
        setDataFetched(true); // Mark the data as fetched so that we don't fetch it again
      } catch (error) {
        console.error("Error fetching employees:", error); 
      }
    }
    setShowEmployees((prevState) => !prevState); 
  };

  const addEmployee = async (event) => {
    event.preventDefault(); // Prevent the default form submission to avoid page reload
    try {
      await axios.post("http://localhost:3001/create", {
        name, age, country, position, wage
      });
      // Update the employee list with the new employee
      setEmployeeList((prevList) => [
        ...prevList,
        { name, age, country, position, wage }
      ]);
      resetForm(); 
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setAge(0);
    setCountry("");
    setPosition("");
    setWage(0);
  };

  return (
    <div className="App container">
      <h1>Employee Information</h1>
      <div className="information">
        <form action="">
          <div className="md-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="md-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              id="age"
              type="number"
              className="form-control"
              placeholder="Enter age"
              value={age === 0 ? "" : age}
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>
          <div className="md-3">
            <label htmlFor="country" className="form-label">
              County:
            </label>
            <input
              id="country"
              type="text"
              className="form-control"
              placeholder="Enter country"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />
          </div>
          <div className="md-3">
            <label htmlFor="position" className="form-label">
              Position:
            </label>
            <input
              id="position"
              type="text"
              className="form-control"
              placeholder="Enter position"
              value={position}
              onChange={(event) => {
                setPosition(event.target.value);
              }}
            />
          </div>
          <div className="md-3">
            <label htmlFor="wage" className="form-label">
              Wage:
            </label>
            <input
              id="wage"
              type="number"
              className="form-control"
              placeholder="Enter wage"
              value={wage === 0 ? "" : wage}
              onChange={(event) => {
                setWage(event.target.value);
              }}
            />
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-success"
            onClick={addEmployee}
          >
            Add Employee
          </button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button className="btn btn-primary" onClick={getEmployees}>
          Show employees
        </button>
        <br /> <br />
        {showEmployees && employeeList.length > 0 && (
          <div>
            {employeeList.map((val, key) => (
              <div key={key} className="employee card">
                <div className="card-body text-left">
                  <p className="card-text">Name: {val.name}</p>
                  <p className="card-text">Age: {val.age}</p>
                  <p className="card-text">Country: {val.country}</p>
                  <p className="card-text">Position: {val.position}</p>
                  <p className="card-text">Wage: {val.wage}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
