// Purpose: Define a class to handle API responses 

class ApiResponse{
    constructor(statuscode,data,message="Success"){  //constructor is used to initialize the object
        this.statuscode=statuscode      //this is used to refer to the object itself
        this.data = data        //data is the name of the property
        this.message = message  //message is the name of the property
        this.success =statuscode < 400  //if status code is less than 400 then success is true
    }
} 

export default ApiResponse; // exporting the class to be used in other files

// informational response (100-199),
// successful response (200-299),
// redirection (300-399),
// client errors (400-499),
// and server errors (500-599).