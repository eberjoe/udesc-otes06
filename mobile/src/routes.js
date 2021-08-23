import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './views/Home';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Home,
      navigationOptions: {
        title: 'My Asteroid'
      }
    }
  })
);

export default Routes;