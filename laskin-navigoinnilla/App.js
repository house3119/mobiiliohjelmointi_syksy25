import LaskinComponent from "./components/LaskinComponent";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoriaComponent from "./components/HistoriaComponent";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Laskin" component={LaskinComponent} />
        <Stack.Screen name="Historia" component={HistoriaComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


