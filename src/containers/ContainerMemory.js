class ContainerMemory {
  constructor() {
    this.elements = [];
  }

  /**
   * 
   * @returns Devuelve todos los elementos almacenados
   */
  getAll() {
    return this.elements;
  }

  /**
   * 
   * @param {*} element 
   * @returns Devuelve el elemento a guardar
   */
  save(element) {
    element.id =
      this.elements.length === 0
        ? 1
        : this.elements[this.elements.length - 1].id + 1;

    this.elements.push(element);

    return element;
  }

  /**
   * 
   * @param {*} id 
   * @returns Devuelve el elemento con el id buscado
   */
  getById(id) {
    return this.elements.find((element) => element.id === id);
  }
  // {price: 299, nombre: "producto modifci"}
  updateById(id, newData) {
    const elementIndex = this.elements.findIndex((element) => element.id == id);

    if (elementIndex === -1) return null;

    const foundElement = this.elements[elementIndex];

    this.elements[elementIndex] = {
      ...this.elements[elementIndex],
      ...newData,
    };

    return this.elements[elementIndex];
  }

  /**
   * Elimina el elemento con el id 
   * @param {*} id 
   */
  deleteById(id) {
    this.elements.filter((element) => element.id != id);
    return { success: true };
  }
}

export { ContainerMemory };
