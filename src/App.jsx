import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Container,
  Avatar,
  useTheme,
  useMediaQuery,
  Chip,
  IconButton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import ImageIcon from '@mui/icons-material/Image';
import ultima from './assets/Ultima.jpg';
import penultima from './assets/angelpr.mp4';
import antepenultima from './assets/antepenultima.jpg';
import fosfo from './assets/antepenultima.jpg';

// Iconos personalizados (SVG)
const BibleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem' }}>
    <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h5v5l2-2 2 2V4h3v16z"/>
  </svg>
);

const ChurchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem' }}>
    <path d="M18 12.22V9l-5-2.5V5h2V3h-2V1h-2v2H9v2h2v1.5L6 9v3.22L2 14v8h9v-4c0-.55.45-1 1-1s1 .45 1 1v4h9v-8l-4-1.78zM12 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
);

const memoriesData = [
  {
    id: 1,
    date: '2025-10-15', // Cambiado a miércoles
    title: 'Célula Uvalle',
    description: 'Día completo de reflexión y oración.',
    image: ultima,
    type: 'servicio',
    participants: 24,
    verses: 'Salmo 23, Mateo 11:28-30',
    mediaType: 'foto' // Nuevo campo para tipo de medio
  },
  {
    id: 2,
    date: '2025-10-08', // Cambiado a miércoles
    title: 'Célula Uvalle',
    description: 'Compartió nuestro hermano Ángel',
    image: penultima,
    type: 'estudio',
    participants: 18,
    verses: 'Romanos 12',
    mediaType: 'video'
  },
  {
    id: 3,
    date: '2025-10-01', // Cambiado a miércoles
    title: 'Célula Uvalle',
    description: 'Día completo de reflexión y oración.',
    image: antepenultima,
    type: 'servicio',
    participants: 45,
    verses: 'Hebreos 11:1-6',
    mediaType: 'foto'
  },
  {
    id: 4,
    date: '2025-09-24', // Cambiado a miércoles
    title: 'Fosfo Uvalle',
    description: 'Unión de las ramas en casa Uvalle',
    image: fosfo,
    type: 'servicio',
    participants: 45,
    verses: 'Juan 10:1-6',
    mediaType: 'foto'
  },
];

const getIconByType = (type) => {
  switch(type) {
    case 'estudio': return <BibleIcon />;
    case 'servicio': return <ChurchIcon />;
    default: return <ChurchIcon />;
  }
};

const getColorByType = (type) => {
  switch(type) {
    case 'estudio': return 'secondary';
    case 'servicio': return 'primary';
    default: return 'primary';
  }
};

const TimelineMemoryCard = ({ memory, isMobile, index }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card 
      sx={{ 
        mb: 3, 
        boxShadow: 3,
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          height: 200,
          overflow: 'hidden'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {memory.mediaType === 'video' ? (
          <>
            <CardMedia
              component="video"
              src={memory.image}
              alt={memory.title}
              controls
              muted
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {!isHovered && (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}>
                <PlayCircleFilledIcon 
                  sx={{ 
                    color: 'white', 
                    fontSize: '4rem',
                    textShadow: '0 0 10px rgba(0,0,0,0.5)'
                  }} 
                />
              </Box>
            )}
          </>
        ) : (
          <CardMedia
            component="img"
            height="200"
            image={memory.image}
            alt={memory.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.9)',
              transition: 'filter 0.3s ease',
              '&:hover': {
                filter: 'brightness(1.05)'
              }
            }}
          />
        )}
      </Box>
      
      {/* Resto del componente permanece igual */}
      <CardContent sx={{ position: 'relative' }}>
        <Box sx={{ 
          position: 'absolute', 
          top: -20, 
          right: 20,
          bgcolor: theme.palette.background.paper,
          borderRadius: '50%',
          p: 1,
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center'
        }}>
          <Avatar sx={{ 
            bgcolor: `${theme.palette[getColorByType(memory.type)].main}`, 
            width: 40, 
            height: 40 
          }}>
            {getIconByType(memory.type)}
          </Avatar>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Chip 
            icon={memory.mediaType === 'video' ? <PlayCircleFilledIcon /> : <ImageIcon />}
            label={memory.mediaType === 'video' ? 'Video' : 'Foto'}
            size="small"
            color={memory.mediaType === 'video' ? 'secondary' : 'primary'}
            sx={{ mr: 1 }}
          />
        </Box>
        
        <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 1, fontWeight: 600 }}>
          {memory.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {memory.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1 }}>
            {formatDate(memory.date)}
          </Typography>
          <Chip 
            label={`${memory.participants} participantes`} 
            size="small" 
            sx={{ ml: 'auto' }}
          />
        </Box>
        
        {memory.verses && (
          <Box sx={{ 
            mt: 1,
            p: 1,
            borderRadius: 1,
            bgcolor: 'action.hover',
            borderLeft: `3px solid ${theme.palette[getColorByType(memory.type)].main}`
          }}>
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              "Versículos: {memory.verses}"
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const MemoriesDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.dark,
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Célula Uvalle
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Recordando los momentos especiales en la presencia de Dios
          </Typography>
        </motion.div>
      </Box>

      <Timeline position={isMobile ? 'right' : 'alternate'} sx={{ p: 0 }}>
        {memoriesData.map((memory, index) => (
          <TimelineItem key={memory.id} sx={{ minHeight: 280 }}>
            <TimelineSeparator>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: loaded ? 1 : 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <TimelineDot color={getColorByType(memory.type)} sx={{ width: 40, height: 40 }}>
                  {getIconByType(memory.type)}
                </TimelineDot>
              </motion.div>
              {index < memoriesData.length - 1 && (
                <TimelineConnector sx={{ 
                  bgcolor: theme.palette.primary.light,
                  width: 2,
                  height: loaded ? 'auto' : 0,
                  transition: 'height 0.5s ease',
                  transitionDelay: `${index * 0.1 + 0.2}s`
                }} />
              )}
            </TimelineSeparator>
            <TimelineContent sx={{ py: 0 }}>
              <motion.div
                initial={{ opacity: 0, x: isMobile ? 50 : index % 2 === 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                  delay: index * 0.15
                }}
              >
                <TimelineMemoryCard memory={memory} isMobile={isMobile} index={index} />
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: memoriesData.length * 0.15 + 0.5 }}
      >
        <Box sx={{ 
          textAlign: 'center', 
          mt: 6, 
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 1
        }}>
          <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 1 }}>
            "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos."
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Mateo 18:20
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default MemoriesDashboard;