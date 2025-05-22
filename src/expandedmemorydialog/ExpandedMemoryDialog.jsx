import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  CardMedia, 

  Avatar,
  useTheme,
  useMediaQuery,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Paper
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PrayerIcon from '@mui/icons-material/EmojiPeople';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getColorByType, getIconByType } from '../utils/functions';
const ExpandedMemoryDialog = ({ memory, open, onClose }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: theme.palette[getColorByType(memory.type)].light, 
          color: theme.palette.getContrastText(theme.palette[getColorByType(memory.type)].light),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ 
              bgcolor: theme.palette[getColorByType(memory.type)].dark, 
              mr: 2,
              width: 40, 
              height: 40 
            }}>
              {getIconByType(memory.type)}
            </Avatar>
            <Typography variant="h6">{memory.title}</Typography>
          </Box>
          <IconButton onClick={onClose} color="inherit">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ position: 'relative', height: isMobile ? 250 : 400 }}>
            {memory.mediaType === 'video' ? (
              <CardMedia
                component="video"
                src={memory.image}
                alt={memory.title}
                controls
                autoPlay
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <CardMedia
                component="img"
                height={isMobile ? 250 : 400}
                image={memory.image}
                alt={memory.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            )}
          </Box>
          
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" paragraph>
              {memory.description}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Chip 
                icon={<CalendarTodayIcon />}
                label={formatDate(memory.date)}
                variant="outlined"
              />
              {/* <Chip 
                icon={<PeopleIcon />}
                label={`${memory.participants} participantes`}
                variant="outlined"
              /> */}
              <Chip 
                icon={<MenuBookIcon />}
                label={`Versículos: ${memory.verses}`}
                variant="outlined"
              />
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            {memory.worshipSongs && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <MusicNoteIcon sx={{ mr: 1 }} /> Canciones de alabanza
                </Typography>
                <List dense>
                  {memory.worshipSongs.map((song, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <MusicNoteIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={song} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            
            {memory.keyPoints && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <BibleIcon sx={{ mr: 1 }} /> Puntos clave del estudio
                </Typography>
                <List dense>
                  {memory.keyPoints.map((point, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Typography color="primary">{index + 1}.</Typography>
                      </ListItemIcon>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            
            {memory.prayerTopics && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <PrayerIcon sx={{ mr: 1 }} /> Temas de oración
                </Typography>
                <List dense>
                  {memory.prayerTopics.map((topic, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <PrayerIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={topic} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            
            {/* {memory.testimonies && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CommentIcon sx={{ mr: 1 }} /> Testimonios
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                  {memory.testimonies.map((testimony, index) => (
                    <Typography key={index} paragraph sx={{ mb: 1, fontStyle: 'italic' }}>
                      • {testimony}
                    </Typography>
                  ))}
                </Paper>
              </Box>
            )} */}
            
            {/* {memory.comments && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CommentIcon sx={{ mr: 1 }} /> Comentarios
                </Typography>
                <List dense>
                  {memory.comments.map((comment, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography component="span" fontWeight="bold" color="primary">
                              {comment.user}:
                            </Typography>{' '}
                            {comment.text}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )} */}
          </Box>
        </DialogContent>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          p: 2, 
          bgcolor: 'background.paper',
          borderTop: `1px solid ${theme.palette.divider}`
        }}>
          {/* <Button startIcon={<FavoriteIcon />} color="error">
            Me gusta
          </Button>
          <Button startIcon={<CommentIcon />}>
            Comentar
          </Button>
          <Button startIcon={<ShareIcon />}>
            Compartir
          </Button> */}
        </Box>
      </Dialog>
    );
  };
  export default ExpandedMemoryDialog;