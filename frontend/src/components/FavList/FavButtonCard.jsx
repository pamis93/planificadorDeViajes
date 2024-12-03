import { useState } from "react";
import { FavCard } from "./FavCard";
import { useTranslation } from "react-i18next";

export const FavButtonCard = ({ favorito }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useTranslation();

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <button
                onClick={handleToggleExpand}
                className="px-3 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-700"
            >
                {isExpanded ? t("favHideDetails") : t("favShowDetails")}
            </button>
            {isExpanded && <FavCard favorito={favorito} />}
        </>
    );
};
