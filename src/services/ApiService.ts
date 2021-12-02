import axios, { AxiosInstance } from "axios"
import { from } from 'rxjs';

export enum ActivityType {
    PROFESSIONAL = "PROFESSIONAL",
    EDUCATIONAL = "EDUCATIONAL",
    PERSONAL = "PERSONAL",
    OTHER = "OTHER"
}

export interface Activity {
    id: number,
    title: string,
    description: string,
    website: string,
    year: number,
    type: ActivityType
}

export interface Person {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    website: string,
    activities: Activity[],
    age: number,
    professionalTitles: string[]
}

export default class ApiService {
    private http: AxiosInstance;

    constructor(url: string) {
        this.http = axios.create({
            baseURL: url,
            headers: { "Content-Type": "application/json" }
        });

        /*this.http.interceptors.request.use(request => {
            request.headers = {"Authorization": "Bearer 0x", ... request.headers }
            return Promise.resolve(request);
        });*/

        this.http.interceptors.response.use(response => {
            return Promise.resolve(response);
        }, error => {
            if (error.response.status == 404) document.location.href = "/";
            else if (error.response.status == 403) document.location.href = "/login";

            return Promise.reject(error);
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

    person(id: number) {
        return from (this.http.get<Person>("/persons/" + id).then(r => r.data));
    }

    signin(email: string, password: string) {
        console.log({ email, password } );
        return from (this.http.post<string>("/signin", { email, password }));
    }
}

export const api: ApiService = new ApiService( "http://localhost:8081/api" );