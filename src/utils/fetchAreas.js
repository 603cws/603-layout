import { supabase } from '../services/supabaseClient'; // Importing the existing supabase instance

/**
 * Fetch areas for a given userId from Supabase.
 * @param {string} userId - The foreign key to fetch areas.
 * @returns {Promise<Array|Error>} - Returns the fetched rows or an error.
 */
export const fetchAreas = async (userId) => {
    if (!userId) {
        throw new Error("Invalid userId provided.");
    }

    try {
        const { data, error } = await supabase
            .from("areas") // Replace with your actual table name
            .select("*") // Replace '*' with specific columns if needed
            .eq("userId", userId); // Filtering by userId

        if (error) {
            console.error("Error fetching areas:", error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Unexpected error:", error);
        throw error;
    }
};
