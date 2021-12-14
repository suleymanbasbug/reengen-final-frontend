import axios from "../plugins/axios";
import { calculateDay } from "../plugins/utils";
class UnitService {
  async getByFactoryId(factoryId) {
    return await axios
      .get(`/units/factory/${factoryId}`)
      .then((response) => {
        return calculateDay(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async createUnit(unit) {
    try {
      const response = await axios.post("/units", unit);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async editUnit(unit) {
    try {
      const response = await axios.put(`/units/${unit.id}`, unit);
      return calculateDay(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUnit(unitId) {
    try {
      const response = await axios.delete(`/units/${unitId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UnitService();
