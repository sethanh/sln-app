export interface IUserProps {
    username : string;
    email : string;
}

export interface IAccountTableProps {
    ID : string;
    Name : IUserProps;
    Phone : string;
    Group? : string;
    Source? : string;
    CreatedOn : Date; 
}