import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import {chat} from '../chatgroup/chatobj'
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ChatgroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatgroup',
  templateUrl: 'chatgroup.html',
})
export class ChatgroupPage {
  message='';
  datas;
  item1:object;
  //item2;
  item3:Array<chat>=[];
  username='';
  imgurl='';
  user;
//items:Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:AngularFireDatabase) {
 //this.user=this.navParams.get('user');
 this.username=this.navParams.get('username');
 this.imgurl=this.navParams.get('imgurl');
 db.object('/chat').valueChanges().subscribe(res=>{
   //console.log(res);
  this.item1=res;
this.item3=[];
  //this.item2=Object.keys(this.item1).length;
 // this.item3.push(Object.keys(this.item1));

 for(var j in this.item1){
  var sub_key = j;
  var sub_val = this.item1[j];
  //console.log(sub_val);
  this.item3.push(new chat(sub_val.username,sub_val.message,this.username));
}

console.log(this.item3[0]);
 });
}
 /*this.items = db.object('/chat').valueChanges();
 console.log(this.items);
  }*/ 
  

sendmsg(){
  this.db.list('/chat').push({
    username:this.username,
    message:this.message
  });
  this.message="";
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatgroupPage');
   
  }

  change() {
    // get elements
    var element   = document.getElementById('messageInputBox');
    var textarea  = element.getElementsByTagName('textarea')[0];

    // set default style for textarea
    textarea.style.minHeight  = '0';
    textarea.style.height     = '0';

    // limit size to 96 pixels (6 lines of text)
    var scroll_height = textarea.scrollHeight;
    if(scroll_height > 80)
      scroll_height = 80;

    // apply new style
    element.style.height      = scroll_height + "px";
    textarea.style.minHeight  = scroll_height + "px";
    textarea.style.height     = scroll_height + "px";
}

}
