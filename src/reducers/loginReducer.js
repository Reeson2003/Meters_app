import LoginActions from './loginActions';

export default (state, action)=>{
    switch (action) {
        case LoginActions.SIGN_IN:
            return {
                ...state,
                isSignIn: true
            };
        case LoginActions.SIGN_OUT:
            return {
                ...state,
                isSignIn: false
            };
        default:
            return state;
    }
}