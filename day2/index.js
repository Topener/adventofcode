export const part1 = ({ input }) => {
    let result = 0;

    const safeReports = [];
    input.forEach((report) => {
        const levels = report.split(" ");
        if (isValidRange(levels)) {
            safeReports.push(report);
        }
    });

    result = safeReports.length;

    return result;
};

export const part2 = ({ input }) => {
    let result = 0;
    const safeReports = [];
    input.forEach((report) => {
        const levels = report.split(" ");
        if (isValidRange(levels)) {
            safeReports.push(report);
        } else {
            for (let i = 0; i < levels.length; i++) {
                const withoutLevel = levels.filter((level, index) => index !== i);
                if (isValidRange(withoutLevel)) {
                    safeReports.push(report);
                    break;
                }
            }
        }
    });

    result = safeReports.length;

    return result;
};

const isValidRange = (levels) => {
    let previousNumber = null;
    let direction = null;
    let isValid = false;
    levels.forEach((level, index) => {
        if (direction === "wrong") {
            return;
        }

        if (!previousNumber) {
            previousNumber = parseInt(level);
            return;
        }

        if (!direction) {
            direction = previousNumber < parseInt(level) ? "up" : "down";
        }

        if ((direction === "up" && previousNumber > parseInt(level)) || (direction === "down" && previousNumber < parseInt(level))) {
            return (direction = "wrong");
        }

        if (Math.abs(previousNumber - parseInt(level)) === 0) {
            return (direction = "wrong");
        }

        if (Math.abs(previousNumber - parseInt(level)) > 3) {
            direction = "wrong";
            return;
        }

        previousNumber = parseInt(level);

        if (levels.length - 1 === index) {
            return (isValid = true);
        }
    });

    return isValid;
};
