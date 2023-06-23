const usersBLL = require('../BLL/usersBLL');
const userActionsDAL = require('../DAL/userActions');

const updateActions = async (req, res, next) => {
    const { userId } = req;
    const userEntry = await userActionsDAL.getAllowedActionsForToday(userId.id);
    if (userEntry != -1) {
        if (userEntry.actionAllowed) {
            await userActionsDAL.addUserAction({ ...userEntry, ...{ actionAllowed: userEntry.actionAllowed - 1 } })
            next();
        } else { //0 actions allowed. logout the user.
            res.redirect('/auth/login');
        }
    } else { //its first action of today, so push new entry
        const userFromDb = await usersBLL.getUserById(userId.id);
        if (userFromDb && userFromDb.length) {
            const newDailyEntry = {
                id: userId.id,
                maxActions: userFromDb[0].maxActions,
                actionAllowed: userFromDb[0].maxActions
            };
            await userActionsDAL.addUserAction(newDailyEntry);
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

module.exports = { updateActions }