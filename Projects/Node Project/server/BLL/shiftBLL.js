const { InvalidDataError } = require('../errors/invalidDataError');
const Shift = require('../models/shiftModel');

const getAllShifts = async () => {
    const shifts = await Shift.find()
        .populate({
            path: 'employees',
            select: 'firstName lastName startWorkYear department'
        });
    return shifts;
};

const getShiftById = async (id) => {
    const shiftById = await Shift.findById({ _id: id })
        .populate({
            path: 'employees',
            select: 'firstName lastName startWorkYear department'
        });
    return shiftById;
};

const addShift = async (obj) => {
    if (isValidShift(obj)) {
        const shift = new Shift(obj);
        await shift.save();
        return 'Added';
    } else {
        throw new InvalidDataError();
    }
};

const updateShift = async (id, obj) => {
    if (isValidShift(obj)) {
        await Shift.findByIdAndUpdate({ _id: id }, obj);
        return 'Updated';
    } else {
        throw new InvalidDataError();
    }
};

const isValidShift = (shift) => {
    return shift.startingHour > 0 &&
        shift.startingHour < 24 &&
        shift.endingHour > 0 &&
        shift.endingHour < 24 &&
        shift.date;
}

module.exports = {
    getAllShifts,
    getShiftById,
    addShift,
    updateShift
};