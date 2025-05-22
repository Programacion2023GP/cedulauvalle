import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  useTheme,
  useMediaQuery,
  CardMedia,
  Paper,
  Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import ExpandedMemoryDialog from './expandedmemorydialog/ExpandedMemoryDialog';
import TimelineMemoryCard from './timelinememorycard/TimelineMemoryCard';
import { memoriesData } from './data/data';
import { getColorByType, getIconByType } from './utils/functions';
import Games from './games/Games';
import foto22052025 from './assets/foto22052025.jpg';

const MemoriesDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loaded, setLoaded] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleMemoryClick = (memory) => {
    setSelectedMemory(memory);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      pt: isMobile ? 2 : 4,
      pb: 6
    }}>
      {/* Hero Banner */}
      <Paper elevation={0} sx={{ 
        borderRadius: 0,
        overflow: 'hidden',
        position: 'relative',
        mb: 4
      }}>
        <CardMedia
          component="img"
          height="300"
          image={foto22052025}
          sx={{
            width: '100%',
            height: isMobile ? '200px' : '300px',
            objectFit: 'cover',
            filter: 'brightness(0.7)',
          }}
        />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
          color: 'white',
          textAlign: 'center',
          px: 2
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant={isMobile ? 'h4' : 'h3'}
              component="h1"
              sx={{ 
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                mb: 2
              }}
            >
              Célula Uvalle
            </Typography>
            <Typography 
              variant={isMobile ? 'h6' : 'h5'}
              sx={{ 
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Recordando los momentos especiales en la presencia de Dios
            </Typography>
          </motion.div>
        </Box>
      </Paper>

      {/* Main Content */}
      <Container maxWidth="lg">
        {/* Timeline Section */}
        <Box sx={{ 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 4,
          p: isMobile ? 2 : 4,
          boxShadow: theme.shadows[2],
          mb: 6
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 4,
              textAlign: 'center'
            }}
          >
            Nuestra Historia
          </Typography>
          
          <Timeline position={isMobile ? 'right' : 'alternate'} sx={{ p: 0 }}>
            {memoriesData.map((memory, index) => (
              <TimelineItem key={memory.id} sx={{ minHeight: 280 }}>
                <TimelineSeparator>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: loaded ? 1 : 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <TimelineDot 
                      color={getColorByType(memory.type)} 
                      sx={{ 
                        width: 40, 
                        height: 40,
                        boxShadow: theme.shadows[2]
                      }}
                    >
                      {getIconByType(memory.type)}
                    </TimelineDot>
                  </motion.div>
                  {index < memoriesData.length - 1 && (
                    <TimelineConnector sx={{ 
                      backgroundColor: theme.palette.divider,
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
                    <TimelineMemoryCard 
                      memory={memory} 
                      isMobile={isMobile} 
                      index={index} 
                      onClick={() => handleMemoryClick(memory)}
                    />
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>

        {/* Bible Verse Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: memoriesData.length * 0.15 + 0.5 }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mt: 6,
            mb: 6,
            p: 4,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.light,
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            boxShadow: theme.shadows[4],
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'url(/path-to-texture.png)',
              opacity: 0.05,
              zIndex: 0
            }} />
            <Typography variant="h5" component="blockquote" sx={{ 
              fontStyle: 'italic', 
              mb: 2,
              position: 'relative',
              zIndex: 1,
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              lineHeight: 1.6
            }}>
              "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos."
            </Typography>
            <Typography variant="subtitle1" sx={{ 
              position: 'relative', 
              zIndex: 1,
              fontWeight: 500,
              color: theme.palette.primary.contrastText
            }}>
              Mateo 18:20
            </Typography>
          </Box>
        </motion.div>

   
        <Box sx={{ 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 4,
          p: isMobile ? 2 : 4,
          boxShadow: theme.shadows[2],
          mb: 4
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 4,
              textAlign: 'center'
            }}
          >
            Juegos 
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Games />
        </Box>
      </Container>
      
      {selectedMemory && (
        <ExpandedMemoryDialog 
          memory={selectedMemory} 
          open={openDialog} 
          onClose={handleCloseDialog} 
        />
      )}
    </Box>
  );
};

export default MemoriesDashboard;