import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './views/Home';
import Asteroids from './views/Asteroids';
import Chosen from './views/Chosen';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Home,
      navigationOptions: {
        title: 'Meu Meteoro > Identifique-se'
      }
    },
    Asteroids: {
      screen: Asteroids,
      navigationOptions: {
        title: 'Meu Meteoro > Escolha um meteoro'
      }
    },
    Chosen: {
      screen: Chosen,
      navigationOptions: {
        title: 'Meu Meteoro > Escolhido!'
      }
    }
  }, 
  {
    defaultNavigationOptions: {
      headerTintColor: '#FFF',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: 'green',
      },
    },
  })
);

export default Routes;