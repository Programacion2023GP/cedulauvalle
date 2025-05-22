import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, MenuItem, Select } from "@mui/material";

const categorias = {
  "Personajes": ["JESUS", "MOISES", "DAVID", "PABLO", "PEDRO", "NOE", "ABRAHAM", "ISAAC", "JACOB", "ESTER", "SALOMON", "DANIEL"],
  "Lugares": ["BELEN", "JERUSALEN", "EGIPTO", "GALILEA", "SAMARIA", "CANAAN", "NAZARET", "SINAI"],
  "Libros": ["GENESIS", "EXODO", "LEVITICO", "NUMEROS", "DEUTERONOMIO", "SALMOS", "PROVERBIOS", "ISAIAS", "MATEO", "HECHOS", "APOCALIPSIS"],
  "Versículos": ["FE", "GRACIA", "SALVACION", "VERDAD", "JUSTICIA", "AMOR", "CRUZ", "ESPERANZA", "MISERICORDIA"],
  "Eventos": ["CREACION", "DILUVIO", "CRUCIFIXION", "RESURRECCION", "ASCENSION", "PENTECOSTES", "EXODO", "MILAGROS"]
};

const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

const partesCuerpo = [
  <line x1="50" y1="250" x2="150" y2="250" stroke="#333" strokeWidth="4" />,
  <line x1="100" y1="250" x2="100" y2="50" stroke="#333" strokeWidth="4" />,
  <line x1="100" y1="50" x2="200" y2="50" stroke="#333" strokeWidth="4" />,
  <line x1="200" y1="50" x2="200" y2="80" stroke="#333" strokeWidth="2" />,
  <circle cx="200" cy="100" r="20" stroke="#333" strokeWidth="2" fill="none" />,
  <line x1="200" y1="120" x2="200" y2="180" stroke="#333" strokeWidth="2" />,
  <line x1="200" y1="140" x2="180" y2="160" stroke="#333" strokeWidth="2" />,
  <line x1="200" y1="140" x2="220" y2="160" stroke="#333" strokeWidth="2" />,
  <line x1="200" y1="180" x2="180" y2="210" stroke="#333" strokeWidth="2" />,
  <line x1="200" y1="180" x2="220" y2="210" stroke="#333" strokeWidth="2" />,
];

