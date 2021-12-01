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
}

export const api: ApiService = new ApiService( "https://9a6c-46-193-69-4.ngrok.io/api" );