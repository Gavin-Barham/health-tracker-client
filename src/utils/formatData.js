export default function formatData(rows) {
    const dataMap = new Map();

    // Iterate over each object in the rows array
    for (const row of rows) {
        if (row.medicals) {
            // Iterate over each object in the medicals array
            for (const medical of row.medicals) {
                const date = medical.date.slice(0, 10); // Extract date portion of ISO string

                // Create a new object for this date if it doesn't exist already
                if (!dataMap.has(date)) {
                    dataMap.set(date, { date, medical: {}, nutrition: {} });
                }

                // Add the medical object to the data map for this date
                dataMap.get(date).medical = Object.fromEntries(Object.entries(medical).filter(([key, value]) => key !== 'date'));
            }
        }
        if (row.nutrition) {
            // Iterate over each object in the nutrition array
            for (const nutrition of row.nutrition) {
                const date = nutrition.date.slice(0, 10); // Extract date portion of ISO string

                // Create a new object for this date if it doesn't exist already
                if (!dataMap.has(date)) {
                    dataMap.set(date, { date, medicals: {}, nutrition: {}, exercise: {} });
                }

                // Add the nutrition object to the data map for this date
                dataMap.get(date).nutrition = Object.fromEntries(Object.entries(nutrition).filter(([key, value]) => key !== 'date'));
            }
        }
        if (row.exercises) {
            // Iterate over each object in the nutrition array
            for (const exercise of row.exercises) {
                const date = exercise.date.slice(0, 10); // Extract date portion of ISO string
            
                
                // Create a new object for this date if it doesn't exist already
                if (!dataMap.has(date)) {
                    dataMap.set(date, { date, medicals: {}, nutrition: {}, exercise: {} });
                }
                
                // Add the exercise object to the data map for this date
                dataMap.get(date).exercise = Object.fromEntries(Object.entries(exercise).filter(([key, value]) => key !== 'date'));
            }
        }
    }
    
    // Return an array of the values in the data map
    return Array.from(dataMap.values());
}
