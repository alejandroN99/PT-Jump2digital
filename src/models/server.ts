import express from "express";
import cors from "cors";
import { connectDb } from "../database/config.db";
import dotenv from 'dotenv';
dotenv.config();
import { router } from "../routes/skins.routes";
import { routerUser } from "../routes/user.routes";


export class Server {
  private app: express.Application;
  public port: string;
  public paths: { user: string; skins: string;};

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.paths = {
      user: '/user',
      skins: '/skins',
    };

    this.dbConnection();

    this.middlewares();

    this.routes();
  }


  async dbConnection(){
    await connectDb();
  }

  middlewares(){
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('public'));
  }

  routes(){
    this.app.use(this.paths.user, routerUser);
    this.app.use(this.paths.skins, router);
  }

  listen(){
    this.app.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`)
    })
  }
}
