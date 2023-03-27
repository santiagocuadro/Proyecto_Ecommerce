import mongoose from "mongoose";

class MongoDBContainer {
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }

  /**
   * 
   * @returns Devuelve el modelo
   */
  async getModel(){
    return this.model;
  }

  /**
   * 
   * @returns Devuelve todos los elementos almacenados
   */
  async getAll() {
    const response = await this.model.find({}).lean().exec();
    return response;
  }

  /**
   * 
   * @param {*} element 
   * @returns el elemento almacenado igual al parametro
   */
  async save(element) {
    const response = await this.model.create(element);
    return response;
  }

  /**
   * 
   * @param {*} id 
   * @returns el elemento almacenado con igual id al parametro
   */
  async getById(id) {
    const response = await this.model.findById(id).lean();
    return response;
  }

  /**
   * 
   * @param {*} options 
   * @returns un elemento almacenado igual al parametro
   */
  async getOne(options) {
    const response = await this.model.findOne(options).lean().exec();
    return response;
  }

  /**
   * Acualiza un elemento almacenado, se busca por id y se reemplaza por newData
   * @param {*} id 
   * @param {*} newData 
   * @returns el elemento actualizado
   */
  async updateById(id, newData) {
    const response = await this.model.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return response;
  }

  /**
   * Elimina el elemento buscado por id
   * @param {*} id 
   */
  async deleteById(id) {
    const response = await this.model.findByIdAndDelete(id);
    return response;
  }
}

export { MongoDBContainer };
