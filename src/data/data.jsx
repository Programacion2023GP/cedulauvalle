import ultima from '../assets/Ultima.jpg';
import penultima from '../assets/angelpr.mp4';
import antepenultima from '../assets/antepenultima.jpg';
import fosfo from '../assets/fosfo.jpg';

export const memoriesData = [
    {
      id: 1,
      date: '2025-10-15',
      title: 'Célula Uvalle - Noche de Avivamiento',
      description: 'Tuvimos una poderosa noche de avivamiento donde el Espíritu Santo se movió de manera especial. Varias personas recibieron sanidad y liberación.',
      image: ultima,
      type: 'servicio',
      participants: 24,
      verses: 'Salmo 23, Mateo 11:28-30',
      mediaType: 'foto',
      worshipSongs: ['Grande es tu fidelidad', 'Santo Espíritu ven'],
      testimonies: [
        'Juan Pérez compartió cómo Dios lo liberó de adicciones',
        'María Gómez recibió sanidad de dolor de espalda'
      ],
      comments: [
        {user: 'Ana', text: '¡Fue una noche inolvidable!'},
        {user: 'Carlos', text: 'Dios tocó mi corazón profundamente'}
      ]
    },
    {
      id: 2,
      date: '2025-10-08',
      title: 'Estudio Bíblico: Romanos 12',
      description: 'Nuestro hermano Ángel nos guió en un profundo estudio sobre el capítulo 12 de Romanos, enfocándonos en la vida de sacrificio vivo y agradable a Dios.',
      image: penultima,
      type: 'estudio',
      participants: 18,
      verses: 'Romanos 12',
      mediaType: 'video',
      keyPoints: [
        'Presentar nuestros cuerpos como sacrificio vivo',
        'No conformarnos a este siglo',
        'Usar nuestros dones según la gracia dada'
      ],
      comments: [
        {user: 'Pedro', text: 'Excelente enseñanza, muchas gracias'},
        {user: 'Luisa', text: 'Necesitaba escuchar esto hoy'}
      ]
    },
    {
      id: 3,
      date: '2025-10-01',
      title: 'Noche de Oración y Milagros',
      description: 'Dedicamos la noche completa a la oración intercesora por nuestras familias y nación. Vimos respuestas inmediatas a nuestras peticiones.',
      image: antepenultima,
      type: 'servicio',
      participants: 45,
      verses: 'Hebreos 11:1-6',
      mediaType: 'foto',
      prayerTopics: [
        'Sanidad de enfermedades',
        'Restauración familiar',
        'Avivamiento en la iglesia'
      ],
      testimonies: [
        '3 personas recibieron el bautismo del Espíritu Santo',
        'Varios jóvenes se consagraron a Dios'
      ]
    },
    {
      id: 4,
      date: '2025-09-24',
      title: 'Fosfo Uvalle - Unidos en Cristo',
      description: 'Celebramos nuestra primera reunión conjunta con las demás células del sector. Fue un tiempo de comunión, alabanza y enseñanza sobre la unidad en el cuerpo de Cristo.',
      image: fosfo,
      type: 'servicio',
      participants: 45,
      verses: 'Juan 10:1-6, Salmo 133',
      mediaType: 'foto',
      worshipSongs: ['Unidos en Cristo', 'Como ciervo'],
      activities: [
        'Dinámicas de integración',
        'Enseñanza sobre la unidad',
        'Cena de comunión'
      ]
    },
  ];