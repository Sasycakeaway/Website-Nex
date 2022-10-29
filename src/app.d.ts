// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {}

declare interface User{
    CF: string;
    Nascita: string;
    News: boolean;
    PK_Email: string;
    Password: string;
    Telefono: string;
    Timestamp: Date;
}

declare interface Data{
    user: User;
}

declare interface Ordini{
    FK_Email: string
    PK_Id: string
    Totale: number
    Cart: string
    Timestamp: Date
    Nome: string
    Cognome: string
    Indirizzo: string
    Cap: string
    Domicilio: string
}

declare interface DataOrder{
    ordini: Array<Ordini>
}