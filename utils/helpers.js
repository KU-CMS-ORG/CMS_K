const { Days } = require("@prisma/client");
const { compareAsc } = require("date-fns");

/**
 *
 * @param {Date | number} d1
 * @param {Date | number} d2
 * @returns
 */
function areDatesEqual(d1, d2) {
    return compareAsc(d1, d2) === 0;
}

function getCreatedAtDay(myDate) {
    switch (myDate) {
        case "Saturday":
            return Days.SATURDAY;
        case "Sunday":
            return Days.SUNDAY;
        case "Monday":
            return Days.MONDAY;
        case "Tuesday":
            return Days.TUESDAY;
        case "Wednesday":
            return Days.THURSDAY;
        case "Friday":
            return Days.FRIDAY;
        default:
            return Days.SATURDAY;
    }
}

/**
 *
 * @param {Array<String> | String} sortList
 */
function sortHelper(sortList) {
    console.log(sortList);
    const order = [];
    let newSortList;
    if (typeof sortList == "string") {
        newSortList = [sortList];
    } else {
        newSortList = sortList;
    }
    newSortList.forEach((eachSort) => {
        const [key, value] = eachSort.split(":");
        order.push({ [key]: value });
    });
    return order;
}
module.exports = {
    areDatesEqual,
    getCreatedAtDay,
    sortHelper,
};
