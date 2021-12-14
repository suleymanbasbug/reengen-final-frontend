import axios from "../plugins/axios";

class FactoryService {
  async getFactories() {
    return await axios
      .get("/factories")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async createFactory(factory) {
    try {
      const response = await axios.post("/factories", factory);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async editFactory(factory) {
    try {
      const response = await axios.put(`/factories/${factory.id}`, factory);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFactory(id) {
    try {
      const response = await axios.delete(`/factories/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FactoryService();
