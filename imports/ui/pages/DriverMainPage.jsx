import React, { Component }
from 'react';
import classNames from 'classnames';
import Modal from 'react-bootstrap-modal';
import {Users} from '../../api/users';
import { withTracker } from 'meteor/react-meteor-data';
import DatePicker from 'react-datepicker';
import moment from 'react-moment';
import 'moment-timezone';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

//import {TrackerReact} from 'ultimatejs:tracker-react';
const ARC_DE_TRIOMPHE_POSITION = {
    lat: 48.873947,
    lng: 2.295038
};
const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

const EIFFEL_TOWER_POSITION = {
    lat: 48.858608,
    lng: 2.294471
};
const KLAB = {
    lat: -1.944676,
    lng:  30.089745
};
var marker;
var historicalOverlay;
const posTI=["300px","300px"];




class DriverMainPage extends Component {
constructor(props) {
super(props);
        this.state = {
        hideCompleted: false, lat:  -1.944676,
        lng: 30.089745,
        productPop:false,
        productPopX: "0px",
         productPopY: "0px",         
        conversationPop:false,
        conversationPopX: "0px",
         conversationPopY: "0px",
         
        };
        
        this.handleChange = this.handleChange.bind(this);
        }

handleSubmit(event) {
event.preventDefault();
        // Find the text field via the React ref
        const text = this.refs.textInput.value.trim();
        Tasks.insert({
        text,
                createdAt: new Date(), // current time
        });
        // Clear form
        this.refs.textInput.value = '';
        }
        
        showThisProductInfo(e){
            //$("#productModal").modal("show");
            var x__=""+e.pageX+"px";
            var Y__=""+e.pageY+"px";
            
            this.setState({productPop:true,productPopX:x__,productPopY:Y__});
        }
         hideThisProductInfo(e){
            //$("#productModal").modal("show");
           
            var x__=""+e.pageX+"px";
            var Y__=""+e.pageY+"px";
            this.setState({productPop:false,productPopX:x__,productPopY:Y__});
        }
        showThisConversationPanel(e){
            //$("#productModal").modal("show");
            var x__=""+e.pageX+"px";
            var Y__=""+e.pageY+"px";
            
            this.setState({conversationPop:true,conversationPopX:posTI[0],conversationPopY:posTI[1]});
        }
         hideThisConversationPanel(e){
            //$("#productModal").modal("show");
           
            var x__=""+e.pageX+"px";
            var Y__=""+e.pageY+"px";
            this.setState({conversationPop:false,conversationPopX:x__,conversationPopY:Y__});
        }

RegisterAsDriver(){

window.open("/driverRegister", "_self");
        }

RegisterAsClient(){
window.open("/clientRegister", "_self")
        }

frequentlyAskedQuestions(){
window.open("/fq_asked", "_self")
        }

loginIntoAccount(){
window.open("/driverMainPage", "_self")
        }
        
        
         componentDidMount() {
        //alert("Welcome Home Guys"+Users.find({}).fetch());
          if(sessionStorage.length==0) {
              window.open("/", "_self");
          }
    

       
        //console.log(Users.find().fetch());
        var that = this;
       
            // Call getCurrentPosition with success and failure callbacks
               // var myLatlng = new google.maps.LatLng(position.coords.longitude, position.coords.latitude);
                this.map = new google.maps.Map(this.refs.map, {
                    center: KLAB,
                    zoom: 16
                });

                var icon = {
                    url: 'images/pickMeUp.png', // url
                    scaledSize: new google.maps.Size(35, 35), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                };
                //--------------------------

//        marker = new google.maps.Marker({
//            position: myLatlng,
//            title: "Ironji Location On Map!",
//            icon: icon
//        });

                var locations = [
                    ['Restaurent Cocobin', -1.950079, 30.091251, 4],
                    ['Klab Rwanda', -1.944676, 30.089745, 5],
                    ['Kigali Convention Center', -1.954588, 30.093912, 3],
                    ['KBC Business Center', -1.952403, 30.091481, 2],
                    ['People Club', -1.947762, 30.092957, 1]
                ];

                for (i = 0; i < locations.length; i++) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                        icon: icon,
                        title: "" + locations[i][0],
                        map: this.map
                    });

                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function (e) {
                             var x__=""+e.pageX+"px";
            var Y__=""+e.pageY+"px";
           // alert("");
           
            
            that.setState({conversationPop:true,conversationPopX:posTI[0],conversationPopY:posTI[1]});
                        }
                    })(marker, i));

                    marker.setMap(this.map);
                }
           
        
    }

    panToArcDeTriomphe() {
        var checkOnce=true;
        var that = this;
        //------------------
         if (navigator.geolocation)
        {
            // Call getCurrentPosition with success and failure callbacks
            navigator.geolocation.getCurrentPosition(function (position) {
              var myLatlngs = {
    lat: -1.944676,
    lng:  30.089745
};
                var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                this.map = new google.maps.Map(document.getElementById("map"), {
                    center: myLatlng,
                    zoom: 16
                });

                var icon = {
                    url: 'images/pickMeUp.png', // url
                    scaledSize: new google.maps.Size(35, 35), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                };
                //--------------------------

//        marker = new google.maps.Marker({
//            position: myLatlng,
//            title: "Ironji Location On Map!",
//            icon: icon
//        });

                var locations = [
                    ['Restaurent Cocobin', -1.950079, 30.091251, 4],
                    ['Klab Rwanda', -1.944676, 30.089745, 5],
                    ['Kigali Convention Center', -1.954588, 30.093912, 3],
                    ['KBC Business Center', -1.952403, 30.091481, 2],
                    ['People Club', -1.947762, 30.092957, 1]
                ];

                for (i = 0; i < locations.length; i++) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                        icon: icon,
                        title: "" + locations[i][0],
                        map: this.map
                    });

                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function (e) {
                            var x__=""+e.pageX+"px";
            var Y__=""+e.pageY+"px";
       
            that.setState({conversationPop:true,conversationPopX:posTI[0],conversationPopY:posTI[1]});
                        }
                    })(marker, i));
                    
                     //===============Add myself on the map
                     if(checkOnce){
                         var icon_ = {
                    url:"images/locate_me.png", // url
                    scaledSize: new google.maps.Size(35, 70), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                };
                      marker = new google.maps.Marker({
                        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        icon: icon_,
                        scaledSize: new google.maps.Size(35, 35), 
                        title: "Me!",
                        map: this.map
                    });
                    //---------
                    checkOnce=false;
                     }

                    marker.setMap(this.map);
                    //alert(""+myLatlng);
                    //this.map.panTo(myLatlng);
                }
                
            },function(){
                alert("Failed to Trinangulate Position.");
            });
            
        }else{
            alert("No Geolocation on your device");
        }
    }
 handleChange(date) {
    this.setState({
      startDate: date
    });
  }

