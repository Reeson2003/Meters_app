import Torch from 'react-native-torch';

export default class Flash {
    toggle = (isOn) => {
        return Torch.switchState(isOn);
    };
}