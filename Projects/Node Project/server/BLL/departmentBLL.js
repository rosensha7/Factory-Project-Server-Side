const { InvalidDataError } = require('../errors/invalidDataError');
const Department = require('../models/departmentModel');
const EmployeeBLL = require('./employeesBLL')

const getAllDepartments = async () => {
    const departments = await Department.find()
        .populate({
            path: 'manager',
            select: 'firstName lastName startWorkYear'
        })
        .populate({
            path: 'employees',
            select: 'firstName lastName startWorkYear'
        });
    return departments;
};


const getDepartmentById = async (id) => {
    const departmentById = await Department.findById({ _id: id })
        .populate({
            path: 'manager',
            select: 'firstName lastName startWorkYear departmentId'
        })
        .populate({
            path: 'employees',
            select: 'firstName lastName startWorkYear departmentId'
        });
    return departmentById;
};


const addDepartment = async (obj) => {
    if (isValidDepartment(obj)) {
        const department = new Department(obj);
        await department.save();
        return 'Added';
    } else {
        throw new InvalidDataError();
    }
};

const updateDepartment = async (id, obj) => {
    if (isValidDepartment(obj)) { 
        await Department.findByIdAndUpdate({_id: id}, obj);
        return 'Updated';
    } else {
        throw new InvalidDataError();
    }
};

const deleteDepartment = async (id) => {
    const { employees } = await getDepartmentById(id);
    if (employees) {
        employees.forEach(async emp => {
            if (emp.id) {
                emp.department = [];
                await EmployeeBLL.updateEmployee(emp.id, emp);
            }
        });
    }
    await Department.findByIdAndDelete(id);
    return 'Deleted';
};

const isValidDepartment = (department) => {
    return department && department.name && department.manager;
}

module.exports = {
    getAllDepartments,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment
};