import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error.jsx"

const requestConfig = {}

export default function Products(){
    const {
        data: loadedMeals,
        isLoading,
        error,
    } = useHttp('/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Fetching Meals...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }

    return (
        <ul id="meals">
            {loadedMeals.map(meal => (
                <MealItem key={meal.id} meal={meal} />
            )
            )}
        </ul>
    )
}