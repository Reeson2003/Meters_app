import Torch from 'react-native-torch'

const toggle = (isOn): Promise<boolean> => {
        return Torch.switchState(isOn)
}

export default toggle