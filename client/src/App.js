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
  const [dataFetched, setDataFetched] = useState(false);  // Track if data is already fetched


  const getEmployees = async () => {
    if (dataFetched) {
      // If the data has already been fetched, skip the fetch
      setShowEmployees((prevState) => !prevState);  // Toggle visibility
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:3001/employees");
      setEmployeeList(response.data);  // Set the data
      setDataFetched(true);  // Mark the data as fetched
      setShowEmployees((prevState) => !prevState);  // Toggle visibility
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const addEmployee = (event) => {
    event.preventDefault(); // Prevent the page from refreshing
    try {
      axios
        .post("http://localhost:3001/create", {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        })
        .then(() => {
          setEmployeeList([
            ...employeeList,
            {
              name: name,
              age: age,
              country: country,
              position: position,
              wage: wage,
            },
          ]);
          // Clear the form by resetting state values
          resetForm();
        });
    } catch (error) {
      console.error("There was an error adding the employee!", error);
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
