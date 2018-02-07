import FlashActions from './flashActions'

export default (state, action) => {
    switch (action.type) {
        case FlashActions.TOGGLE_FLASH:
            return {
                ...state,
                isFlashOn:!state.isFlashOn
            };
        default:
            return state;
    }
};