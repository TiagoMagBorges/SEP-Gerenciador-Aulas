import Logo from "@/components/logo";
import {useEffect, useState} from "react";
import StudentController from "@/controllers/StudentController";
import Student from "@/components/students/Student";

export default function Students(){

  const [students, setStudents] = useState([]);

  useEffect(() => {
    (async () => fetchData())()
  }, []);

  const fetchData = async () => {
    const response = await StudentController.getStudents();
    setStudents(response.data);
  }

  return (
      <div className={'main-background'}>

        <nav className={'navbar'}>
          <Logo/>

        </nav>

        <main className={'main overflow-y-auto'}>

          {students.length > 0 ?
              <div>
          {students.map(student => <Student key={student.id} student={student}/>)}
          </div>
              :
              <div className={'text-center text-2xl text-gray-500 mt-10'}>Nenhum usuário encontrado</div>}

        </main>

      </div>
  );
}