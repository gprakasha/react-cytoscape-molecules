
import axios from "axios";

export const getCompoundData = async (compoundName) => {
    return axios.get(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${compoundName}/JSON`);
}