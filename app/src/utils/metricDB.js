/**
 * Created by MYigit on 22.9.2016.
 */
import influent  from '../../../bower_components/influent/dist/influent'
export const MetricAPI = {
    getClient: ()=> {
        return influent.createHttpClient({
            server: [
                {
                    protocol: "http",
                    host: "influxdb.ofis.fikrimuhal.com",
                    port: 8086
                }
            ],
            username: "admin",
            password: "admin",
            database: "mulakat-dev"
        });
    }
}