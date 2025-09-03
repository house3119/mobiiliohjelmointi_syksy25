import CalculatorComponent from "./components/CalculatorComponent";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryComponent from "./components/HistoryComponent";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorComponent} />
        <Stack.Screen name="History" component={HistoryComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


