import LoginController from "@/controllers/LoginController";

export default function MyAccount(){
    console.log(LoginController.currentUserData);
    return(
        <div className={'main-background'}>
            <nav className={'w-[90vw] h-[10vh] lg:w-[95vw] flex justify-between items-center text-white p-4'}>
                <h1 className="text-2xl font-bold">Minha Conta</h1>
                <button onClick={() => LoginController.logout()} className="bg-red-500 text-white px-4 py-2 rounded">
                    Sair
                </button>
            </nav>
            <div className="w-[90vw] h-[90vh] lg:w-[95vw] bg-white rounded-[20px] p-6">
                <h2 className="text-xl font-semibold mb-4">Dados do Usuário</h2>
                <p><strong>Nome:</strong> {LoginController.currentUserData?.name}</p>
                <p><strong>Email:</strong> {LoginController.currentUserData?.email}</p>
                <p><strong>Telefone:</strong> {LoginController.currentUserData?.phone}</p>
            </div>
        </div>
    );
}