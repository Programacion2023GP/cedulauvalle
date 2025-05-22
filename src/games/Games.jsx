import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  CardMedia,
  Dialog,
  IconButton
} from "@mui/material";
import { PlayCircleFilled, Close } from "@mui/icons-material";
import ultima from '../assets/Ultima.jpg';
import Ahorcado from './ahorcado/Ahorcado';
import Quiz from './quiz/Quiz';
import MemoramaBiblico from './memorama/Memorama';

const gamesData = [
  {
    id: 1,
    name: "Memorama",
    description: "Encuentra las parejas de personajes y versículos bíblicos",
    image: ultima,
    bgColor: "#f8f5f2",
    message: "¡Prepárate para ejercitar tu memoria con versículos bíblicos!"
  },
  {
    id: 2,
    name: "Ahorcado",
    description: "Adivina palabras bíblicas antes de completar la cruz",
    image: ultima,
    bgColor: "#f0f4f8",
    message: "¡Adivina la palabra antes de que se complete la cruz!"
  },
  {
    id: 3,
    name: "Quiz",
    description: "Pon a prueba tu conocimiento de las Escrituras",
    image: ultima,
    bgColor: "#f5f0f8",
    message: "¿Cuánto sabes de la Biblia? ¡Averígualo ahora!"
  }
];

const GameCard = ({ game, onClick }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        width: 320,
        height: 460,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 2,
        backgroundColor: game.bgColor,
        border: '1px solid #e0e0e0',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
      onClick={onClick}
    >
      <Box sx={{ textAlign: 'center' }}>
        <CardMedia
          component="img"
          image={game.image}
          alt={game.name}
          sx={{ 
            width: '100%', 
            height: 220,
            mb: 3,
            objectFit: 'cover',
            borderRadius: 1,
            border: '1px solid #e0e0e0'
          }}
        />
        <Typography variant="h6" gutterBottom sx={{ 
          fontWeight: 600, 
          color: '#333',
          mb: 1
        }}>
          {game.name}
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#666',
          mb: 3,
          px: 1
        }}>
          {game.description}
        </Typography>
      </Box>
      
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: '#333',
          color: '#fff',
          px: 4,
          py: 1,
          borderRadius: 1,
          fontWeight: 500,
          gap: 1
        }}
      >
        <PlayCircleFilled />
        <Typography variant="button">Jugar</Typography>
      </Box>
    </Paper>
  );
};

const Games = () => {
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleOpen = (game) => {
    setSelectedGame(game);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedGame(null);
  };

  return (
    <>
      <Box 
        display="flex" 
        flexDirection={{ xs: 'column', sm: 'row' }}
        flexWrap="wrap"
        gap={4}
        p={4}
        justifyContent="center"
        alignItems="center"
        sx={{ 
          minHeight: '100vh', 
          bgcolor: '#fafafa',
          backgroundImage: 'linear-gradient(to bottom, #ffffff, #f9f9f9)'
        }}
      >
        {gamesData.map((game) => (
          <GameCard key={game.id} game={game} onClick={() => handleOpen(game)} />
        ))}
      </Box>

      <Dialog fullScreen open={open} onClose={handleClose}>
        <Box sx={{ position: 'relative', p: 4 }}>
          <IconButton 
            onClick={handleClose} 
            sx={{ position: 'absolute', top: 16, right: 16 }}
          >
            <Close />
          </IconButton>
          <Typography width={'full'} textAlign={'center'} variant="h2" gutterBottom>{selectedGame?.name}</Typography>
          <Typography width={'full'} textAlign={'center'} variant="body1" sx={{ fontSize: 20 }}>
            {selectedGame?.message}
          </Typography>
          {selectedGame?.id === 1 && <MemoramaBiblico />}

          {selectedGame?.id === 2 && <Ahorcado />}
          {selectedGame?.id === 3 && <Quiz />}
          
        </Box>
      </Dialog>
    </>
  );
};

export default Games;
