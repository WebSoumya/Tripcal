import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonserviceService } from 'src/app/sharedservice/jsonservice.service';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ExpensedialogboxComponent } from '../expensedialogbox/expensedialogbox.component';
@Component({
  selector: 'app-tourbox',
  templateUrl: './tourbox.component.html',
  styleUrls: ['./tourbox.component.css']
})
export class TourboxComponent implements OnInit{

tripname=""
tripcode=""
loopvariable=0
addexpense=false;
uemail=""
uname=""
showall=false
tempcal:Number[]=[]
tempbool:Boolean[]=[]

displaycal:Number[]=[]
displaylist:String[]=[]

alltrip:Number[]=[]

x: Number = new Number(0);


myid=0;
mycurrentvalue=0;

constructor(private router:Router,private service:JsonserviceService,public dialog: MatDialog)
  {

  }



ngOnInit(){
  this.uemail = this.getCookie("useremail")
          console.log(this.uemail)
          this.service.getuserbyemail(this.uemail).subscribe(res=>{
            //console.log(res);
            if(res!=null)
              {
                //this.Notrip=true;
                this.uname = res.username
                this.tripname=res.tripname
                this.tripcode=res.tripcode
                this.loopvariable=res.members
                console.log(res.username);
              }
              else{
                console.log(res);
              }
          })
          
          this.service.gettripbyemail(this.uemail).subscribe(res=>{
            //console.log(res)
            this.tempcal=res.membercal;
            for(let i=0,j=0;i<res.memberlist.length;i++)
              { 
                if(this.uemail==res.memberlist[i])
                  {
                    this.myid=i;
                  }
                  else{
                    this.displaycal[j]=res.membercal[i]
                    this.displaylist[j]=res.membername[i]
                    j++
                  }
              }
              this.mycurrentvalue = res.membercal[this.myid]
              if(this.mycurrentvalue!=0)
                {
                  this.showall=true;
                }
            console.log(this.tempcal)
            console.log(this.myid)
            console.log(this.mycurrentvalue)
          })
}

getCookie(cname:string) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

addexpenses()
{
   this.service.gettripsbytripcode(this.tripcode).subscribe(res=>{
    console.log(res.length)
    //this.alltrip=res.membercal
    //console.log(this.alltrip)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '50%',
      
  };
    this.dialog.open(ExpensedialogboxComponent, dialogConfig);
   })
}

}

