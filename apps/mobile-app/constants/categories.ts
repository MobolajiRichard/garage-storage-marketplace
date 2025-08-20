import { IMAGES } from "@/assets/images";
import { ImageSourcePropType } from "react-native";

export type CategoryProps = {
    name:string;
    id:string;
    image: ImageSourcePropType
}
export const categories = [
    {
        name:"Car Garage",
        id:"car",
        image: IMAGES.carGarage
    },
    {
        name:"Bike Storage",
        id:"bike",
        image: IMAGES.motorbikeGarage
    },
    {
        name:"Household Storage",
        id:"household",
        image: IMAGES.householdGarage
    },
    {
        name:"Large Vehicle Storage",
        id:"large",
        image: IMAGES.largeVehicleStorage
    },
]