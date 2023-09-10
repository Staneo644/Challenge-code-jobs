import Head from './template/head';
import SearchJobs from './pages/searchJobs';
import Auth from './pages/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


function App ( ) {
	return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="SearchJobs" component={SearchJobs} />
            </Stack.Navigator>
        </NavigationContainer>
        
	);
		// <Router>
		// 	<Routes>
        //         <Route path="*" Component={Auth}/>
		// 		<Route path="/" element={<Auth></Auth>}/>
		// 		<Route element={Head}>
		// 			<Route path="/recherche-de-travail" element={<SearchJobs></SearchJobs>}/>
		// 		</Route>
		// 	</Routes>
		// </Router>
   

}
export default App;