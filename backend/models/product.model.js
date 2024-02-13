import pool from '../database/db.js'

class Product {

    // Get all
    static async getAll(query) {
        try {
          const [result] = await pool.execute(query);
          console.log('Query result in Product.getAll:', result); // Ajout pour le débogage
          return result;
        } catch (error) {
          console.error('Error in Product.getAll:', error);
          throw error; // Assurez-vous de relancer l'erreur pour que le contrôleur puisse la capturer
        }
      }

    // Get one
    static async getOne(query, id) {
        const [result] = await pool.execute(query, [id]);
        return result;
    }

    // Delete one
    static async deleteOne(query, id){
        const [result] = await pool.execute(query, [id]);
        return result
    }

    // save => add or edit
    static async save(query, datas){
        const [result] = await pool.execute(query, [...Object.values(datas)])
        return result
    }   
}

export default Product;