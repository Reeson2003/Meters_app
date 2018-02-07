import Torch from 'react-native-torch'

export default class Flash {
    static toggle = (isOn): Promise<boolean> => {
        return Torch.switchState(isOn)
    }
}