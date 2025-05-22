
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
  
  const WorshipIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1rem', height: '1rem' }}>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
  );
export const getIconByType = (type) => {
    switch(type) {
      case 'estudio': return <BibleIcon />;
      case 'servicio': return <ChurchIcon />;
      case 'adoración': return <WorshipIcon />;
      default: return <ChurchIcon />;
    }
  };
  
  export const getColorByType = (type) => {
    switch(type) {
      case 'estudio': return 'secondary';
      case 'servicio': return 'primary';
      case 'adoración': return 'warning';
      default: return 'primary';
    }
  };