const Ahorcado = () => {
  const [tema, setTema] = useState("");
  const [palabra, setPalabra] = useState("");
  const [letrasAdivinadas, setLetrasAdivinadas] = useState([]);
  const [estadoJuego, setEstadoJuego] = useState("inicio");
  const [errores, setErrores] = useState(0);
  const [nivel, setNivel] = useState(1);

  const iniciarJuego = (temaSeleccionado = tema, nuevoNivel = nivel) => {
    let palabras = [];

    if (temaSeleccionado === "Mixto") {
      Object.values(categorias).forEach((lista) => palabras.push(...lista));
    } else {
      palabras = categorias[temaSeleccionado] || [];
    }

    // Ajuste de dificultad: palabras más largas con el nivel
    const filtradas = palabras.filter(p => p.length >= nuevoNivel + 2) || palabras;
    const seleccion = filtradas[Math.floor(Math.random() * filtradas.length)];

    setPalabra(seleccion);
    setLetrasAdivinadas([]);
    setErrores(0);
    setEstadoJuego("jugando");
  };

  const manejarLetra = (letra) => {
    if (estadoJuego !== "jugando" || letrasAdivinadas.includes(letra)) return;

    const nuevas = [...letrasAdivinadas, letra];
    setLetrasAdivinadas(nuevas);

    if (!palabra.includes(letra)) {
      const nuevosErrores = errores + 1;
      setErrores(nuevosErrores);
      if (nuevosErrores >= partesCuerpo.length) {
        setEstadoJuego("perdiste");
      }
    } else {
      const completa = palabra.split("").every((l) => nuevas.includes(l));
      if (completa) {
        setEstadoJuego("ganaste");
      }
    }
  };

  const renderPalabra = () =>
    palabra.split("").map((letra, idx) => (
      <Typography
        key={idx}
        variant="h4"
        sx={{
          mx: 0.5,
          borderBottom: "2px solid #444",
          display: "inline-block",
          width: 30,
          textAlign: "center",
          color: letrasAdivinadas.includes(letra) ? "#2e7d32" : "#333"
        }}
      >
        {letrasAdivinadas.includes(letra) ? letra : "_"}
      </Typography>
    ));

  const cambiarTema = (nuevoTema) => {
    setTema(nuevoTema);
    setNivel(1); // reiniciar nivel
    iniciarJuego(nuevoTema, 1);
  };

  return (
    <Box textAlign="center" p={3} sx={{ maxWidth: 600, mx: "auto" }}>
 

      {(estadoJuego === "inicio" || estadoJuego === "ganaste" || estadoJuego === "perdiste") && (
        <>
          <Typography variant="h6" mb={1}>
            {estadoJuego === "inicio" ? "Selecciona un tema:" : "¿Quieres cambiar el tema?"}
          </Typography>
          <Select
            value={tema}
            onChange={(e) => cambiarTema(e.target.value)}
            displayEmpty
            sx={{ mb: 3, minWidth: 200 }}
          >
            <MenuItem value="" disabled>Elige un tema</MenuItem>
            {Object.keys(categorias).map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
            <MenuItem value="Mixto">Mixto</MenuItem>
          </Select>
        </>
      )}

      {(estadoJuego === "jugando" || estadoJuego === "ganaste" || estadoJuego === "perdiste") && (
        <>
          <Typography variant="subtitle1" mb={1}>Nivel: {nivel}</Typography>

          <svg width="250" height="260" style={{ margin: "20px auto" }}>
            {partesCuerpo.slice(0, errores)}
          </svg>

          <Box my={3}>{renderPalabra()}</Box>

          <Typography variant="body2" mb={2}>
            Errores: <strong>{errores} / {partesCuerpo.length}</strong>
          </Typography>

          <Grid container spacing={1} justifyContent="center" sx={{ mb: 3 }}>
            {alfabeto.map((letra) => (
              <Grid item key={letra}>
                <Button
                  variant="contained"
                  onClick={() => manejarLetra(letra)}
                  disabled={letrasAdivinadas.includes(letra) || estadoJuego !== "jugando"}
                  sx={{
                    minWidth: 36,
                    minHeight: 36,
                    bgcolor: letrasAdivinadas.includes(letra)
                      ? palabra.includes(letra)
                        ? "#2e7d32"
                        : "#d32f2f"
                      : "#1976d2",
                    color: "white",
                    "&:disabled": {
                      color: "white"
                    }
                  }}
                >
                  {letra}
                </Button>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {estadoJuego === "ganaste" && (
        <Box mt={3}>
          <Typography variant="h5" color="#2e7d32" sx={{ fontWeight: 700, mb: 2 }}>
            ¡Ganaste! 🎉
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              const siguienteNivel = nivel + 1;
              setNivel(siguienteNivel);
              iniciarJuego(tema, siguienteNivel);
            }}
            sx={{ bgcolor: "#2e7d32", "&:hover": { bgcolor: "#1b5e20" }, mr: 1 }}
          >
            Siguiente nivel
          </Button>
        </Box>
      )}

      {estadoJuego === "perdiste" && (
        <Box mt={3}>
          <Typography variant="h5" color="#d32f2f" sx={{ fontWeight: 700, mb: 1 }}>
            ¡Perdiste!
          </Typography>
          <Typography variant="body1" mb={2}>
            La palabra era: <strong>{palabra}</strong>
          </Typography>
          <Button
            variant="contained"
            onClick={() => iniciarJuego(tema, nivel)}
            sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#1565c0" }, mr: 1 }}
          >
            Intentar otra vez
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Ahorcado;
