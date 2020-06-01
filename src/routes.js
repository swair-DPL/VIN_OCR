import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import Camera from './screens/OCR';
import OCRView from './screens/OCR_View';

const MainStack = createStackNavigator({ Camera, OCRView });

const Routes = createAppContainer(MainStack);

export default Routes;
