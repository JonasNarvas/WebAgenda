import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Contato {
  id?: number;
  nome: string;
  apelido: string;
  cpf: string;
  telefone: string;
  email: string;
}

const ContatoForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [contato, setContato] = useState<Contato>({
    nome: '',
    apelido: '',
    cpf: '',
    telefone: '',
    email: ''
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5089/api/contato/${id}`)
        .then(res => setContato(res.data))
        .catch(err => console.error('Erro ao buscar contato', err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContato({ ...contato, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5089/api/contato/${id}`, { ...contato, id: Number(id) });
      } else {
        await axios.post('http://localhost:5089/api/contato', contato);
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar contato', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">{isEdit ? 'Editar' : 'Novo'} Contato</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['nome', 'apelido', 'cpf', 'telefone', 'email'].map((field) => (
            <input
              key={field}
              name={field}
              value={(contato as never)[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded placeholder-gray-400"
              required={field !== 'apelido'}
            />
          ))}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
            >
              {isEdit ? 'Salvar alterações' : 'Cadastrar'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContatoForm;
