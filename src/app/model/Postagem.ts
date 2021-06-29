import { Tema } from "./tema";
import { User } from "./user";

@JsonIgnoreProperties("postagem")
private Tema tema;


export class Postagem{
    public id: number
    public titulo: string
    public texto: string
    public date: Date
    public usuario: User
    public tema: Tema
}