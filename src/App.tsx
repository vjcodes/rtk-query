import "./App.css";
import {
  useAddStudentMutation,
  useDeleteStudentMutation,
  useEditStudentMutation,
  useGetStudentsQuery,
} from "./features/studentSlice";

function App() {
  const { data, isSuccess, isError, error, isLoading } = useGetStudentsQuery(2);
  console.log(data);

  const [addStudent] = useAddStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();
  const [editStudent] = useEditStudentMutation();

  const { refetch } = useGetStudentsQuery();

  const handleSubmit = () => {
    addStudent({
      id: "123abc",
      studentName: "Vinayak",
      studentEmail: "vin@gmail.com",
    });
    // refetch();
  };

  const handleDelete = () => {
    deleteStudent("53");
  };

  const handleEdit = () => {
    editStudent({
      id: "52",
      studentName: "Vinayak Jaiswall",
      studentEmail: "vj@gmail.com",
    });
  };

  return (
    <>
      Hello
      <button onClick={() => handleSubmit()}>Add Student</button>
      <button onClick={() => handleDelete()}>Delete Student</button>
      <button onClick={() => handleEdit()}>Edit Student</button>
    </>
  );
}

export default App;
