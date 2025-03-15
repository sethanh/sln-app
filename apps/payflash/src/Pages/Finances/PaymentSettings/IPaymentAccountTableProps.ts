export interface IBankNameProps {
    name : string;
    icon? : string;
}

export interface IPaymentAccountTableProps {
    ID : string;
    BankName : IBankNameProps;
    BankAccountNumber : string;
    Phone? : string;
    Group? : string;
    Source? : string;
    CreatedOn : Date; 
}