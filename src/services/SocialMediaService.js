import BaseService from "./BaseService";
import http from './HttpService'
import { API_BASE_URL_ENV } from "../jsx/common/common";

const apiEndpoint = API_BASE_URL_ENV() + "/setting";
const apiPdfsEndpoint = API_BASE_URL_ENV() + "/setting/cloudPdf";

export default class SocialMediaService extends BaseService {
    constructor() {
        super(apiEndpoint);
    }

    getPdfsList() {
        return http.get(apiPdfsEndpoint);
    }

    createPdfsList(data) {
        return http.post(apiPdfsEndpoint, data);
    }

    deletePdfsList(id) {
        return http.delete(`${apiPdfsEndpoint}/${id}`);
    }
}
