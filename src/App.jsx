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
  Chip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
 import ultima from './assets/Ultima.jpg'
 import penultima from './assets/Penultima.jpg'
 import antepenultima from './assets/antepenultima.jpg'

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

const PrayerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem' }}>
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V8z"/>
  </svg>
);

const WorshipIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem' }}>
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </svg>
);

const memoriesData = [
  {
    id: 1,
    date: '2025-10-14',
    title: 'Cedula',
    description: 'Día completo de reflexión y oración.',
    image: ultima,
    type: 'retiro',
    participants: 24,
    verses: 'Salmo 23, Mateo 11:28-30'
  },
  {
    id: 2,
    date: '2025-10-07',
    title: 'Cedula',
    description: 'Compartio nuestro hermano angel',
    image: penultima,
    type: 'estudio',
    participants: 18,
    verses: 'Romanos 12'
  },
  {
    id: 3,
    date: '2025-09-30',
    title: 'Cedula',
    description: 'Día completo de reflexión y oración.',
    image: antepenultima,
    type: 'servicio',
    participants: 45,
    verses: 'Hebreos 11:1-6'
  },

];

const getIconByType = (type) => {
  switch(type) {
    case 'retiro': return <PrayerIcon />;
    case 'estudio': return <BibleIcon />;
    case 'servicio': return <ChurchIcon />;
    case 'alabanza': return <WorshipIcon />;
    default: return <ChurchIcon />;
  }
};

const getColorByType = (type) => {
  switch(type) {
    case 'retiro': return 'primary';
    case 'estudio': return 'secondary';
    case 'servicio': return 'success';
    case 'alabanza': return 'warning';
    case 'bautismo': return 'info';
    default: return 'primary';
  }
};

const TimelineMemoryCard = ({ memory, isMobile, index }) => {
  const theme = useTheme();
  
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
      <CardMedia
        component="img"
        height="200"
        image={memory.image}
        alt={memory.title}
        sx={{
          objectFit: 'cover',
          filter: 'brightness(0.9)',
          transition: 'filter 0.3s ease',
          '&:hover': {
            filter: 'brightness(1.05)'
          }
        }}
      />
      <CardContent sx={{ position: 'relative' }}>
        <Box sx={{ 
          position: 'absolute', 
          top: -20, 
          right: 20,
          bgcolor: theme.palette.background.paper,
          borderRadius: '50%',
          p: 1,
          boxShadow: 3
        }}>
          <Avatar sx={{ 
            bgcolor: `${theme.palette[getColorByType(memory.type)].main}`, 
            width: 40, 
            height: 40 
          }}>
            {getIconByType(memory.type)}
          </Avatar>
        </Box>
        
        <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 1, fontWeight: 600 }}>
          {memory.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {memory.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1 }}>
            {new Date(memory.date).toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
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
            Línea del Tiempo Espiritual
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