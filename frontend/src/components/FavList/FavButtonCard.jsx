import { useState } from "react";
import { FavCard } from "./FavCard";

export const FavButtonCard = ({ favorito }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const handleToggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <>
      <button
        onClick={handleToggleExpand}
        className="px-3 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-700"
      >
        {isExpanded ? "Ocultar detalles" : "Ver detalles del vuelo"}
      </button>
      {isExpanded && <FavCard favorito={favorito} />}
      </>
          
        
    
    );
  }
  