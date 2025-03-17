import { ArrowLeft, HeartPulse, Rocket, User, Activity, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Compra() {
  const { state } = useLocation();
  const [flight, setFlight] = useState<any>(null);

  useEffect(() => {
    if (state?.selectedFlight) {
      fetch(`https://api.spacexdata.com/v4/launches/${state.selectedFlight}`)
        .then((response) => response.json())
        .then((data) => {
          setFlight(data);
        })
        .catch(() => console.error("Erro ao buscar detalhes do voo"));
    }
  }, [state?.selectedFlight]);

  if (!flight) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 bg-opacity-40 p-8 rounded-lg shadow-lg w-[800px] text-center relative">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Parabéns! Sua Reserva está Confirmada
        </h1>

        {flight.links?.patch?.small ? (
          <img
            src={flight.links.patch.small}
            alt="Imagem do voo"
            className="w-40 h-40 mx-auto mb-6"
          />
        ) : (
          <Rocket className="w-40 h-40 mx-auto mb-6 text-blue-500 animate-float" />
        )}

        <hr className="my-6 border-gray-600" />

        <div className="grid grid-cols-2 gap-4">
          <FlightDetails flight={flight} />
          <PassengerInfo {...state} />
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 mt-6 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Página Inicial
      </Link>
    </div>
  );
}

const Loading = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    <Loader className="w-10 h-10 text-blue-500 animate-spin mb-4" />
    <p>Carregando informações do voo...</p>
  </div>
);

const FlightDetails = ({ flight }: { flight: any }) => (
  <div className="bg-gray-700 p-4 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-blue-400 mb-2">Detalhes do Voo</h3>
    <div className="flex items-center gap-2 mt-4">
      <Rocket className="w-5 h-5 text-blue-500" />
      <strong className="text-xl">Espaçonave:</strong>
      <span className="text-xl">{flight.name}</span>
    </div>
  </div>
);

const PassengerInfo = ({ name, age, healthIssue }: any) => (
  <div className="bg-gray-700 p-4 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-blue-400 mb-2">
      Informações do Passageiro
    </h3>
    <p className="flex items-center gap-2">
      <User className="w-5 h-5 text-blue-400" />
      <strong>Nome:</strong> {name}
    </p>
    <p className="flex items-center gap-2">
      <Activity className="w-5 h-5 text-blue-400" />
      <strong>Idade:</strong> {age}
    </p>
    <p className="flex items-center gap-2">
      <HeartPulse className="w-5 h-5 text-blue-400" />
      <strong>Problemas de Saúde:</strong> {healthIssue || "Nenhum"}
    </p>
  </div>
);