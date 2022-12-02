import {Injectable} from "@tsed/di";
import SerialPort from "serialport";
import {$log} from "@tsed/common";
// import Readline = SerialPort.parsers.Readline;

@Injectable()
export class SerialPortService {

    protected serial: any
    protected reader: any

    // @Inject()
    // socketService: SerialSocketService

    constructor() {

        $log.info('SerialPortService loaded')
        // this.serial = new SerialPort('COM3', {baudRate: 9600})
        // this.reader = this.serial.pipe(new Readline({delimiter: '\r\n'}))

        $log.info('Abriendo conexion a puerto serial')
        this.reader.on('open', () => {
            console.log('CONNECTION IS OPEN')
        })
        this.reader.on('data', async (data: any) => {

            let user = await this.checkUserByCode(data)
            if (user) {
                // this.socketService.emitData({message: 'Usuario aceptado !', user})
            } else {
                // this.socketService.emitData({message: 'No encontramos el codigo en nuestra base de datos!'})
            }
        })
    }

    async checkUserByCode(code: string) {
        const user =null
        return user;
    }
}
