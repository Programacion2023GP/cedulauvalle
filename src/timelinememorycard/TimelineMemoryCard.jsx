import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 

  Avatar,
  useTheme,
  Chip,
  Button,

} from '@mui/material';

import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import ImageIcon from '@mui/icons-material/Image';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getColorByType, getIconByType } from '../utils/functions';

const TimelineMemoryCard = ({ memory, isMobile, index, onClick }) => {
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
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 6
          }
        }}
        onClick={onClick}
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
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button 
              size="small" 
              endIcon={<ExpandMoreIcon />}
              sx={{ textTransform: 'none' }}
            >
              Ver más
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };
  export default TimelineMemoryCard;