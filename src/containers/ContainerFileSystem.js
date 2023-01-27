import fs from "fs";

class ContainerFileSystem {

  constructor(nombre) {
    this.nombreArchivo = `./src/db/${nombre}.json`;
  }

  // Recibe objeto, lo guarda en el archivo y devuelve el id asignado
  async save(obj) {
    try {
      const arrayObj = await this.getAll();

      let id;
      if (arrayObj.length === 0) {
        id = 1;
      } else {
        id = arrayObj[arrayObj.length - 1].id + 1;
      }
      obj.id = id;
      arrayObj.push(obj);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(arrayObj, null, 3)
      );
      return obj;
    } catch (error) {
      console.log(`Error en Save: ${error}`);
    }
  }

  // Recibe un id y devuelve el objeto con ese id, o null si no esta
  async getById(id) {
    try {
      const elements = await this.getAll();
      const foundElement = elements.find((element) => element.id == id);

      if (!foundElement) return null;

      return foundElement;
    } catch (error) {
      console.log(`Error en getById: ${error}`);
    }
  }

  // Devuelve un array con los objetos presentes en el archivo
  async getAll() {
    try {
      const file = await fs.promises.readFile(this.nombreArchivo, "utf8");
      const elements = JSON.parse(file);
      return elements;
    } catch (error) {
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify([], null, 3)
      );
      return [];
    }
  }

  // Elimina del archivo el objeto con el id buscado
  async deleteById(number) {
    try {
      let archivo = await this.getAll();
      const index = archivo.findIndex((element) => element.id === number);

      if (index === -1) return "No se encontro el elemento";

      const result = archivo.filter((element) => element.id !== number);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(result, null, 3)
      );
    } catch (error) {
      console.log(`Error en getById: ${error}`);
    }
  }

  // Elimina todos los objetos presentes en el archivo
  async deleteAll() {
    try {
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify([], null, 3)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, newData) {
    let archivo = await this.getAll();
    const foundElementIndex = archivo.findIndex(
      (element) => element.id == id
    );

    if (foundElementIndex === -1) return null;

    newData['id'] = Number(id);
    
    archivo.splice(foundElementIndex, 1, newData);

    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(archivo, null, 3)
    );

    return newData;
  }

}

export { ContainerFileSystem };
