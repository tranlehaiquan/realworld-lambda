import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

(async () => {
    await AppDataSource.initialize();
    const data = await AppDataSource.manager.find(User);
    console.log(data);
})()
