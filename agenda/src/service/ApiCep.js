import axios from "axios";

const ApiCep = {
  getCep(cep) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json`);
  }
}

export default ApiCep;