import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  CardMedia,
  Paper,
  Divider,
  IconButton,
  Grid,
  Chip,
  Button,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Importa tus componentes y datos
import ExpandedMemoryDialog from "./expandedmemorydialog/ExpandedMemoryDialog";
import TimelineMemoryCard from "./timelinememorycard/TimelineMemoryCard";
import { memoriesData } from "./data/data";
import { getColorByType, getIconByType } from "./utils/functions";
import Games from "./games/Games";
import foto22052025 from "./assets/foto22052025.jpg";
import galeria1 from "./assets/gallery/galeria1.jpg";
import galeria2 from "./assets/gallery/galeria2.jpg";
import galeria3 from "./assets/gallery/galeria3.jpg";
import galeria4 from "./assets/gallery/galeria4.jpg";
import galeria5 from "./assets/gallery/galeria5.jpg";
import gvideo1 from "./assets/gallery/gvideo1.mp4";
import gvideo2 from "./assets/gallery/gvideo2.mp4";
import gvideo3 from "./assets/gallery/gvideo3.mp4";
import gvideo4 from "./assets/gallery/gvideo4.mp4";
import gvideo5 from "./assets/gallery/gvideo5.mp4";
// Imágenes de galería (reemplaza con tus imágenes reales)
const galleryImages = [
  { id: 1, img: galeria1, title: "Nuestros comienzos", type: "foto" },
  { id: 2, img: galeria2, title: "Nuestros comienzos", type: "foto" },
  { id: 3, img: galeria3, title: "Nuestros comienzos", type: "foto" },
  { id: 4, img: galeria4, title: "Nuestros comienzos", type: "foto" },
  { id: 5, img: galeria5, title: "Nuestros comienzos", type: "foto" },
  { id: 6, img: gvideo1, title: "Fosfo", type: "video" },
  { id: 7, img: gvideo2, title: "Fosfo", type: "video" },
  { id: 8, img: gvideo3, title: "Fosfo", type: "video" },
  { id: 9, img: gvideo4, title: "Fosfo", type: "video" },
  { id: 10, img: gvideo5, title: "Fosfo", type: "video" },
];

const MemoriesDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        pt: 0,
        pb: 6,
        overflowX: "hidden",
      }}
    >
      {/* Hero Banner */}
      <Box
        sx={{
          height: isMobile ? "60vh" : "70vh",
          position: "relative",
          mb: 6,
        }}
      >
        <CardMedia
          component="img"
          image={foto22052025}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.7)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
            color: "white",
            textAlign: "center",
            px: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              sx={{
                fontWeight: 800,
                textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                mb: 2,
                fontSize: isMobile ? "2.5rem" : "3.5rem",
              }}
            >
              Célula Uvalle
            </Typography>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                fontWeight: 400,
                textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
                maxWidth: "800px",
                mx: "auto",
                mb: 4,
              }}
            >
              Recordando los momentos especiales en la presencia de Dios
            </Typography>
        
          </motion.div>
        </Box>
      </Box>

      {/* Main Content */}
      <>
        {/* Gallery Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 4,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhotoLibraryIcon sx={{ mr: 2, fontSize: "2rem" }} />
            Nuestra Galería de Recuerdos
          </Typography>

          <Box sx={{ position: "relative", px: isMobile ? 0 : 6 }}>
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect={isMobile ? "slide" : "coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={isMobile ? 1.2 : 2.5}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
              style={{
                padding: "20px 0 60px",
                "--swiper-navigation-color": theme.palette.primary.main,
                "--swiper-pagination-color": theme.palette.primary.main,
              }}
            >
              {galleryImages.map((image) => (
                <SwiperSlide key={image.id}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Paper
                      elevation={6}
                      sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      {image.type === "video" ? (
                        <Box
                          sx={{
                            position: "relative",
                            height: isMobile ? "300px" : "400px",
                          }}
                        >
                        <CardMedia
                component="video"
                src={image.img}
                alt={image.title}
                controls
                autoPlay
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              p: 3,
                              background:
                                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{ color: "white", fontWeight: 600 }}
                            >
                              {image.title}
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <CardMedia
                          component="img"
                          image={image.img}
                          alt={image.title}
                          sx={{
                            width: "100%",
                            height: isMobile ? "300px" : "400px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: 3,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "white",
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          {image.title}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <IconButton
              className="swiper-button-prev"
              sx={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "rgba(255,255,255,0.9)",
                "&:hover": {
                  backgroundColor: "white",
                },
                display: isMobile ? "none" : "flex",
              }}
            >
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
            <IconButton
              className="swiper-button-next"
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "rgba(255,255,255,0.9)",
                "&:hover": {
                  backgroundColor: "white",
                },
                display: isMobile ? "none" : "flex",
              }}
            >
              <ChevronRightIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        {/* Timeline Section */}
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            p: isMobile ? 3 : 6,
            boxShadow: theme.shadows[3],
            mb: 8,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 4,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Nuestra Historia
          </Typography>


          <Timeline position={isMobile ? "right" : "alternate"} sx={{ p: 0 }}>
            {memoriesData.map((memory, index) => (
              <TimelineItem key={memory.id} sx={{ minHeight: 300 }}>
                <TimelineSeparator>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: loaded ? 1 : 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <TimelineDot
                      color={getColorByType(memory.type)}
                      sx={{
                        width: 50,
                        height: 50,
                        boxShadow: theme.shadows[4],
                        border: `2px solid ${theme.palette.background.paper}`,
                      }}
                    >
                      {getIconByType(memory.type)}
                    </TimelineDot>
                  </motion.div>
                  {index < memoriesData.length - 1 && (
                    <TimelineConnector
                      sx={{
                        backgroundColor: theme.palette.divider,
                        width: 3,
                        height: loaded ? "auto" : 0,
                        transition: "height 0.5s ease",
                        transitionDelay: `${index * 0.1 + 0.2}s`,
                      }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent sx={{ py: 0, px: isMobile ? 1 : 4 }}>
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isMobile ? 50 : index % 2 === 0 ? 50 : -50,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: index * 0.15,
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
        

        {/* Games Section */}
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            p: isMobile ? 3 : 6,
            boxShadow: theme.shadows[3],
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 6,
              textAlign: "center",
            }}
          >
            Juegos 
          </Typography>
          <Divider sx={{ mb: 6 }} />
          <Games />
        </Box>
      </>

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
