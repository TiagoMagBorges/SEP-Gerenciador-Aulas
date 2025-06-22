export default function Student({ student, onDelete }) { // Adicionamos a prop onDelete
  return (
      <div className="bg-white shadow-md rounded-lg p-4 m-4 flex justify-between items-center border border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{student.name}</h1>
          <p className="text-gray-600">{student.email}</p>
          <p className="text-gray-500 text-sm">{student.phone}</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary px-4 py-2 text-sm">Editar</button>
          <button
              onClick={() => onDelete(student.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
  );
}