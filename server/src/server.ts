import bodyParser from "body-parser";
import chalk from "chalk";
import express, { Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes";

// Server Interface
export interface IServerSettings {
  // Databaser Url
  dbUrl: string;
  // Port
  port: number | string;
}

class App {
  public app: Application = express();
  public async start(settings: IServerSettings): Promise<void> {
    const { port, dbUrl } = settings;
    console.log(chalk.bgCyan(" LOADING ") + chalk.cyan(` Please Wait ... `));
    try {
      // 초기화
      this.init();
      // DB connect
      await this.connectDB(dbUrl);
      // Start The App
      this.app.listen(
        port as number,
        (): void => {
          console.log(
            chalk.bgGreen(" SUCCESS ") +
              chalk.green(` Listening On Port ${port}`)
          );
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  // 앱 초기화. 미들웨어 추가
  private init(): void {
    // 로그 기록용
    this.app.use(morgan("dev"));
    // body 사용
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    // REST Api 라우팅
    this.app.use("/api", routes);

    this.app.use(() => {
      console.log(chalk.red(`Server init error`));
    });
  }

  private async connectDB(dburl: string): Promise<void | Error> {
    console.log(chalk.bgBlue(" DATABASE ") + chalk.blue(" Connecting DB"));
    // DB settings
    try {
      await mongoose.connect(dburl, { useNewUrlParser: true });
      console.log(
        chalk.bgBlue(" DATABASE ") + chalk.blue(" DB Connection Success ")
      );
    } catch (err) {
      console.log(
        chalk.bgRed("  ERROR  ") + chalk.red(" DB Connection Failed")
      );
      return Promise.reject(err);
    }
  }
}

export default App;
