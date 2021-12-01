import axios, { AxiosInstance } from "axios"
import { from } from 'rxjs';

export interface Person {
    firstname: string,
    lastname: string,
    email: string,
    website: string
}

export default class ApiService {
    private http: AxiosInstance;

    constructor(url: string) {
        this.http = axios.create({
            baseURL: url,
            headers: { "Content-Type": "application/json" }
        });
    }

    persons(page: number, name: string, activity: string) {
        return from(this.http.get<Person[]>("/persons", {
            params: {
                page,
                name,
                activity
            }
        }).then(r => r.data));
    }

}

export const api: ApiService = new ApiService( "https://f389-46-193-69-4.ngrok.io/api" );