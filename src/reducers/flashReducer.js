import FlashActions from '../actions/flashActions'

const FlashReducer = (state, action) => {
    switch (action.type) {
        case FlashActions.TOGGLE_FLASH:
            return {
                ...state,
                isFlashOn:!state.isFlashOn
            }
    }
};