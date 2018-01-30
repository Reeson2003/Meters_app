import Torch from 'react-native-torch';

export default class Flash {
    turnOn = () => {
        return Torch.switchState(true);
    };

    turnOff = () => {
        return Torch.switchState(false);
    };
}