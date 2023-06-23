const jFile = require('jsonfile');
const ACTIONS_FILE_PATH = './configs/userActions.json';

const getAllowedActionsForToday = async (id) => {
    const { actions } = await jFile.readFile(ACTIONS_FILE_PATH);
    const today = await getTodaysDate();
    const userActionsToday = await actions
                                .filter(action => action.date === today)
                                .filter(action => action.id == id)
                                .sort((action1, action2) => action1.actionAllowed - action2.actionAllowed);

    return userActionsToday.length > 0 ? userActionsToday[0] : -1;
}

const addUserAction = async (userActionEntry) => {
    const { actions } = await jFile.readFile(ACTIONS_FILE_PATH);
    const today = await getTodaysDate();
    await actions.push({...userActionEntry, ...{date: today}});
    await jFile.writeFile(ACTIONS_FILE_PATH, {actions: actions});
}

const getTodaysDate = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [day, month, year].join('/');
}

module.exports = {getAllowedActionsForToday, addUserAction}