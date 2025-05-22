import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Grid,
  Paper,
  Card,
  CardContent,
  Stack
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const preguntas = [
    {
        pregunta: "¿Quién construyó el arca?",
        opciones: ["Moisés", "Noé", "Abraham", "David"],
        respuesta: "Noé",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Qué dividió Moisés con su vara?",
        opciones: ["Río Jordán", "Mar Rojo", "Río Nilo", "Lago de Galilea"],
        respuesta: "Mar Rojo",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Qué cayó del cielo para alimentar a los israelitas?",
        opciones: ["Pan", "Agua", "Maná", "Leche"],
        respuesta: "Maná",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién fue vendido por sus hermanos como esclavo?",
        opciones: ["Judá", "Rubén", "José", "Benjamín"],
        respuesta: "José",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién derrotó al gigante Goliat?",
        opciones: ["Saúl", "David", "Sansón", "Jonatán"],
        respuesta: "David",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién fue el primer hombre creado por Dios?",
        opciones: ["Caín", "Abel", "Set", "Adán"],
        respuesta: "Adán",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿De qué árbol no podían comer Adán y Eva?",
        opciones: ["Del conocimiento del bien y del mal", "De la vida", "De los frutos", "De la sabiduría"],
        respuesta: "Del conocimiento del bien y del mal",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién fue la primera mujer?",
        opciones: ["María", "Sara", "Eva", "Rebeca"],
        respuesta: "Eva",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Cuántos días tardó Dios en crear el mundo?",
        opciones: ["5", "6", "7", "8"],
        respuesta: "6",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Qué día descansó Dios?",
        opciones: ["Sexto", "Séptimo", "Octavo", "Quinto"],
        respuesta: "Séptimo",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién mató a Abel?",
        opciones: ["Set", "Adán", "Caín", "Enoc"],
        respuesta: "Caín",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿A qué edad tuvo Abraham a Isaac?",
        opciones: ["80", "90", "100", "110"],
        respuesta: "100",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Cómo se llamaba la esposa de Abraham?",
        opciones: ["Rebeca", "Sara", "Lea", "Raquel"],
        respuesta: "Sara",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién fue el hijo de la promesa de Abraham?",
        opciones: ["Ismael", "Isaac", "Jacob", "José"],
        respuesta: "Isaac",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién tuvo un sueño con una escalera al cielo?",
        opciones: ["José", "Jacob", "Isaac", "Abraham"],
        respuesta: "Jacob",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Cómo se llamó Jacob después de luchar con el ángel?",
        opciones: ["Israel", "Judá", "Efraín", "Manasés"],
        respuesta: "Israel",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Cuántos hijos tuvo Jacob?",
        opciones: ["10", "11", "12", "13"],
        respuesta: "12",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién fue el hermano favorito de José?",
        opciones: ["Rubén", "Judá", "Benjamín", "Leví"],
        respuesta: "Benjamín",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿En qué país se convirtió José en gobernador?",
        opciones: ["Canaán", "Egipto", "Babilonia", "Asiria"],
        respuesta: "Egipto",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién encontró a Moisés en una canasta en el río?",
        opciones: ["La hija del Faraón", "Su madre", "Su hermana", "Una sirvienta"],
        respuesta: "La hija del Faraón",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Cómo se llamaba el hermano de Moisés?",
        opciones: ["Aarón", "Josué", "Caleb", "Hur"],
        respuesta: "Aarón",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Cómo se llamaba la hermana de Moisés?",
        opciones: ["María", "Débora", "Ester", "Rut"],
        respuesta: "María",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿En qué monte murió Moisés?",
        opciones: ["Sinaí", "Nebo", "Horeb", "Carmelo"],
        respuesta: "Nebo",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién sucedió a Moisés como líder de Israel?",
        opciones: ["Aarón", "Caleb", "Josué", "Eleazar"],
        respuesta: "Josué",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Qué ciudad conquistaron primero los israelitas en la Tierra Prometida?",
        opciones: ["Jerusalén", "Jericó", "Hebrón", "Betel"],
        respuesta: "Jericó",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién fue la primera jueza de Israel?",
        opciones: ["Ester", "Rut", "Débora", "Ana"],
        respuesta: "Débora",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Qué juez de Israel tenía una fuerza sobrenatural?",
        opciones: ["Gedeón", "Sansón", "Jefté", "Samuel"],
        respuesta: "Sansón",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién cortó el cabello de Sansón?",
        opciones: ["Débora", "Dalila", "Rut", "Ester"],
        respuesta: "Dalila",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién fue el último juez de Israel?",
        opciones: ["Sansón", "Samuel", "Eli", "Gedeón"],
        respuesta: "Samuel",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién fue el primer rey de Israel?",
        opciones: ["David", "Salomón", "Saúl", "Samuel"],
        respuesta: "Saúl",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién ungió a David como rey?",
        opciones: ["Eli", "Samuel", "Natán", "Gad"],
        respuesta: "Samuel",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Con qué mató David a Goliat?",
        opciones: ["Espada", "Lanza", "Honda", "Arco"],
        respuesta: "Honda",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién era el mejor amigo de David?",
        opciones: ["Absalón", "Jonatán", "Salomón", "Natán"],
        respuesta: "Jonatán",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Cómo se llamaba la esposa de David que había sido de Urías?",
        opciones: ["Abigail", "Betsabé", "Mical", "Tamar"],
        respuesta: "Betsabé",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién fue el hijo de David que se rebeló contra él?",
        opciones: ["Salomón", "Absalón", "Adonías", "Amnón"],
        respuesta: "Absalón",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién sucedió a David como rey?",
        opciones: ["Absalón", "Adonías", "Salomón", "Roboam"],
        respuesta: "Salomón",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Qué pidió Salomón a Dios?",
        opciones: ["Riquezas", "Sabiduría", "Poder", "Larga vida"],
        respuesta: "Sabiduría",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Qué construyó Salomón para Dios?",
        opciones: ["Un altar", "Un templo", "Un palacio", "Una ciudad"],
        respuesta: "Un templo",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Qué reina visitó a Salomón para probar su sabiduría?",
        opciones: ["Reina de Saba", "Reina Ester", "Reina Jezabel", "Reina Atalía"],
        respuesta: "Reina de Saba",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿En cuántas partes se dividió el reino después de Salomón?",
        opciones: ["2", "3", "4", "5"],
        respuesta: "2",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Cómo se llamaron los dos reinos divididos?",
        opciones: ["Israel y Judá", "Norte y Sur", "Efraín y Judá", "Samaria y Jerusalén"],
        respuesta: "Israel y Judá",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién fue arrebatado al cielo en un torbellino?",
        opciones: ["Enoc", "Elías", "Eliseo", "Ezequiel"],
        respuesta: "Elías",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién recibió el manto de Elías?",
        opciones: ["Samuel", "Eliseo", "Jeremías", "Isaías"],
        respuesta: "Eliseo",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Qué rey de Judá destruyó los ídolos y reformó el culto?",
        opciones: ["Josías", "Ezequías", "Asa", "Josafat"],
        respuesta: "Josías",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Qué imperio conquistó el reino del norte (Israel)?",
        opciones: ["Babilonia", "Asiria", "Persia", "Egipto"],
        respuesta: "Asiria",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Qué imperio conquistó el reino del sur (Judá)?",
        opciones: ["Asiria", "Babilonia", "Persia", "Grecia"],
        respuesta: "Babilonia",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Cuántos años duró el cautiverio babilónico?",
        opciones: ["40", "50", "70", "80"],
        respuesta: "70",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién autorizó el regreso de los judíos a Jerusalén?",
        opciones: ["Nabucodonosor", "Ciro", "Darío", "Artajerjes"],
        respuesta: "Ciro",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién dirigió la reconstrucción del templo?",
        opciones: ["Esdras", "Nehemías", "Zorobabel", "Hageo"],
        respuesta: "Zorobabel",
        categoria: "Antiguo Testamento"
      },
      {
        pregunta: "¿Quién reconstruyó los muros de Jerusalén?",
        opciones: ["Esdras", "Nehemías", "Zorobabel", "Malaquías"],
        respuesta: "Nehemías",
        categoria: "Antiguo Testamento"
      },
    
      // NUEVO TESTAMENTO
      {
        pregunta: "¿Dónde nació Jesús?",
        opciones: ["Jerusalén", "Belén", "Nazaret", "Egipto"],
        respuesta: "Belén",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cuántos libros tiene el Nuevo Testamento?",
        opciones: ["39", "27", "66", "33"],
        respuesta: "27",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Quién traicionó a Jesús?",
        opciones: ["Pedro", "Tomás", "Judas", "Juan"],
        respuesta: "Judas",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué apóstol negó a Jesús tres veces?",
        opciones: ["Juan", "Pedro", "Pablo", "Santiago"],
        respuesta: "Pedro",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cuál fue el primer milagro de Jesús?",
        opciones: [
          "Multiplicar los panes",
          "Sanar a un ciego",
          "Caminar sobre el agua",
          "Convertir agua en vino"
        ],
        respuesta: "Convertir agua en vino",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Quién anunció a María que tendría un hijo?",
        opciones: ["Miguel", "Gabriel", "Rafael", "Uriel"],
        respuesta: "Gabriel",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cómo se llamaba el esposo de María?",
        opciones: ["Juan", "José", "Pedro", "Andrés"],
        respuesta: "José",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué pastor recibió el anuncio del nacimiento de Jesús?",
        opciones: ["Los pastores de Belén", "Los de Nazaret", "Los de Jerusalén", "Los de Egipto"],
        respuesta: "Los pastores de Belén",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué siguieron los magos del oriente?",
        opciones: ["Un ángel", "Una estrella", "Una nube", "Un sueño"],
        respuesta: "Una estrella",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cuántos magos vinieron a adorar a Jesús?",
        opciones: ["2", "3", "4", "No se especifica"],
        respuesta: "No se especifica",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué regalos trajeron los magos?",
        opciones: ["Oro, plata y bronce", "Oro, incienso y mirra", "Oro, especias y perfumes", "Oro, joyas y telas"],
        respuesta: "Oro, incienso y mirra",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué rey quería matar al niño Jesús?",
        opciones: ["Herodes", "Pilato", "César", "Antipas"],
        respuesta: "Herodes",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿A qué país huyó la familia de Jesús?",
        opciones: ["Siria", "Egipto", "Grecia", "Roma"],
        respuesta: "Egipto",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿A qué edad encontraron a Jesús en el templo?",
        opciones: ["10 años", "12 años", "15 años", "16 años"],
        respuesta: "12 años",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Quién bautizó a Jesús?",
        opciones: ["Juan el Bautista", "Pedro", "Juan el apóstol", "Santiago"],
        respuesta: "Juan el Bautista",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿En qué río fue bautizado Jesús?",
        opciones: ["Nilo", "Jordán", "Éufrates", "Mar Rojo"],
        respuesta: "Jordán",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué descendió sobre Jesús en su bautismo?",
        opciones: ["Una nube", "Fuego", "El Espíritu Santo", "Un ángel"],
        respuesta: "El Espíritu Santo",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cuánto tiempo ayunó Jesús en el desierto?",
        opciones: ["30 días", "40 días", "50 días", "70 días"],
        respuesta: "40 días",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Quién tentó a Jesús en el desierto?",
        opciones: ["Un demonio", "Satanás", "Un ángel caído", "El diablo"],
        respuesta: "Satanás",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cuáles fueron los primeros discípulos llamados por Jesús?",
        opciones: ["Pedro y Juan", "Santiago y Juan", "Pedro y Andrés", "Mateo y Lucas"],
        respuesta: "Pedro y Andrés",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué profesión tenían Pedro y Andrés?",
        opciones: ["Carpinteros", "Pescadores", "Pastores", "Comerciantes"],
        respuesta: "Pescadores",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cómo se llamaba el discípulo que era recaudador de impuestos?",
        opciones: ["Mateo", "Lucas", "Marcos", "Juan"],
        respuesta: "Mateo",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cuál era el otro nombre de Pedro?",
        opciones: ["Cefas", "Simón", "Ambos son correctos", "Ninguno"],
        respuesta: "Ambos son correctos",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Quiénes eran los 'hijos del trueno'?",
        opciones: ["Pedro y Andrés", "Santiago y Juan", "Felipe y Bartolomé", "Tomás y Mateo"],
        respuesta: "Santiago y Juan",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Quién era conocido como 'el discípulo amado'?",
        opciones: ["Pedro", "Juan", "Santiago", "Andrés"],
        respuesta: "Juan",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué discípulo dudó de la resurrección de Jesús?",
        opciones: ["Pedro", "Juan", "Tomás", "Felipe"],
        respuesta: "Tomás",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿En qué monte se transfiguró Jesús?",
        opciones: ["Sinaí", "Hermón", "Tabor", "Carmelo"],
        respuesta: "Tabor",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Quiénes aparecieron con Jesús en la transfiguración?",
        opciones: ["Abraham y David", "Moisés y Elías", "Isaías y Jeremías", "Aarón y Samuel"],
        respuesta: "Moisés y Elías",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿En qué ciudad hizo Jesús su entrada triunfal?",
        opciones: ["Belén", "Nazaret", "Jerusalén", "Capernaum"],
        respuesta: "Jerusalén",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿En qué animal entró Jesús a Jerusalén?",
        opciones: ["Caballo", "Camello", "Burro", "Mula"],
        respuesta: "Burro",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué gritaba la gente cuando Jesús entró a Jerusalén?",
        opciones: ["Aleluya", "Hosanna", "Gloria", "Bendito"],
        respuesta: "Hosanna",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Dónde celebró Jesús la última cena?",
        opciones: ["En el templo", "En un aposento alto", "En una casa", "En el monte"],
        respuesta: "En un aposento alto",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué lavó Jesús a sus discípulos en la última cena?",
        opciones: ["Las manos", "Los pies", "La cara", "La cabeza"],
        respuesta: "Los pies",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué instituyó Jesús en la última cena?",
        opciones: ["El bautismo", "La comunión", "La oración", "El ayuno"],
        respuesta: "La comunión",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Dónde oró Jesús antes de ser arrestado?",
        opciones: ["En el templo", "En Getsemaní", "En el monte", "En casa"],
        respuesta: "En Getsemaní",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cómo identificó Judas a Jesús para arrestarlo?",
        opciones: ["Señalándolo", "Con un beso", "Gritando su nombre", "Con una señal"],
        respuesta: "Con un beso",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Quién cortó la oreja del siervo del sumo sacerdote?",
        opciones: ["Juan", "Santiago", "Pedro", "Andrés"],
        respuesta: "Pedro",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cómo se llamaba el siervo al que Pedro cortó la oreja?",
        opciones: ["Malco", "Cleofas", "Bartimeo", "Zaqueo"],
        respuesta: "Malco",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Ante quién fue llevado Jesús primero?",
        opciones: ["Pilato", "Herodes", "Anás", "Caifás"],
        respuesta: "Anás",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Quién era el sumo sacerdote en el juicio de Jesús?",
        opciones: ["Anás", "Caifás", "Eleazar", "Esdras"],
        respuesta: "Caifás",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué gobernador romano condenó a Jesús?",
        opciones: ["Félix", "Festo", "Pilato", "Herodes"],
        respuesta: "Pilato",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿A quién liberó Pilato en lugar de Jesús?",
        opciones: ["Barrabás", "Simón", "José", "Juan"],
        respuesta: "Barrabás",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué escribió Pilato en la cruz de Jesús?",
        opciones: ["Rey de los judíos", "Hijo de Dios", "Jesús de Nazaret, Rey de los judíos", "El Cristo"],
        respuesta: "Jesús de Nazaret, Rey de los judíos",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Entre quiénes fue crucificado Jesús?",
        opciones: ["Dos profetas", "Dos ladrones", "Dos soldados", "Dos discípulos"],
        respuesta: "Dos ladrones",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cuántas horas estuvo Jesús en la cruz?",
        opciones: ["3", "6", "9", "12"],
        respuesta: "6",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué gritó Jesús antes de morir?",
        opciones: ["Consumado es", "Padre, perdónalos", "Dios mío, ¿por qué me has desamparado?", "En tus manos encomiendo mi espíritu"],
        respuesta: "Consumado es",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Qué se rasgó cuando Jesús murió?",
        opciones: ["El cielo", "La tierra", "El velo del templo", "Las rocas"],
        respuesta: "El velo del templo",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Quién pidió el cuerpo de Jesús?",
        opciones: ["Pedro", "Juan", "José de Arimatea", "Nicodemo"],
        respuesta: "José de Arimatea",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿En qué día de la semana resucitó Jesús?",
        opciones: ["Sábado", "Domingo", "Lunes", "Viernes"],
        respuesta: "Domingo",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Quién fue la primera persona en ver a Jesús resucitado?",
        opciones: ["Pedro", "Juan", "María Magdalena", "María y Marta"],
        respuesta: "María Magdalena",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Con cuántos discípulos se apareció Jesús en el camino a Emaús?",
        opciones: ["1", "2", "3", "4"],
        respuesta: "2",
        categoria: "Nuevo Testamento"
      },
      {
        pregunta: "¿Cuántos días estuvo Jesús en la tierra después de resucitar?",
        opciones: ["30", "40", "50", "70"],
        respuesta: "40",
        categoria: "Nuevo Testamento"
      }
];

