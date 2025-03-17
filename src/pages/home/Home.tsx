import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, Calendar, User, Activity, HeartPulse } from 'lucide-react';

export default function Home() {
  const [flights, setFlights] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    selectedFlight: "",
    name: "",
    age: "",
    healthIssue: "Não",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches/upcoming")
      .then((response) => response.json())
      .then((data) => {
        const flightData = data.map((flight: any) => ({
          id: flight.id,
          name: flight.name,
        }));
        setFlights(flightData);
      })
      .catch((error) => console.error("Erro ao buscar voos", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/compra", { state: formData });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="stars-container fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Rocket className="w-16 h-16 text-blue-500 animate-float" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Bem-vindo ao Universe
            </h1>
            <p className="text-gray-400 text-lg">Faça sua reserva conosco e embarque em sua jornada para as estrelas</p>
          </div>

          <div className="glass-card p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
              
                <div>
                  <label className="flex items-center text-base font-medium mb-2 text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    Selecione um voo:
                  </label>
                  <div className="relative">
                    <select
                      name="selectedFlight"
                      value={formData.selectedFlight}
                      onChange={handleChange}
                      className="appearance-none form-input w-full bg-gray-800 text-gray-300 border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Escolha um voo</option>
                      {flights.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-base font-medium mb-2 text-gray-300">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-base font-medium mb-2 text-gray-300">
                    <Activity className="w-4 h-4 mr-2 text-blue-500" />
                    Idade
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Digite sua idade"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center text-base font-medium mb-2 text-gray-300">
                    <HeartPulse className="w-4 h-4 mr-2 text-blue-500" />
                    Possui algum problema de saúde?
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="healthIssue"
                        value="Sim"
                        checked={formData.healthIssue === "Sim"}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="text-gray-300">Sim</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="healthIssue"
                        value="Não"
                        checked={formData.healthIssue === "Não"}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="text-gray-300">Não</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-[1.02] transition-all duration-200 focus:ring-2 focus:ring-blue-500/50"
                >
                  Comprar Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}