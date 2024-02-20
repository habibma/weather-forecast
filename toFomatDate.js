
function numberToDate(dateNumber) {
    // Extract year, month, day as strings
    const year = dateNumber.toString().padStart(4, "0").substring(0, 4);
    const month = dateNumber.toString().padStart(6, "0").substring(4, 6) - 1; // Months list are 0-indexed
    const day = dateNumber.toString().padStart(8, "0").substring(6);

    const dateObject = new Date(year, month, day);

    // Format the date using methods like toLocaleDateString(), etc.
    const formattedDate = dateObject.toLocaleDateString("en-US", {
        // year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short"
    });

    return formattedDate;
}

export default numberToDate;