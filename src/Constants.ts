export class Constants {
    public static readonly host = 'localhost';
    public static readonly port = 1236;
    public static readonly connectionString = `ws://${Constants.host}:${Constants.port}`;
    public static readonly requestSize = 5000000;

    public static readonly filePath = '/home/masterwok/Downloads/small.mp4';
    // public static readonly filePath = '/Users/jonathantrowbridge/Downloads/small.mp4';
    public static readonly fileSize = -1;


    private constructor() {
    }
}