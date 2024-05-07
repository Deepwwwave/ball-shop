import pool from "../database/db.js";

class User {

    
    // Get all
    static async getAll(query) {
        const [result] = await pool.execute(query);
        return result;
    }

    // Get one
    static async getOne(query, ref) {
        const [result] = await pool.execute(query, [ref]);
        return result;
    }

    // Delete one
    static async deleteOne(query, id){
        const [result] = await pool.execute(query, [id]);
        return result
    }

    // save => add or edit
    static async save(query, datas) {
        try {
            const [result] = await pool.execute(query, [...Object.values(datas)]);
            return result;
        } catch (error) {
            console.error('SQL Error:', error.message, error.sql); // Ajoutez cette ligne
            throw error; // Rethrow the error to be caught in the calling function
        }
    }  
    
}

export default User;
