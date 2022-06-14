import produce from 'immer';

const INITIAL_STATE = {
    type: 'default',
    message: null,
    show: false,
};

export default function quest(state = INITIAL_STATE, action) {
    return produce(state, ( draft ) => {
        switch (action.type) {
            case '@quest/SHOW': {
                draft.type = action.payload.type;
                draft.message = action.payload.message;
                draft.show = true;   
                break;
            }
            case '@quest/HIDE': {
                draft.type = 'default'
                draft.message = null
                draft.show = false;   
                break;
            }
        
            default:
                break;
        }
    })
}