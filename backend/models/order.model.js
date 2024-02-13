import pool from "../database/db.js";

class Order {
   // Get all orders
   static async getAll(query) {
      const [result] = await pool.execute(query);
      return result;
   }

   // Get all orders by values
   static async getAllbyValue(query, value) {
      const [result] = await pool.execute(query, [value]);
      return result;
   }

   // Get one order
   static async getOne(query, id) {
      const [result] = await pool.execute(query, [value]);
      return result;
   }

   // Delete one order
   static async deleteOne(query, id) {
      const [result] = await pool.execute(query, [id]);
      return result;
   }

   // Create/Update order
   static async save(query, datas) {
      const [result] = await pool.execute(query, [...Object.values(datas)]);
      return result;
   }
}

export default Order;
