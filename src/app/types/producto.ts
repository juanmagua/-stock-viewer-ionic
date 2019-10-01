export class Producto {
    public Id: string;
    public Nombre: string;
    public Talle: string;
    public IdMarca: string;
    public IdCategoria: string;
    public _fullName: string;
   
    constructor(Id: string,Nombre: string,Talle: string, IdMarca: string, IdCategoria: string){}
    
    get fullName(): string {
        return this.Talle + ' ' + this.Nombre;
    }

}