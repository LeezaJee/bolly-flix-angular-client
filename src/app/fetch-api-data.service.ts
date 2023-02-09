import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
// HttpHeaders and HttpErrorResponse that will be used while making the API calls
// HttpHeaders is used to create a new HTTP header object that can be sent along when making an API call
// HttpErrorResponse is an HTTP response that represents an error or failure that gets returned during or after executing an HTTP request (API call)
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

//Declaring the api url that will provide data for the client app
const apiUrl = "https://bollyflix-api.onrender.com/";

//get token
const token = localStorage.getItem("token");
//get username stored in local storage
const username = localStorage.getItem("username");

// you’re using the Injectable decorator to tell Angular that this service will be available everywhere (hence the root)
@Injectable({
  providedIn: "root",
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  // The namespace (private) is a way of initializing the instance with whatever is given as a parameter
  /* this is a shortcut for

  constructor(http: HttpClient) {
  this.http = http;
}

Expressing this dependency (to HttpClient) in the constructor tells Angular to inject an HttpClient 
into this class — its dependency injection again.

*/
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  // the userRegistration method takes an argument of type any that's the userDetails to post to the API endpoint
  // apiUrl + 'users', similar to apiUrl/${users} in React
  // Observable<any> is a TypeScript type cast
  /* This is a way of giving the TypeScript compiler information it can deduce (ableiten) about types. 
  It's supposed to make the method's return explicit by saying "we return this type". */
  // HttpClient returns an observable (from the RxJS library you imported)
  // it allows you to process events asynchronously

  /**
   * @service sends a POST request to the API endpoint to register a new user
   * @returns a new user object
   * @param userDetails
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    // Using this.http, it posts it to the API endpoint and returns the API's response
    return (
      this.http
        .post(apiUrl + "users", userDetails)
        /* .pipe() function is from RxJS, a reactive programming library for JavaScript, 
      and is used to combine multiple functions into a single function */

        /* pipe() function takes the functions you want to combine (in this case, there's one method, catchError) 
      as its arguments and will return a new function that, when executed, runs the composed functions in sequence. */
        .pipe(catchError(this.handleError))
    );
  }

  /**
   * @service sends a POST request to the API endpoint to login an existing user
   * @param userDetails
   * @returns the data of that user
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + "login", userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service sends a GET request to the API endpoint to get data of all movies
   * @returns an array containing all movies
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem("token");

    return this.http
      .get(apiUrl + `movies`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service sends a GET request to the API endpoint to get data on a single movie
   * @returns a JSON object holding data of that specific movie
   * @param Title
   */
  public getSingleMovie(Title: any): Observable<any> {
    const token = localStorage.getItem("token");

    return this.http
      .get(apiUrl + `movies/${Title}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service sends a GET request to the API endpoint to get data on a specific director
   * @returns a JSON object holding director data
   * @param Name
   */
  public getDirector(Name: any): Observable<any> {
    return this.http
      .get(apiUrl + `director/${Name}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service sends a GET request to the API endpoint to get data on a genre
   * @returns a JSON object holding genre data
   * @param Name
   */
  public getGenre(Name: any): Observable<any> {
    return this.http
      .get(apiUrl + `genre/${Name}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service sends a GET request to the API endpoint to get data on a specific user
   * @returns a JSON object holding data about the requested user
   */
  public getUser(): Observable<any> {
    const token = localStorage.getItem("token");
    // Get username from localStorage for URLs
    const username = localStorage.getItem("user");
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service sends a PUT request to the API endpoint to allow users to update their details
   * @returns a JSON object holding updated data about the user
   * @param updateDetails
   */
  public editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem("token");
    // Get username from localStorage for URLs
    const username = localStorage.getItem("user");
    return this.http.put(apiUrl + `users/${username}`, updateDetails, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }

  /**
   * @service sends a PUT request to the API endpoint to add a movie to the user's list of favorite movies
   * @returns a JSON object holding data about the user including the updated favorite movie list
   * @param movieID
   */
  public addFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem("token");
    // Get username from localStorage for URLs
    const username = localStorage.getItem("user");
    return this.http
      .post(
        apiUrl + `users/${username}/favorites/${movieID}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: "Bearer " + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service sends a DELETE request to the API endpoint to delete a movie from the user's list of favorite movies
   * @returns a JSON object holding data about the user including the updated favorite movie list
   * @param movieID
   */
  public removeFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem("token");
    // Get username from localStorage for URLs
    const username = localStorage.getItem("user");
    return this.http
      .delete(apiUrl + `users/${username}/favorites/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service sends a DELETE request to the API endpoint to delete an existing user
   * @returns	a message indicating that the profile was successfully deleted
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    // Get username from localStorage for URLs
    const username = localStorage.getItem("user");
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occurred:", error.error.message);
    } else {
      console.log(error);
      console.error(
        `Error Status code ${error.status}, Error body is: ${error.error}`
      );
      console.table(error);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
