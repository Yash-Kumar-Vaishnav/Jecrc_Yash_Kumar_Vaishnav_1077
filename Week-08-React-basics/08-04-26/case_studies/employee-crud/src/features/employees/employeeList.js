import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {deleteEmployee} from "./employeeSlice";

function EmployeeList({onEdit}) {
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(deleteEmployee(id));
  }

  return (
    <div>
      <h2>Employee List</h2>
      {employees.map(employee => (
        <div key={employee.id}>
          <span>{employee.name} - {employee.position}</span>
          <button onClick={() => onEdit(employee)}>Edit</button>
          <button onClick={() => handleDelete(employee.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;

// Alternative table format
// function EmployeeList({onEdit}) {
//   const employees = useSelector((state) => state.employees.employees);
//   const dispatch = useDispatch();  
//         <thead>
//           <tr> 
//             <th>Name</th>
//             <th>Position</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map(employee => (
//             <tr key={employee.id}>
//               <td>{employee.name}</td>
//               <td>{employee.position}</td>
//               <td>
//                 <button onClick={() => onEdit(employee)}>Edit</button>
//                 <button onClick={() => handleDelete(employee.id)}>Delete</button>
//               </td>
//             </tr>
//           ))} 
//         </tbody>
//       </table>
//     </div>
//   );
// }