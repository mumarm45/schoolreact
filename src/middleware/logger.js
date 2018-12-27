/**
 * Created by mumarm45 on 18/12/2018.
 */
const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('This is action', action);
    const returnValue = next(action);
    console.log('The new state', store.getState());
    console.groupEnd();

    return returnValue;
};


export  default  logger;