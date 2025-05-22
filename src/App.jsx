import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import ExpandedMemoryDialog from './expandedmemorydialog/ExpandedMemoryDialog';
import TimelineMemoryCard from './timelinememorycard/TimelineMemoryCard';
import { memoriesData } from './data/data';
import { getColorByType, getIconByType } from './utils/functions';
import Games from './games/Games';

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
    <>
      <Games/>
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
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              fontSize: isMobile ? '2rem' : '3rem'
            }}
          >
            Célula Uvalle
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
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
          boxShadow: 1,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, transparent 100%)`,
            opacity: 0.1,
            zIndex: 0
          }} />
          <Typography variant="body1" sx={{ 
            fontStyle: 'italic', 
            mb: 1,
            position: 'relative',
            zIndex: 1
          }}>
            "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos."
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ position: 'relative', zIndex: 1 }}>
            Mateo 18:20
          </Typography>
        </Box>
      </motion.div>
      
      {selectedMemory && (
        <ExpandedMemoryDialog 
          memory={selectedMemory} 
          open={openDialog} 
          onClose={handleCloseDialog} 
        />
      )}
    </>
  );
};

export default MemoriesDashboard;