render() {
    
return (<div className="container">
    <div className="logoHome_For_DRiver">
    <div>
    <table>
    <tbody>
    <tr><td><a href="/" className="headerLinks">Homepage</a></td><td><a href="/" className="headerLinks">Logout</a></td></tr>
        </tbody>
        </table>
        </div>
        
        <div className="container">
  <div className="theTopMenus">
    <div className="theConainer theRightSide">
      <img src="images/ironji.png" />
        <div className="TrademarkAndName">Ironji<sup>TM</sup></div>
    </div>
    <div className="theConainer theRightSide">
    
    </div>
    <div className="theConainer theRightSide">
      <div className="row pull-right">
      <table className="table table_ghh">
      <tbody>
        <tr><td><a href={ '/fq_asked'}><img className="followLinks" src="images/question.png" /><br/><span>FAQs</span></a></td>
      <td><a href={ '/messages'}><img className="followLinks" src="images/message.png" /><br/><span>Messages</span></a></td>
      <td><a href={ '/profile'}><img className="followLinks" src="images/profile.png" /><br/><span>Hi, {sessionStorage.getItem('ironji_account_username')}</span></a></td></tr>
        </tbody>
        </table>
  </div>
  
    </div>
  </div>
</div>
    </div>
    <div className="container middleFeature">
    <div className="middleFeature_left"><div className="middleFeature_left_in"><div ><img onClick={this.showThisProductInfo.bind(this)} className="theseImgsFood" src="images/ironji.png" /><div className="foodNames">Orange<br/><span className="minify">Ironji</span></div></div>
    <div><img className="theseImgsFood" onClick={this.showThisProductInfo.bind(this)} src="images/pineapple.jpg" /><div className="foodNames">Pineapple<br/><span className="minify">Inanasi</span></div></div>
    <div><img className="theseImgsFood" onClick={this.showThisProductInfo.bind(this)} src="images/banana.jpg" /><div className="foodNames">Banana<br/><span className="minify">Umuneke</span></div></div>
    <div><img className="theseImgsFood" onClick={this.showThisProductInfo.bind(this)} src="images/meat.jpg" /><div className="foodNames">Meat<br/><span className="minify">Inyama</span></div></div>
    <div><img className="theseImgsFood" onClick={this.showThisProductInfo.bind(this)} src="images/fish.jpg" /><div className="foodNames">Fish<br/><span className="minify">Ifi</span></div></div>
    <div><img className="theseImgsFood" onClick={this.showThisProductInfo.bind(this)} src="images/capati.jpg" /><div className="foodNames">Capati<br/><span className="minify">Capati</span></div></div>
    <div><img  className="theseImgsFood" onClick={this.showThisProductInfo.bind(this)} src="images/chicken.jpg" /><div className="foodNames">Chicken<br/><span className="minify">Inkoko</span></div></div>
    </div>
    </div>
      <div className="middleFeature_middle">
      <button data-toggle="modal" data-target="#mapInTextModal" data-dismiss="modal" className="btn mapInText" style={{float:"right",color:"red",background:"transparent",border:"1px solid red",borderTopLeftRadius:"5px"}}>Map In Text</button>
      <button className="btn btn-info" onClick={this.panToArcDeTriomphe.bind(this)}>Locate Yourself<br/><span className="minify">Reba aho uri</span></button>
                        <div ref="map" className="TheMapGuru map" id="map"  ref="map">I should be a map!</div>
                        <div>
                        <table className='thebuttons_Driver'>
                        <tbody>
                        <tr><td><button className='btn-primary mainPageButton'>I'm available</button><label className="checkbox-inline"><input type="checkbox" style={{width:"60px"}}   data-toggle="toggle"/></label></td><td></td></tr>
                            <tr><td><button data-toggle="modal" data-dismiss="modal" data-target="#createScheduleModal" className='btn-primary mainPageButton'>Create a Schedule<br/><span className='minify'>Shyira ku ngengabihe gahunda zawe z'urugendo</span></button></td><td></td></tr>
                            <tr><td><button data-toggle="modal" data-dismiss="modal" data-target="#hotDealsModal" className='btn-primary mainPageButton'>Hot Deals<br/><span className='minify'>Reba abantu bakeneye ababatwara byihutirwa</span></button></td><td></td></tr>
        </tbody>
        </table>
        
        </div>
                
                    </div>
                    <div className="middleFeature_right"></div>
                    </div>


    <div className="clearBoth"></div>
    <div style={{display:"none"}} >
  {this.props.tasks.map(function (resolution) {
    return (<div>{resolution.text}</div>);
  })}
</div>
    <div className="modal fade" id="ForgotPasswordModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Log Onto Ironji Platform<br/><span className="minify">Injira ku rubuga rw' Ironji</span></h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container">
                        <div className="form-group">
                            <label ><b>Telephone Or Email</b><br/><span className='minify'>Telefoni cg Email</span></label>
                            <input className="widthLogInput" type="text" placeholder="" name="uname" required/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success pull-center" type="button">Get Code<br/><span className='minify'>Aka Code</span></button>
                        </div>
                        <div className="form-group">
                            <label ><b>Put Received Code</b><br/><span className='minify'>Shyiramo CodeWahawel</span></label>
                            <input className="widthLogInput" type="text" placeholder="" name="uname" required/>
                        </div>     
                        <div className="form-group">
                            <button className="btn btn-success pull-center" type="button">Verify<br/><span className='minify'>Emeza</span></button>
                        </div>

                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close<br/><span className='minify'>Funga</span></button>
                </div>
            </div>
        </div>
    </div>
    <div id="productModal" style={{width: '300px', height: '150px',left: this.state.productPopX,top:this.state.productPopY,position:'absolute'}} className={this.state.productPop? "productModal":"productModal_INVisible"}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" onClick={this.hideThisProductInfo.bind(this)} className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Product name</h4>
      </div>
      <div className="modal-body">
      
        <p>Some text in the modal.</p>
        <h4>Places to find it:</h4>
        <div className="theProds  testimonial-group">
        <div className="row text-center">
        <div className="theProds_content col-xs-4">
        <h4>Trader Name: </h4>
        <h4>Location: </h4>
        <h4>Contacts: </h4>
        <button className="btn-default">See on Map</button>
        </div> <div className="theProds_content col-xs-4">
        <h4>Trader Name: </h4>
        <h4>Location: </h4>
        <h4>Contacts: </h4>
        <button className="btn-default">See on Map</button>
        </div>
        <div className="theProds_content col-xs-4">
        <h4>Trader Name: </h4>
        <h4>Location: </h4>
        <h4>Contacts: </h4>
        <button className="btn-default">See on Map</button>
        </div>
        <div className="theProds_content col-xs-4">
        <h4>Trader Name: </h4>
        <h4>Location: </h4>
        <h4>Contacts: </h4>
        <button className="btn-default">See on Map</button>
        </div>
        
        
        </div></div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" onClick={this.hideThisProductInfo.bind(this)} data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
    <div id="ConversationModal" style={{width: '150px', height: '150px',left: this.state.conversationPopX,top:this.state.conversationPopY,position:'fixed'}} className={this.state.conversationPop? "productModal":"productModal_INVisible"}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" onClick={this.hideThisConversationPanel.bind(this)} className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Their Names</h4>
      </div>
      <div className="modal-body">
      
        <p>Some text in the modal.</p>
        <button className="btn-default btn-primary">Talk To Them</button>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" onClick={this.hideThisConversationPanel.bind(this)} data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
    <div className="modal fade" id="mapInTextModal" role="dialog" aria-labelledby="mapInTextModalModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">All pick up locations visible on the map.<br/><span className="minify">Abari kugaragara  ku ikarita bose ngo ubatware</span></h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container" style={{height:"300px",overflow:"scroll",width:"400px"}}>
                    <div style={{border:"1px solid chocolate",margin:"5px"}}>
                    <h4>Names : dijsh8dbishdis9fi</h4>
                    <p>Location in Teext sfbusfsf sfibsuvf snifbus jfnisbuvf </p>
                    <button className='btn-primary'>Talk To Them</button>
              </div>
              <div style={{border:"1px solid chocolate",margin:"5px"}}>
                    <h4>Names : dijsh8dbishdis9fi</h4>
                    <p>Location in Teext sfbusfsf sfibsuvf snifbus jfnisbuvf </p>
                    <button className='btn-primary'>Talk To Them</button>
              </div>
              <div style={{border:"1px solid chocolate",margin:"5px"}}>
                    <h4>Names : dijsh8dbishdis9fi</h4>
                    <p>Location in Teext sfbusfsf sfibsuvf snifbus jfnisbuvf </p>
                    <button className='btn-primary'>Talk To Them</button>
              </div>
              <div style={{border:"1px solid chocolate",margin:"5px"}}>
                    <h4>Names : dijsh8dbishdis9fi</h4>
                    <p>Location in Teext sfbusfsf sfibsuvf snifbus jfnisbuvf </p>
                    <button className='btn-primary'>Talk To Them</button>
              </div>
              <div style={{border:"1px solid chocolate",margin:"5px"}}>
                    <h4>Names : dijsh8dbishdis9fi</h4>
                    <p>Location in Teext sfbusfsf sfibsuvf snifbus jfnisbuvf </p>
                    <button className='btn-primary'>Talk To Them</button>
              </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close<br/><span className='minify'>Funga</span></button>
                </div>
            </div>
        </div>
    </div>
    <div className="modal fade" id="createScheduleModal" role="dialog" aria-labelledby="ecreateScheduleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">My Schedule<br/><span className="minify">Gahunda zanjye</span></h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container">
  <div className="row">
    <div className="col-sm" style={{width:"23%",float:"left"}}>
      <form>
  <div className="form-group">
    <label >Origin:</label>
    <input type="text" style={{width:"80%",fontSize:"14px"}} className="form-control" id="" aria-describedby="" placeholder=""/>
  
  </div>
  <div className="form-group">
    <label >Destination:</label>
    <input type="text" style={{width:"80%",fontSize:"14px"}} className="form-control" id="" aria-describedby="" placeholder=""/>
  
  </div>
  <div className="form-group">
    <label >Date</label>
 <span className="input-group-addon">
 <table>
 <tbody>
 <tr><td>
   <DatePicker className="form-control" id="scheduleDateDay"
        selected={this.state.startDate}
        onChange={this.handleChange}
        /></td><td>
        <span onClick={this.state.startDate} className="glyphicon glyphicon-calendar"></span></td></tr>
                        </tbody>
                        </table>
                    </span>
                    
  </div>
  <div className="form-group">
  <label >Local Time<br/><span className="minify">Isaha yo mu gihugu</span></label>
    <div className="form-group">
    <label >From</label>
    <table><tbody><tr><td>
    <TimePicker style={{ width: 100 }}
    showSecond={showSecond}
     />
     </td><td> <span className="input-group-addon">
                        <span className="glyphicon glyphicon-time"></span>
                    </span></td></tr></tbody></table>
 
  </div>
  <div className="form-group">
    <label >To</label>
  <table><tbody><tr><td><TimePicker style={{ width: 100 }}
    showSecond={showSecond}
      /></td><td> <span className="input-group-addon">
                        <span className="glyphicon glyphicon-time"></span>
                    </span></td></tr></tbody></table>
  </div>
  </div>
  <button type="submit" className="btn btn-primary">Add this schedule<br/><span className='minify'>Emeza iyi gahunda</span></button>
</form>
    </div>
    <div className="col-sm" style={{width:"23%",float:"left",borderLeft:"1px solid black"}}>
        <h4>My Schedules<br/><span className="minify">Gahunda zanjye</span></h4>
        <div style={{overflowY:"scroll",height:"350px"}}>            
        <div style={{borderBottom:"1px solid green"}}>
        <p>Tuesday, 7:30AM to 11:AM</p>
            <div>Kigali to Rwamagana</div>
            <button className="btn btn-warning">Delete Schedule<br/><span className="minify">Iyi gahunda yikureho</span></button>
</div>
 <div style={{borderBottom:"1px solid green"}}>
        <p>Tuesday, 7:30AM to 11:AM</p>
            <div>Kigali to Rwamagana</div>
            <button className="btn btn-warning">Delete Schedule<br/><span className="minify">Iyi gahunda yikureho</span></button>
</div>
 <div style={{borderBottom:"1px solid green"}}>
        <p>Tuesday, 7:30AM to 11:AM</p>
            <div>Kigali to Rwamagana</div>
            <button className="btn btn-warning">Delete Schedule<br/><span className="minify">Iyi gahunda yikureho</span></button>
</div>
 <div style={{borderBottom:"1px solid green"}}>
        <p>Tuesday, 7:30AM to 11:AM</p>
            <div>Kigali to Rwamagana</div>
            <button className="btn btn-warning">Delete Schedule<br/><span className="minify">Iyi gahunda yikureho</span></button>
</div>
 <div style={{borderBottom:"1px solid green"}}>
        <p>Tuesday, 7:30AM to 11:AM</p>
            <div>Kigali to Rwamagana</div>
            <button className="btn btn-warning">Delete Schedule<br/><span className="minify">Iyi gahunda yikureho</span></button>
</div>
                 </div>
    </div>
  </div>
</div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close<br/><span className='minify'>Funga</span></button>
                    <button type="button" className="btn btn-primary">Save<br/><span className='minify'>Byemeze</span></button>
                </div>
            </div>
        </div>
    </div>
    <div className="modal fade" id="hotDealsModal" role="dialog" aria-labelledby="hotDealsModalModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Hot Deals<br/><span className="minify">Reba abakeneye ababatwara byihutirwa</span></h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div  className="container" style={{overflow:"scroll",height:"350px",width:"350px"}}>
                        <div >            
        <div style={{borderBottom:"1px solid green",width:"300px"}}>
        <p style={{color:"blue",textDecoration:"underline"}}>Kabera</p>
            <div>I am at Kicukiro and I want a quick drive to Kanombe</div>
            <button className="btn btn-success">Talk to them<br/><span className="minify">Muvugihe</span></button>
</div>
 <div style={{borderBottom:"1px solid green",width:"230px"}}>
          <p style={{color:"blue",textDecoration:"underline"}}>Kabera</p>
            <div>I'm a manager at Serena Hotel Transform Africa is kicking off, we need to issue a deal of bringing eggs. To all drivers write to us and commit the number of eggs you can bring and we give you a go ahed.</div>
            <button className="btn btn-success">Talk to them<br/><span className="minify">Muvugihe</span></button>
</div>
<div style={{borderBottom:"1px solid green",width:"230px"}}>
          <p style={{color:"blue",textDecoration:"underline"}}>Kabera</p>
            <div>Kigali to Rwamagana</div>
            <button className="btn btn-success">Talk to them<br/><span className="minify">Muvugihe</span></button>
</div>
<div style={{borderBottom:"1px solid green",width:"230px"}}>
         <p style={{color:"blue",textDecoration:"underline"}}>Kabera</p>
            <div>Kigali to Rwamagana</div>
            <button className="btn btn-success">Talk to them<br/><span className="minify">Muvugihe</span></button>
</div>
<div style={{borderBottom:"1px solid green",width:"230px"}}>
          <p style={{color:"blue",textDecoration:"underline"}}>Kabera</p>
            <div>Kigali to Rwamagana</div>
            <button className="btn btn-success">Talk to them<br/><span className="minify">Muvugihe</span></button>
</div>
<div style={{borderBottom:"1px solid green",width:"230px"}}>
          <p style={{color:"blue",textDecoration:"underline"}}>Kabera</p>
            <div>Kigali to Rwamagana</div>
            <button className="btn btn-success">Talk to them<br/><span className="minify">Muvugihe</span></button>
</div>
<div style={{borderBottom:"1px solid green",width:"230px"}}>
          <p style={{color:"blue",textDecoration:"underline"}}>Kabera</p>
            <div>Kigali to Rwamagana</div>
            <button className="btn btn-success">Talk to them<br/><span className="minify">Muvugihe</span></button>
</div>
                 </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close<br/><span className='minify'>Funga</span></button>
                    <button type="button" className="btn btn-primary">Save<br/><span className='minify'>Byemeze</span></button>
                </div>
            </div>
        </div>
    </div>
    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Log Onto Ironji Platform<br/><span className="minify">Injira ku rubuga rw' Ironji</span></h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container">
                        <div className="form-group">
                            <label ><b>Username</b><br/><span className='minify'>Izina ryo kwinjira</span></label>
                            <input className="widthLogInput" type="text" placeholder="Enter Username" name="uname" required/>
                        </div><div className="form-group">

                            <label ><b>Password</b><br/><span className='minify'>Ijambo ry' ibanga</span></label>
                            <input type="password" className="widthLogInput" placeholder="Enter Password" name="psw" required/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" type="button">Login<br/><span className='minify'>Injira</span></button>
                            <button data-toggle="modal" data-dismiss="modal" data-target="#ForgotPasswordModal" className="btn  thetransparent" type="button">Forgot Password<br/><span className='minify'>Wibagiwe Ijambo ry'ibanga.</span></button>
                        </div>                
                        <label className="thth">
                            <input type="checkbox"   name="remember"/> Remember me
                            <br/><span className='minify'>Uzanyibuke Ningaruka</span>
                        </label>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close<br/><span className='minify'>Funga</span></button>
                    <button type="button" onClick={this.loginIntoAccount.bind(this)} className="btn btn-primary">Login<br/><span className='minify'>Injira</span></button>
                </div>
            </div>
        </div>
    </div>
    <div className="container pull-right"> 
        <div className="row pull-right theLinkdss">
            <div className="col theTextDown">Follow us and like us on<br/><span className="minify">Dukurikire undadukunde kuri</span></div>
            <div className="col"><a href="#"><img className="followLinks" src="images/facebook.png" /></a></div>
            <div className="col"><a href="#"><img className="followLinks" src="images/instagram.png" /></a></div>
            <div className="col"><a href="#"><img className="followLinks" src="images/linkedin.png" /></a></div>
            <div className="col"><a href="#"><img  className="followLinks" src="images/snapchat.png" /></a></div>
            <div className="col"><a href="#"><img className="followLinks" src="images/twitter.png" /></a></div>
        </div>
    </div>


</div>
);
}

}
export default withTracker(() => {
  return {
    tasks: Users.find({}).fetch(),
  };
})(DriverMainPage);

