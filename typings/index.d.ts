declare module 'react-native-torch' {
    const switchState: (newState: boolean) => Promise<boolean>
    const requestCameraPermission: (title: string, message: string) => Promise<boolean>
}