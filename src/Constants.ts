export class Constants {
    public static readonly host = 'localhost';
    public static readonly port = 3000;
    public static readonly connectionString = `ws://${Constants.host}:${Constants.port}`;

    private constructor() {
    }
}