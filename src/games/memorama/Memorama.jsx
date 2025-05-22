import React, { useState, useEffect } from 'react';
import { Timer, Trophy, RotateCcw, Play, Star, Heart, Crown } from 'lucide-react';

// Datos de ejemplo de parejas bíblicas
const parejasBase = [
  { id: 1, texto: "Adán", pareja: "Adán" },
  { id: 2, texto: "Noé", pareja: "Noé" },
  { id: 3, texto: "Abraham", pareja: "Abraham" },
  { id: 4, texto: "Moisés", pareja: "Moisés" },
  { id: 5, texto: "David", pareja: "David" },
  { id: 6, texto: "Jonás", pareja: "Jonás" },
  { id: 7, texto: "Daniel", pareja: "Daniel" },
  { id: 8, texto: "José", pareja: "José" },
  { id: 9, texto: "María", pareja: "María" },
  { id: 10, texto: "Pedro", pareja: "Pedro" },
  { id: 11, texto: "Pablo", pareja: "Pablo" },
  { id: 12, texto: "Juan", pareja: "Juan" }
];

const mezclarArray = (array) => {
  let copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

const crearCartasParaNivel = (nivel) => {
  const pares = Math.min(2 + (nivel - 1) * 2, parejasBase.length);
  const seleccionados = parejasBase.slice(0, pares);

  let cartas = [];
  seleccionados.forEach((p) => {
    cartas.push({ ...p, cartaId: p.id + "a", mostrar: p.texto });
    cartas.push({ ...p, cartaId: p.id + "b", mostrar: p.pareja });
  });

  return mezclarArray(cartas);
};

const formatearTiempo = (segundos) => {
  const mins = Math.floor(segundos / 60);
  const secs = segundos % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const MemoramaBiblico = () => {
  const [nivel, setNivel] = useState(1);
  const [cartas, setCartas] = useState([]);
  const [cartasVolteadas, setCartasVolteadas] = useState([]);
  const [paresEncontrados, setParesEncontrados] = useState([]);
  const [bloqueo, setBloqueo] = useState(false);
  const [estadoJuego, setEstadoJuego] = useState("inicio");
  const [tiempo, setTiempo] = useState(0);
  const [tiempoActivo, setTiempoActivo] = useState(false);
  const [mejorTiempo, setMejorTiempo] = useState(null);
  const [intentos, setIntentos] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [animacionCarta, setAnimacionCarta] = useState(null);
  const [tiempoLimite, setTiempoLimite] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // Timer effect
  useEffect(() => {
    let intervalo = null;
    if (tiempoActivo && !juegoTerminado) {
      intervalo = setInterval(() => {
        setTiempo(tiempo => {
          const nuevoTiempo = tiempo + 1;
          // Verificar si se acabó el tiempo
          if (nuevoTiempo >= tiempoLimite) {
            setTiempoActivo(false);
            setJuegoTerminado(true);
            setEstadoJuego("perdiste");
          }
          return nuevoTiempo;
        });
      }, 1000);
    } else if (!tiempoActivo && tiempo !== 0) {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [tiempoActivo, tiempo, tiempoLimite, juegoTerminado]);

  const iniciarNivel = () => {
    const nuevasCartas = crearCartasParaNivel(nivel);
    const limite = 60 + (nivel - 1) * 30; // 60s base + 30s por nivel
    
    setCartas(nuevasCartas);
    setCartasVolteadas([]);
    setParesEncontrados([]);
    setBloqueo(false);
    setEstadoJuego("jugando");
    setTiempo(0);
    setTiempoLimite(limite);
    setTiempoActivo(true);
    setIntentos(0);
    setAnimacionCarta(null);
    setJuegoTerminado(false);
  };

  const voltearCarta = (carta) => {
    if (bloqueo || juegoTerminado) return;
    if (cartasVolteadas.includes(carta.cartaId)) return;
    if (paresEncontrados.includes(carta.id)) return;

    setAnimacionCarta(carta.cartaId);
    setTimeout(() => setAnimacionCarta(null), 300);

    const nuevasVolteadas = [...cartasVolteadas, carta.cartaId];
    setCartasVolteadas(nuevasVolteadas);

    if (nuevasVolteadas.length === 2) {
      setBloqueo(true);
      setIntentos(prev => prev + 1);

      setTimeout(() => {
        const [c1, c2] = nuevasVolteadas.map((cid) =>
          cartas.find((c) => c.cartaId === cid)
        );

        if (c1.id === c2.id) {
          setParesEncontrados((prev) => [...prev, c1.id]);
          setPuntuacion(prev => prev + 100 - Math.floor(tiempo / 10));
        }

        setCartasVolteadas([]);
        setBloqueo(false);
      }, 1500);
    }
  };

  useEffect(() => {
    const paresNecesarios = cartas.length / 2;
    if (paresEncontrados.length === paresNecesarios && paresNecesarios > 0 && !juegoTerminado) {
      setEstadoJuego("ganaste");
      setTiempoActivo(false);
      setJuegoTerminado(true);
      if (!mejorTiempo || tiempo < mejorTiempo) {
        setMejorTiempo(tiempo);
      }
    }
  }, [paresEncontrados, cartas, tiempo, mejorTiempo, juegoTerminado]);

  const siguienteNivel = () => {
    setNivel((prev) => prev + 1);
    setEstadoJuego("inicio");
    setPuntuacion(prev => prev + 200);
  };

  const reiniciarJuego = () => {
    setNivel(1);
    setEstadoJuego("inicio");
    setTiempo(0);
    setTiempoActivo(false);
    setPuntuacion(0);
    setIntentos(0);
    setJuegoTerminado(false);
    setTiempoLimite(0);
  };

  const reiniciarNivel = () => {
    iniciarNivel();
  };

  const obtenerColorNivel = () => {
    const colores = [
      'from-blue-600 to-purple-600',
      'from-green-600 to-blue-500',
      'from-yellow-600 to-orange-500',
      'from-pink-600 to-red-500',
      'from-indigo-600 to-purple-600',
    ];
    return colores[(nivel - 1) % colores.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 bg-">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black mb-4 drop-shadow-lg">
            ✨ Memorama Bíblico ✨
          </h1>
          <div className="flex justify-center items-center gap-8 text-white">
            <div className="flex items-center gap-2 bg-gray-500 bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold">Nivel {nivel}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-500 bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Timer className="w-5 h-5 text-blue-600" />
              <span className={`font-mono ${tiempo >= tiempoLimite * 0.8 ? 'text-red-300 animate-pulse' : ''}`}>
                {formatearTiempo(tiempo)} / {formatearTiempo(tiempoLimite)}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-gray-500 bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>{puntuacion}</span>
            </div>
          </div>
        </div>

        {/* Pantalla de inicio */}
        {estadoJuego === "inicio" && (
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 text-center border border-white border-opacity-20 shadow-2xl">
            <div className="mb-6">
              <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${obtenerColorNivel()} flex items-center justify-center mb-4 shadow-xl`}>
                <span className="text-6xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Nivel {nivel}</h2>
              <p className="text-xl text-gray-600 mb-2">
                Encuentra {2 + (nivel - 1) * 2} parejas de cartas bíblicas
              </p>
              <p className="text-gray-600 mb-2">
                ¡Cada nivel tendrá más desafíos!
              </p>
              <p className="text-yellow-600 font-semibold">
                ⏰ Tiempo límite: {formatearTiempo(60 + (nivel - 1) * 30)}
              </p>
            </div>
            
            {mejorTiempo && (
              <div className="mb-6 p-4 bg-yellow-500 bg-opacity-20 rounded-2xl border border-yellow-400 border-opacity-30">
                <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-yellow-600">Mejor tiempo: {formatearTiempo(mejorTiempo)}</p>
              </div>
            )}

            <button 
              onClick={iniciarNivel}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Play className="w-6 h-6" />
              Iniciar Nivel {nivel}
            </button>
          </div>
        )}

        {/* Pantalla de juego */}
        {estadoJuego === "jugando" && (
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-6 border border-white border-opacity-20 shadow-2xl">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-6">
              {cartas.map((carta) => {
                const estaVolteada = cartasVolteadas.includes(carta.cartaId) || paresEncontrados.includes(carta.id);
                const esAnimada = animacionCarta === carta.cartaId;
                const esEncontrada = paresEncontrados.includes(carta.id);
                
                return (
                  <div
                    key={carta.cartaId}
                    onClick={() => voltearCarta(carta)}
                    className={`
                      relative h-24 md:h-28 cursor-pointer transform transition-all duration-500
                      ${esAnimada ? 'scale-110 rotate-6' : 'hover:scale-105'}
                      ${estaVolteada ? 'rotate-y-180' : ''}
                    `}
                  >
                    <div className={`
                      w-full h-full rounded-xl shadow-lg transition-all duration-500 preserve-3d
                      ${estaVolteada ? 'rotate-y-180' : ''}
                    `}>
                      {/* Cara trasera */}
                      <div className={`
                        absolute inset-0 w-full h-full rounded-xl backface-hidden
                        bg-gradient-to-br ${obtenerColorNivel()}
                        flex items-center justify-center border-2 border-white border-opacity-30
                        shadow-inner
                      `}>
                        <span className="text-3xl md:text-4xl animate-pulse">📖</span>
                      </div>
                      
                      {/* Cara delantera */}
                      <div className={`
                        absolute inset-0 w-full h-full rounded-xl backface-hidden
                        ${esEncontrada 
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300' 
                          : 'bg-gradient-to-br from-white to-gray-100 border-gray-300'
                        }
                        border-2 flex items-center justify-center text-center p-2 shadow-lg
                        transform rotate-y-180
                      `}>
                        <span className={`
                          font-bold text-sm md:text-base
                          ${esEncontrada ? 'text-white' : 'text-gray-800'}
                          transform rotate-y-180
                        `}>
                          {carta.mostrar}
                        </span>
                        {esEncontrada && (
                          <div className="absolute top-1 right-1 transform rotate-y-180">
                            <Heart className="w-4 h-4 text-white fill-current" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Estadísticas del juego */}
            <div className="flex justify-center items-center gap-6 text-white mb-4">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                <span>Pares: {paresEncontrados.length}/{cartas.length / 2}</span>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                <span>Intentos: {intentos}</span>
              </div>
            </div>
            
            {/* Barra de progreso de tiempo */}
            <div className="w-full bg-gray-700 bg-opacity-50 rounded-full h-3 mb-2">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  tiempo >= tiempoLimite * 0.8 
                    ? 'bg-gradient-to-r from-red-500 to-red-600' 
                    : tiempo >= tiempoLimite * 0.6
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    : 'bg-gradient-to-r from-green-500 to-blue-500'
                }`}
                style={{ width: `${Math.max(0, ((tiempoLimite - tiempo) / tiempoLimite) * 100)}%` }}
              ></div>
            </div>
            <p className="text-center text-white text-sm opacity-75">
              Tiempo restante: {formatearTiempo(Math.max(0, tiempoLimite - tiempo))}
            </p>
          </div>
        )}

        {/* Pantalla de derrota */}
        {estadoJuego === "perdiste" && (
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 text-center border border-red-500 border-opacity-50 shadow-2xl">
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mb-4 shadow-xl">
                <span className="text-6xl">😔</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                ⏰ ¡Se acabó el tiempo!
              </h2>
              <p className="text-xl text-red-200 mb-4">
                No completaste el nivel {nivel} a tiempo
              </p>
              <p className="text-gray-300">
                Encontraste {paresEncontrados.length} de {cartas.length / 2} parejas
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={reiniciarNivel}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <RotateCcw className="w-5 h-5" />
                Reintentar Nivel
              </button>
              <button 
                onClick={reiniciarJuego}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <RotateCcw className="w-5 h-5" />
                Empezar de Nuevo
              </button>
            </div>
          </div>
        )}

        {/* Pantalla de victoria */}
        {estadoJuego === "ganaste" && (
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 text-center border border-white border-opacity-20 shadow-2xl">
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mb-4 shadow-xl animate-bounce">
                <Trophy className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                🎉 ¡Felicidades! 🎉
              </h2>
              <p className="text-2xl text-yellow-200 mb-4">
                ¡Completaste el Nivel {nivel}!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-500 bg-opacity-30 p-4 rounded-2xl border border-blue-400 border-opacity-50">
                <Timer className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <p className="text-blue-200 font-semibold">Tiempo</p>
                <p className="text-white text-xl">{formatearTiempo(tiempo)}</p>
              </div>
              <div className="bg-green-500 bg-opacity-30 p-4 rounded-2xl border border-green-400 border-opacity-50">
                <Star className="w-8 h-8 text-green-300 mx-auto mb-2" />
                <p className="text-green-200 font-semibold">Puntuación</p>
                <p className="text-white text-xl">{puntuacion}</p>
              </div>
              <div className="bg-purple-500 bg-opacity-30 p-4 rounded-2xl border border-purple-400 border-opacity-50">
                <Heart className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                <p className="text-purple-200 font-semibold">Intentos</p>
                <p className="text-white text-xl">{intentos}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={siguienteNivel}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Crown className="w-5 h-5" />
                Siguiente Nivel
              </button>
              <button 
                onClick={reiniciarJuego}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <RotateCcw className="w-5 h-5" />
                Reiniciar Juego
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        /* Barra de progreso de tiempo */
        .time-progress {
          width: ${((tiempoLimite - tiempo) / tiempoLimite) * 100}%;
          transition: width 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default MemoramaBiblico;