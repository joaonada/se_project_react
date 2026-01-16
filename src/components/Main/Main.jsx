import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main ({ weatherData, handleCardClick, clothingItems }) {
    return (
        <ul className="cards__list">
            {clothingItems
                .filter((item) => item.weather === weatherData.type)
                .map((item) => (
                    <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
                ))
            }
        </ul>
    ); 
}

export default Main;