const QuizBiblico = () => {
    const [preguntasDisponibles, setPreguntasDisponibles] = useState([...preguntas]);
    const [preguntaActual, setPreguntaActual] = useState(null);
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [tiempo, setTiempo] = useState(30);
    const [tiempoRestante, setTiempoRestante] = useState(30);
    const [estadoJuego, setEstadoJuego] = useState("inicio");
    const [puntaje, setPuntaje] = useState(0);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
    const [bloqueoRespuesta, setBloqueoRespuesta] = useState(false);
  
    // Extrae y elimina una pregunta aleatoria del array
    const extraerPregunta = (arr) => {
      const i = Math.floor(Math.random() * arr.length);
      return arr.splice(i, 1)[0];
    };
  
    const iniciarJuego = () => {
      const copia = [...preguntas];
      const aleatoria = extraerPregunta(copia);
      setPreguntasDisponibles(copia);
      setPreguntaActual(aleatoria);
      setIndicePregunta(1);
      setTiempo(30);
      setTiempoRestante(30);
      setEstadoJuego("jugando");
      setPuntaje(0);
      setRespuestaSeleccionada(null);
      setBloqueoRespuesta(false);
    };
  
    useEffect(() => {
      if (estadoJuego !== "jugando" || bloqueoRespuesta) return;
  
      if (tiempoRestante === 0) {
        setEstadoJuego("perdiste");
        return;
      }
  
      const interval = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [tiempoRestante, estadoJuego, bloqueoRespuesta]);
  
    const manejarRespuesta = (opcion) => {
        if (opcion === preguntaActual.respuesta) {
          if (preguntasDisponibles.length === 0) {
            setEstadoJuego("ganaste");
          } else {
            const siguiente = extraerPregunta(preguntasDisponibles);
            const bloque = Math.floor(indicePregunta / 10);
            const nuevoTiempo = Math.max(5, 30 - bloque * 2);
            setPreguntaActual(siguiente);
            setIndicePregunta((prev) => prev + 1);
            setTiempo(nuevoTiempo);
            setTiempoRestante(nuevoTiempo);
          }
        } else {
          setEstadoJuego("perdiste");
        }
      };
      
  
    // Color del botón según si es respuesta seleccionada y si es correcta o incorrecta
    const getColor = (opcion) => {
      if (!respuestaSeleccionada) return "primary";
      if (opcion === preguntaActual.respuesta) return "success";
      if (opcion === respuestaSeleccionada) return "error";
      return "primary";
    };
  
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f0f4f8"
        p={2}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, maxWidth: 600, width: "100%" }}>
          <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
            📖 Quiz Bíblico
          </Typography>
  
          {estadoJuego === "inicio" && (
            <Stack spacing={2} alignItems="center">
              <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth={400}>
                Responde correctamente cada pregunta antes de que se acabe el tiempo.
              </Typography>
              <Button variant="contained" size="large" onClick={iniciarJuego}>
                Comenzar
              </Button>
            </Stack>
          )}
  
          {estadoJuego === "jugando" && preguntaActual && (
            <>
              <LinearProgress
                variant="determinate"
                value={(tiempoRestante / tiempo) * 100}
                sx={{
                  mb: 2,
                  height: 12,
                  borderRadius: 5,
                  transition: "width 0.5s ease-out",
                }}
                color={tiempoRestante <= 3 ? "error" : "primary"}
              />
              <Typography
                variant="subtitle2"
                gutterBottom
                textAlign="right"
                color={tiempoRestante <= 3 ? "error" : "text.secondary"}
                fontWeight={700}
              >
                Tiempo: {tiempoRestante}s
              </Typography>
              <Typography variant="subtitle1" mb={1} fontWeight="bold" textAlign="center">
                Pregunta {indicePregunta} / {indicePregunta + preguntasDisponibles.length}
              </Typography>
              <Typography variant="subtitle1" mb={3} fontWeight="bold" textAlign="center" color="primary.main">
                Puntaje: {puntaje}
              </Typography>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {preguntaActual.pregunta}
                  </Typography>
                  <Grid container spacing={2}>
                    {preguntaActual.opciones.map((op, i) => (
                      <Grid item xs={12} sm={6} key={i}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color={getColor(op)}
                          disabled={bloqueoRespuesta}
                          onClick={() => manejarRespuesta(op)}
                          sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: 2,
                            ":hover": bloqueoRespuesta ? {} : { backgroundColor: "#e3f2fd" },
                          }}
                        >
                          {op}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </>
          )}
  
          {estadoJuego === "perdiste" && (
            <Box textAlign="center" animation="fadeIn 0.5s ease-in">
              <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: "#ef5350", mb: 1 }} />
              <Typography variant="h5" color="error" fontWeight={700} gutterBottom>
                ¡Perdiste! 😢
              </Typography>
              <Typography variant="body1" mb={2}>
                ¡No te preocupes, inténtalo de nuevo!
              </Typography>
              <Typography variant="body2" mb={2}>
                Puntaje final: {puntaje}
              </Typography>
              <Button variant="contained" onClick={iniciarJuego}>
                Reintentar
              </Button>
            </Box>
          )}
  
          {estadoJuego === "ganaste" && (
            <Box textAlign="center" animation="fadeIn 0.5s ease-in">
              <EmojiEventsIcon sx={{ fontSize: 60, color: "#43a047", mb: 1 }} />
              <Typography variant="h5" color="success.main" fontWeight={700} gutterBottom>
                ¡Ganaste el Quiz! 🎉
              </Typography>
              <Typography variant="body1" mb={2}>
                ¡Eres un experto en la Biblia!
              </Typography>
              <Typography variant="body2" mb={2}>
                Puntaje final: {puntaje}
              </Typography>
              <Button variant="contained" onClick={iniciarJuego}>
                Jugar otra vez
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    );
  };
export default QuizBiblico;
