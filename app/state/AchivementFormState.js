import { createStore } from 'react-hooks-global-state';

export const ACHIVEMENT_STATE_ACTIONS = {
    STEP_ZERO: 'STEP_ZERO',
    STEP_ONE: 'STEP_ONE',
    STEP_TWO: 'STEP_TWO',
    STEP_THREE: 'STEP_THREE',
    STEP_FOUR: 'STEP_FOUR',
    STEP_FIVE: 'STEP_FIVE',
    STEP_SIX: 'STEP_SIX',
    RESET: 'RESET',
}

const initialState = {
    title: null,
    month: null,
    year: null,
    passportId: null,
    company: null,
    description: null,
    titleObteined: null,
    resultObteined: null,
    valueObteined: null,
    awardFilename: null,
    collegueName: null,
    colleguePhonenumber: null,
    collegueRole: null,
    firstTime: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACHIVEMENT_STATE_ACTIONS.STEP_ZERO: return { ...state, ...action.state };
        case ACHIVEMENT_STATE_ACTIONS.STEP_ONE: return { ...state, ...action.state };
        case ACHIVEMENT_STATE_ACTIONS.STEP_TWO: return { ...state, ...action.state };
        case ACHIVEMENT_STATE_ACTIONS.STEP_THREE: return { ...state, ...action.state };
        case ACHIVEMENT_STATE_ACTIONS.STEP_FOUR: return { ...state, ...action.state };
        case ACHIVEMENT_STATE_ACTIONS.STEP_FIVE: return { ...state, ...action.state };
        case ACHIVEMENT_STATE_ACTIONS.STEP_SIX: return { ...state, ...action.state };
        case ACHIVEMENT_STATE_ACTIONS.RESET: return { ...initialState };
        default: return state;
    }
};

export const { dispatch: dispatchAchivementFormState, useGlobalState: useAchivementFromState, getState: getAchivementFromState } = createStore(reducer, initialState);

