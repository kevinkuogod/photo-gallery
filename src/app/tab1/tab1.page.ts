import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DateService } from '../service/date.service';
import {WebsocketService} from '../service/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {

  middleText:string = 'Tab 11 page';
  messages: string[] = [];                      // 消息列表
  message:any;                            // 发送的消息内容
  error:any;                         // 异常信息
  completed = false;                  // 发送完成
  type = SEND_TYPE.ALL;               // 默认类型发送给所有人
  users = [];                         // 登陆的用户
  sendToUser:any;                         // 需要发送消息的用户
  currentUser:any;                        // 当前用户
  showPopup: boolean = false;

  public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Name',
    },
    {
      placeholder: 'Nickname (max 8 characters)',
      attributes: {
        maxlength: 8,
      },
    },
    {
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
    {
      type: 'textarea',
      placeholder: 'A little about yourself',
    },
  ];
  constructor(
    private webSocketService: WebsocketService,
    private activatedRoute: ActivatedRoute,
    private dateService: DateService,
    private alertController: AlertController
  ) {
    // 从路由中获取参数
    this.activatedRoute.params.subscribe((params: Params) => {
      this.currentUser = params['id'];
    });
  }

  ngOnInit(): void {
    // 连接websocket
    //this.webSocketService.connect(`wss://localhost:7237/ws//echo?id=${this.currentUser}`);
    //this.webSocketService.connect(`ws://kevinkuotest.ddns.net/ws`);
    this.webSocketService.connect(environment.wsurl+`/ws`);
    //this.webSocketService.connect(`wss://localhost:7237/ws/`);
    //this.webSocketService.connect(`ws://localhost:5237/ws/`);
    // 接收消息
    this.webSocketService.messageSubject.subscribe(
      (data:any) => {
        // 如果是用户登陆,则添加到登陆列表中
        console.log(data);
        if (data.users) {
          this.users = data.users;
        } else {
          // 否则添加到消息列表 data.msg
          this.messages.push(sessionStorage.getItem("loginName")+':'+data.msg);
        }
      },
      err => this.error = err,
      () => this.completed = true
    );
  }

  /**
   * 发送消息
   * @author LiQun
   * @date 2019/1/25
   */
  async send() {
    this.showPopup = true;  
    
    /*onst alert = await this.alertController.create({
      header: '提示',
      message: '這是一個彈出視窗',
      buttons: ['確定'],
    });

    await alert.present();*/

    
    // 创建消息对象
    for(let i=0; i < 1;i++){
      const msg = {
        //create_date: create_date,
        name: sessionStorage.getItem("loginName"),
        msg: this.message,
        //msg: i,                                                    // 消息内容
        type: SEND_TYPE.Type1, // 类型
        getDate:this.dateService.getDate(),
        to: this.type === SEND_TYPE.SINGLE ? this.sendToUser : undefined            // 要发送的对象
      };
      // 发送
      this.webSocketService.sendMessage(JSON.stringify(msg));
      // 发送完成,情况message内容
      this.message = '';
    }
  }
}

export enum SEND_TYPE {
  ALL = 'all',
  SINGLE = 'single',
  Type1 = '<1>',
}
