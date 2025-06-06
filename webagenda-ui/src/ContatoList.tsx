import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface Contato {
  id: number;
  nome: string;
  apelido: string;
  cpf: string;
  telefone: string;
  email: string;
  dataCadastro: string;
  dataUltimaAlteracao?: string;
}

const ContatoList: React.FC = () => {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [filtros, setFiltros] = useState({ nome: "", cpf: "", email: "" });
  const navigate = useNavigate();


  const fetchContatos = async () => {
    try {
      const response = await axios.get<Contato[]>("http://localhost:5089/api/contato");
      const filtrados = response.data.filter((c) => {
        return (
          c.nome.toLowerCase().includes(filtros.nome.toLowerCase()) &&
          c.cpf.includes(filtros.cpf) &&
          c.email.toLowerCase().includes(filtros.email.toLowerCase())
        );
      });
      setContatos(filtrados);
    } catch (error) {
      console.error("Erro ao buscar contatos", error);
    }
  };

  useEffect(() => {
    fetchContatos();
  }, [filtros]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este contato?');
    if (!confirm) return;
  
    try {
      await axios.delete('http://localhost:5089/api/contato', {
        data: { id }
      });
      fetchContatos(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao excluir contato', error);
    }
  };
  

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 p-6 overflow-x-hidden">
    <h1 className="text-4xl font-bold mb-8 text-center">WebAgenda</h1>
    
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    <input
      type="text"
      name="nome"
      placeholder="Filtrar por nome"
      className="bg-gray-800 border border-gray-700 text-white p-2 rounded w-full placeholder-gray-400"
      onChange={handleChange}
    />
    <input
      type="text"
      name="cpf"
      placeholder="Filtrar por CPF"
      className="bg-gray-800 border border-gray-700 text-white p-2 rounded w-full placeholder-gray-400"
      onChange={handleChange}
    />
    <input
      type="text"
      name="email"
      placeholder="Filtrar por e-mail"
      className="bg-gray-800 border border-gray-700 text-white p-2 rounded w-full placeholder-gray-400"
      onChange={handleChange}
    />
   </div>
        <div className="w-full overflow-x-auto bg-gray-800 rounded border border-gray-800">
        <table className="w-full border-collapse text-sm text-center text-white">
        <thead className="bg-gray-700 text-gray-200">
          <tr>
            <th className="p-3 border border-gray-600">Ações</th>
            <th className="p-3 border border-gray-600">Nome</th>
            <th className="p-3 border border-gray-600">Apelido</th>
            <th className="p-3 border border-gray-600">CPF</th>
            <th className="p-3 border border-gray-600">Telefone</th>
            <th className="p-3 border border-gray-600">Email</th>
            <th className="p-3 border border-gray-600">Data Cadastro</th>
          </tr>
          </thead>
          <tbody>
          {contatos.map((contato) => (
            <tr key={contato.id} className="hover:bg-gray-700">
              <td className="p-2 border-gray-700 space-x-2">
                <button
                  onClick={() => navigate(`/editar/${contato.id}`)}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(contato.id)}
                  className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Excluir
                </button>
              </td>
              <td className="p-2 border border-gray-700">{contato.nome}</td>
              <td className="p-2 border border-gray-700">{contato.apelido}</td>
              <td className="p-2 border border-gray-700">{contato.cpf}</td>
              <td className="p-2 border border-gray-700">{contato.telefone}</td>
              <td className="p-2 border border-gray-700">{contato.email}</td>
              <td className="p-2 border border-gray-700">{new Date(contato.dataCadastro).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button
      onClick={() => navigate('/novo')}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
    > 
      Cadastrar
    </button>
  </div>
  );
};

export default ContatoList;